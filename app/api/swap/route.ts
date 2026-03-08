import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';

// Contract ABIs
const USDT_ABI = [
  {
    constant: false,
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function',
  },
];

const XORA_ABI = [
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
];

// Environment variables
const RPC_URL = process.env.NEXT_PUBLIC_BSC_RPC_URL || 'https://bsc-dataseed1.bnbchain.org:443';
const TREASURY_WALLET = process.env.TREASURY_WALLET_ADDRESS || '';
const TREASURY_PRIVATE_KEY = process.env.TREASURY_PRIVATE_KEY || '';

const XORA_ADDRESS = '0xA704B0BC8d0F2fe8EEc527F0E67641e170af3FfE';
const USDT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';

const XORA_PRICE_USD = 0.005;
const XORA_DECIMALS = 9;
const USDT_DECIMALS = 18;

if (!TREASURY_WALLET || !TREASURY_PRIVATE_KEY) {
  console.error('Missing treasury wallet environment variables');
}

export async function POST(request: NextRequest) {
  try {
    const { userAddress, amount, currency, paymentTxHash } = await request.json();

    // Validate inputs
    if (!userAddress || !amount || !currency) {
      return NextResponse.json(
        { error: 'Missing required fields: userAddress, amount, and currency are required' },
        { status: 400 }
      );
    }

    if (currency !== 'USDT' && currency !== 'BNB') {
      return NextResponse.json(
        { error: 'Invalid currency. Please select USDT or BNB' },
        { status: 400 }
      );
    }

    // paymentTxHash is required for both BNB and USDT
    if (!paymentTxHash) {
      return NextResponse.json(
        { error: `Missing ${currency} payment transaction hash` },
        { status: 400 }
      );
    }

    // Validate addresses
    if (!ethers.isAddress(userAddress)) {
      return NextResponse.json(
        { error: 'Invalid user wallet address' },
        { status: 400 }
      );
    }

    if (!ethers.isAddress(TREASURY_WALLET)) {
      return NextResponse.json(
        { error: 'Treasury wallet not configured properly' },
        { status: 500 }
      );
    }

    // Create provider and signer
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const signer = new ethers.Wallet(TREASURY_PRIVATE_KEY, provider);

    // Parse amount
    const parsedAmount = parseFloat(amount);
    if (parsedAmount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    // Calculate XORA amount to send
    const bnbPrice = currency === 'USDT' ? 1 : await getBNBPrice();
    const usdValue = parsedAmount * bnbPrice;
    const xoraAmount = usdValue / XORA_PRICE_USD;
    const xoraWithDecimals = ethers.parseUnits(xoraAmount.toFixed(9), XORA_DECIMALS);

    // Check Treasury wallet XORA balance BEFORE attempting transfer
    const xoraContract = new ethers.Contract(XORA_ADDRESS, XORA_ABI, provider);
    const treasuryBalance = await xoraContract.balanceOf(TREASURY_WALLET);
    const treasuryBalanceFormatted = ethers.formatUnits(treasuryBalance, XORA_DECIMALS);

    console.log(`Treasury Balance: ${treasuryBalanceFormatted} XORA`);
    console.log(`Required Amount: ${xoraAmount.toFixed(9)} XORA`);

    if (treasuryBalance < xoraWithDecimals) {
      return NextResponse.json(
        {
          error: 'Insufficient XORA tokens available',
          details: `Treasury has ${treasuryBalanceFormatted} XORA but needs ${xoraAmount.toFixed(9)} XORA for this purchase. Please try again later or contact support.`,
          treasuryBalance: treasuryBalanceFormatted,
          requiredAmount: xoraAmount.toFixed(9),
        },
        { status: 503 }
      );
    }

    // Check gas balance (BNB) in Treasury wallet
    const gasBalance = await provider.getBalance(TREASURY_WALLET);
    const gasBalanceFormatted = ethers.formatEther(gasBalance);
    const minGasRequired = ethers.parseEther('0.0001'); // Minimal gas for XORA transfer

    if (gasBalance < minGasRequired) {
      return NextResponse.json(
        {
          error: 'Insufficient BNB for gas fees',
          details: `Treasury wallet needs at least 0.0001 BNB for gas fees but only has ${gasBalanceFormatted} BNB. Please contact support.`,
          treasuryGasBalance: gasBalanceFormatted,
        },
        { status: 503 }
      );
    }

    const xoraContractWithSigner = new ethers.Contract(XORA_ADDRESS, XORA_ABI, signer);

    try {
      // Step 1: Verify/Process payment from user
      if (currency === 'BNB') {
        // Verify that the BNB payment transaction was successful
        const paymentReceipt = await provider.getTransactionReceipt(paymentTxHash);
        
        if (!paymentReceipt) {
          return NextResponse.json(
            {
              error: 'Payment transaction not found',
              details: 'Unable to verify the BNB payment transaction. Please ensure the transaction was sent.',
            },
            { status: 400 }
          );
        }

        if (paymentReceipt.status === 0) {
          return NextResponse.json(
            {
              error: 'Payment transaction failed',
              details: 'The BNB payment transaction failed on the blockchain. Please try again.',
            },
            { status: 400 }
          );
        }

        // Verify payment amount matches
        const transactionData = await provider.getTransaction(paymentTxHash);
        if (!transactionData) {
          return NextResponse.json(
            {
              error: 'Payment transaction data not found',
              details: 'Unable to retrieve the transaction data.',
            },
            { status: 400 }
          );
        }

        const sentAmount = ethers.formatEther(transactionData.value || '0');
        console.log(`BNB Payment verified: ${paymentTxHash}, Amount: ${sentAmount} BNB`);
      } else if (currency === 'USDT') {
        // Verify the USDT payment transaction sent by the user directly to treasury
        const usdtPaymentReceipt = await provider.getTransactionReceipt(paymentTxHash);

        if (!usdtPaymentReceipt) {
          return NextResponse.json(
            {
              error: 'USDT payment transaction not found',
              details: 'Unable to verify the USDT payment transaction. Please ensure the transaction was sent.',
            },
            { status: 400 }
          );
        }

        if (usdtPaymentReceipt.status === 0) {
          return NextResponse.json(
            {
              error: 'USDT payment transaction failed',
              details: 'The USDT payment transaction failed on the blockchain. Please try again.',
            },
            { status: 400 }
          );
        }

        // Verify Transfer event: from=userAddress, to=TREASURY_WALLET, value>=expected
        const transferEventTopic = ethers.id('Transfer(address,address,uint256)');
        const usdtLog = usdtPaymentReceipt.logs.find(
          (log: any) =>
            log.address.toLowerCase() === USDT_ADDRESS.toLowerCase() &&
            log.topics[0] === transferEventTopic &&
            log.topics[1] &&
            ('0x' + log.topics[1].slice(26)).toLowerCase() === userAddress.toLowerCase() &&
            log.topics[2] &&
            ('0x' + log.topics[2].slice(26)).toLowerCase() === TREASURY_WALLET.toLowerCase()
        );

        if (!usdtLog) {
          return NextResponse.json(
            {
              error: 'USDT transfer to treasury not found',
              details: 'The transaction does not contain a valid USDT transfer to the treasury wallet.',
            },
            { status: 400 }
          );
        }

        const transferredUSDT = BigInt(usdtLog.data);
        const expectedUSDT = ethers.parseUnits(parsedAmount.toString(), USDT_DECIMALS);
        if (transferredUSDT < expectedUSDT) {
          return NextResponse.json(
            {
              error: 'Insufficient USDT payment',
              details: `Expected ${parsedAmount} USDT but received ${ethers.formatUnits(transferredUSDT, USDT_DECIMALS)} USDT.`,
            },
            { status: 400 }
          );
        }

        console.log(`USDT Payment verified: ${paymentTxHash}`);
      }

      // Step 2: Transfer XORA to user
      const transferTx = await xoraContractWithSigner.transfer(userAddress, xoraWithDecimals);
      const receipt = await transferTx.wait();
      const txHash = receipt?.hash || '';

      if (!receipt) {
        throw new Error('Transaction receipt not found');
      }

      return NextResponse.json({
        success: true,
        txHash,
        xoraAmount: xoraAmount.toFixed(9),
        userAddress,
        currency,
        paymentAmount: parsedAmount,
        message: `Successfully sent ${xoraAmount.toFixed(9)} XORA tokens to ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`,
      });
    } catch (transactionError: any) {
      console.error('Transaction error:', transactionError);

      // Parse specific transaction errors
      if (transactionError.message.includes('Insufficient balance')) {
        return NextResponse.json(
          {
            error: 'Insufficient XORA tokens',
            details: `Cannot send ${xoraAmount.toFixed(9)} XORA. Treasury balance is ${treasuryBalanceFormatted} XORA. Please try a smaller amount or contact support.`,
            treasuryBalance: treasuryBalanceFormatted,
          },
          { status: 503 }
        );
      }

      if (transactionError.message.includes('insufficient funds')) {
        return NextResponse.json(
          {
            error: 'Insufficient BNB for transaction',
            details: `Treasury wallet needs more BNB for gas fees (currently ${gasBalanceFormatted} BNB). Please contact support.`,
          },
          { status: 503 }
        );
      }

      throw transactionError;
    }
  } catch (error: any) {
    console.error('Swap error:', error);

    // Determine error type and provide helpful message
    let errorMessage = 'Transaction failed. Please try again.';
    let errorDetails = '';

    if (error.code === 'NETWORK_ERROR') {
      errorMessage = 'Network connection error';
      errorDetails = 'Unable to connect to blockchain. Please check your connection and try again.';
    } else if (error.code === 'CALL_EXCEPTION') {
      errorMessage = 'Transaction execution failed';
      errorDetails = error.reason || 'The transaction could not be executed. Please check your wallet balance and try again.';
    } else if (error.message?.includes('gas')) {
      errorMessage = 'Insufficient gas funds';
      errorDetails = 'Not enough BNB to cover gas fees. Please fund the transaction and try again.';
    } else if (error.message?.includes('balance')) {
      errorMessage = 'Insufficient balance';
      errorDetails = 'Not enough tokens available. Please try a smaller amount or contact support.';
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: errorDetails || error?.message,
        code: error?.code,
      },
      { status: 500 }
    );
  }
}

// Helper function to get BNB price
async function getBNBPrice(): Promise<number> {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd'
    );
    const data = await response.json();
    return data.binancecoin.usd;
  } catch (error) {
    console.error('Error fetching BNB price:', error);
    return 600; // Fallback price
  }
}
