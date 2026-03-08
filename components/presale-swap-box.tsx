'use client';

import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useState, useEffect } from 'react';
import { ArrowDownUp, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { XORA_PRICE_USD } from '@/lib/contracts';
import { ethers } from 'ethers';

const TREASURY_WALLET = process.env.NEXT_PUBLIC_TREASURY_WALLET_ADDRESS || '';
const MIN_USD = 20;
const MAX_USD = 10000;

export function PresaleSwapBox() {
  const { primaryWallet } = useDynamicContext();
  const [inputAmount, setInputAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<'USDT' | 'BNB'>('USDT');
  const [prices, setPrices] = useState({ USDT: 1, BNB: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [txLoading, setTxLoading] = useState(false);
  const [txStatus, setTxStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState('');

  const connectedAddress = primaryWallet?.address;

  // Debug: Log primaryWallet structure
  useEffect(() => {
    if (primaryWallet) {
      console.log('primaryWallet object:', primaryWallet);
      console.log('Treasury Wallet Address:', TREASURY_WALLET);
    }
  }, [primaryWallet]);

  // Fetch live prices
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd'
        );
        const data = await response.json();
        setPrices({
          USDT: 1,
          BNB: data.binancecoin.usd,
        });
        setError('');
      } catch (err) {
        console.error('Error fetching prices:', err);
        setError('Failed to fetch live prices');
        setPrices({ USDT: 1, BNB: 600 });
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const usdValue = inputAmount && !isNaN(parseFloat(inputAmount))
    ? parseFloat(inputAmount) * prices[selectedCurrency]
    : 0;

  const getLimitError = () => {
    if (!inputAmount || parseFloat(inputAmount) <= 0) return null;
    if (usdValue < MIN_USD) return `Minimum purchase is $${MIN_USD} USD`;
    if (usdValue > MAX_USD) return `Maximum purchase is $${MAX_USD.toLocaleString()} USD`;
    return null;
  };

  const limitError = getLimitError();

  const calculateXORA = () => {
    if (!inputAmount || isNaN(parseFloat(inputAmount))) return 0;
    const usdValue = parseFloat(inputAmount) * prices[selectedCurrency];
    return usdValue / XORA_PRICE_USD;
  };

  // Function to switch to BSC network
  const switchToBSC = async () => {
    try {
      if (!primaryWallet?._connector) {
        throw new Error('Wallet connector not available');
      }

      // Since Dynamic is configured for BSC only, wallet should already be on BSC
      // Just log for debugging
      console.log('Wallet is configured for BSC network');
      
      // If needed, we could check the network here, but for now just proceed
      // as Dynamic handles network validation
    } catch (error: any) {
      console.error('Network check failed:', error);
      throw new Error('Wallet connection error. Please ensure you are connected to Binance Smart Chain.');
    }
  };

  const handleSwap = async () => {
    if (!connectedAddress || !inputAmount || parseFloat(inputAmount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    const enteredUsd = parseFloat(inputAmount) * prices[selectedCurrency];
    if (enteredUsd < MIN_USD) {
      setError(`Minimum purchase is $${MIN_USD} USD.`);
      return;
    }
    if (enteredUsd > MAX_USD) {
      setError(`Maximum purchase is $${MAX_USD.toLocaleString()} USD.`);
      return;
    }

    try {
      setTxLoading(true);
      setTxStatus('pending');
      setError('');

      // Step 1: User pays in BNB or USDT
      let paymentTxHash: string | null = null;

      if (selectedCurrency === 'BNB') {
        // Request user to send BNB to treasury
        try {
          if (!primaryWallet?._connector) {
            setError('Wallet connector not available. Please reconnect your wallet.');
            setTxStatus('error');
            setTxLoading(false);
            return;
          }

          console.log('Getting provider from Dynamic wallet connector...');
          
          // Get provider from Dynamic wallet using multiple fallback methods
          let provider: any = null;

          // Method 1: Try getProvider
          if (primaryWallet._connector.getProvider && typeof primaryWallet._connector.getProvider === 'function') {
            provider = primaryWallet._connector.getProvider();
          }
          // Method 2: Try getting from _ethProviderHelper
          else if (primaryWallet._connector._ethProviderHelper) {
            provider = primaryWallet._connector._ethProviderHelper?.walletBookWallet?.provider;
          }
          // Method 3: Try direct window.ethereum if connector fails
          else if (typeof window !== 'undefined' && (window as any).ethereum) {
            provider = (window as any).ethereum;
          }

          if (!provider) {
            setError('Failed to get wallet provider. Please reconnect your wallet.');
            setTxStatus('error');
            setTxLoading(false);
            return;
          }

          console.log('Provider obtained:', provider);

          // Create ethers BrowserProvider from the wallet provider
          const browserProvider = new ethers.BrowserProvider(provider);
          const signer = await browserProvider.getSigner();

          if (!signer) {
            setError('Failed to get wallet signer. Please try again.');
            setTxStatus('error');
            setTxLoading(false);
            return;
          }

          console.log('Signer obtained, sending BNB transaction...');

          // Send BNB transaction
          const txResponse = await signer.sendTransaction({
            to: TREASURY_WALLET,
            value: ethers.parseEther(parseFloat(inputAmount).toString()),
            gasLimit: ethers.getBigInt(21000), // Standard BNB transfer gas limit
          });

          console.log('BNB Payment TX:', txResponse.hash);
          paymentTxHash = txResponse.hash;
          setTxHash(txResponse.hash); // Show tx hash while waiting for confirmation

          // Wait for confirmation with timeout
          const receipt = await Promise.race([
            txResponse.wait(),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Transaction confirmation timeout')), 120000)
            ),
          ]);

          if (!receipt) {
            setError('BNB payment transaction failed. Please try again.');
            setTxStatus('error');
            setTxLoading(false);
            return;
          }

          console.log('BNB transaction confirmed:', receipt);
        } catch (bnbError: any) {
          console.error('BNB payment error:', bnbError);
          
          // Parse specific error types
          let errorMsg = 'Failed to send BNB payment. Please try again.';
          
          if (bnbError.message?.includes('user rejected') || bnbError.code === 'ACTION_REJECTED') {
            errorMsg = 'Transaction was rejected by your wallet.';
          } else if (bnbError.message?.includes('insufficient funds') || bnbError.code === 'INSUFFICIENT_FUNDS') {
            errorMsg = 'Insufficient BNB in your wallet for the transfer and gas fees.';
          } else if (bnbError.message?.includes('timeout')) {
            errorMsg = 'Transaction confirmation timeout. Please check BscScan for status.';
          } else if (bnbError.message?.includes('wrong network') || bnbError.message?.includes('chainId')) {
            errorMsg = 'Wrong network detected. Please switch to Binance Smart Chain in your wallet.';
          } else if (bnbError.message) {
            errorMsg = bnbError.message;
          }

          setError(errorMsg);
          setTxStatus('error');
          setTxLoading(false);
          return;
        }
      } else if (selectedCurrency === 'USDT') {
        // Send USDT directly to treasury wallet (same pattern as BNB)
        try {
          if (!primaryWallet?._connector) {
            setError('Wallet connector not available. Please reconnect your wallet.');
            setTxStatus('error');
            setTxLoading(false);
            return;
          }

          let provider: any = null;
          if (primaryWallet._connector.getProvider && typeof primaryWallet._connector.getProvider === 'function') {
            provider = primaryWallet._connector.getProvider();
          } else if (primaryWallet._connector._ethProviderHelper) {
            provider = primaryWallet._connector._ethProviderHelper?.walletBookWallet?.provider;
          } else if (typeof window !== 'undefined' && (window as any).ethereum) {
            provider = (window as any).ethereum;
          }

          if (!provider) {
            setError('Failed to get wallet provider. Please reconnect your wallet.');
            setTxStatus('error');
            setTxLoading(false);
            return;
          }

          const browserProvider = new ethers.BrowserProvider(provider);
          const signer = await browserProvider.getSigner();

          const USDT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';
          const USDT_ABI = [
            {
              name: 'transfer',
              type: 'function',
              inputs: [
                { name: '_to', type: 'address' },
                { name: '_value', type: 'uint256' },
              ],
              outputs: [{ name: '', type: 'bool' }],
            },
          ];

          const usdtContract = new ethers.Contract(USDT_ADDRESS, USDT_ABI, signer);
          const usdtAmount = ethers.parseUnits(parseFloat(inputAmount).toString(), 18);

          console.log('Sending USDT to treasury...');
          const txResponse = await usdtContract.transfer(TREASURY_WALLET, usdtAmount);

          console.log('USDT Payment TX:', txResponse.hash);
          paymentTxHash = txResponse.hash;
          setTxHash(txResponse.hash);

          const receipt = await Promise.race([
            txResponse.wait(),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Transaction confirmation timeout')), 120000)
            ),
          ]);

          if (!receipt) {
            setError('USDT payment transaction failed. Please try again.');
            setTxStatus('error');
            setTxLoading(false);
            return;
          }

          console.log('USDT transaction confirmed:', receipt);
        } catch (usdtError: any) {
          console.error('USDT payment error:', usdtError);

          let errorMsg = 'Failed to send USDT payment. Please try again.';
          if (usdtError.message?.includes('user rejected') || usdtError.code === 'ACTION_REJECTED') {
            errorMsg = 'Transaction was rejected by your wallet.';
          } else if (
            usdtError.message?.includes('transfer amount exceeds balance') ||
            usdtError.reason === 'BEP20: transfer amount exceeds balance' ||
            usdtError.revert?.args?.[0]?.includes('transfer amount exceeds balance')
          ) {
            errorMsg = 'Insufficient USDT balance in your wallet. Please check your USDT balance and try a smaller amount.';
          } else if (usdtError.message?.includes('insufficient funds') || usdtError.code === 'INSUFFICIENT_FUNDS') {
            errorMsg = 'Insufficient BNB in your wallet to cover gas fees for the USDT transfer.';
          } else if (
            usdtError.message?.includes('Transaction does not have a transaction hash') ||
            usdtError.message?.includes('there was a problem') ||
            (usdtError.code === 'UNKNOWN_ERROR' && usdtError.error?.code === -32603)
          ) {
            errorMsg = 'Wallet failed to send the transaction. Please try again or reconnect your wallet.';
          } else if (usdtError.message?.includes('timeout')) {
            errorMsg = 'Transaction confirmation timeout. Please check BscScan for status.';
          } else if (usdtError.message) {
            errorMsg = usdtError.message;
          }

          setError(errorMsg);
          setTxStatus('error');
          setTxLoading(false);
          return;
        }
      }

      // Step 2: Call the API route to process the swap and send XORA
      const response = await fetch('/api/swap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAddress: connectedAddress,
          amount: inputAmount,
          currency: selectedCurrency,
          paymentTxHash: paymentTxHash, // Include BNB payment tx hash if applicable
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error codes
        if (response.status === 503) {
          // Service temporarily unavailable
          setError(data.details || data.error);
        } else if (response.status === 400) {
          // Bad request
          setError(data.error || 'Invalid request');
        } else if (response.status === 403) {
          // Forbidden - likely USDT approval issue
          setError(data.details || data.error || 'USDT approval required');
        } else {
          // Other errors
          setError(data.details || data.error || 'Transaction failed');
        }
        setTxStatus('error');
        return;
      }

      setTxHash(data.txHash);
      setTxStatus('success');

      // Reset form
      setInputAmount('');
      setTimeout(() => {
        setTxStatus('idle');
        setTxHash('');
      }, 5000);
    } catch (err: any) {
      console.error('Swap error:', err);
      setError(err?.message || 'Network error. Please check your connection and try again.');
      setTxStatus('error');
    } finally {
      setTxLoading(false);
    }
  };

  const xoraAmount = calculateXORA();

  if (!connectedAddress) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-sm sm:max-w-md">
          <div
            className="relative bg-gradient-to-br from-gray-900 to-black border border-yellow-600 rounded-lg p-6 sm:p-8 overflow-hidden text-center"
            style={{
              boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
            }}
          >
            {/* Shine overlay */}
            <div
              className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)',
              }}
            ></div>

            <div className="relative z-10">
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4"
                style={{
                  fontFamily: "'Sweet Gothic Serif', serif",
                  background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 3s ease-in-out infinite',
                }}
              >
                Join Presale
              </h2>
              <p className="text-sm sm:text-base text-white opacity-75 mb-4 sm:mb-6" style={{ fontFamily: "'Georgia', 'Garamond', serif" }}>
                Connect your wallet to start purchasing XORA tokens
              </p>
              <p
                className="text-xs sm:text-sm text-yellow-600 mb-4 sm:mb-6"
                style={{ fontFamily: "'Georgia', 'Garamond', serif" }}
              >
                XORA Price: ${XORA_PRICE_USD}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-sm sm:max-w-md">
        <div
          className="relative bg-gradient-to-br from-gray-900 to-black border border-yellow-600 rounded-lg p-6 sm:p-8 overflow-hidden"
          style={{
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
          }}
        >
          {/* Shine overlay */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)',
            }}
          ></div>

          <div className="relative z-10">
            {/* Header */}
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center"
              style={{
                fontFamily: "'Sweet Gothic Serif', serif",
                background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 3s ease-in-out infinite',
              }}
            >
              Swap for XORA
            </h2>

            {/* Status Messages */}
            {error && (
              <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-900/30 border border-red-600 rounded text-red-400 text-xs sm:text-sm flex items-start sm:items-center gap-2">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5 sm:mt-0" />
                <span>{error}</span>
              </div>
            )}

            {txStatus === 'success' && (
              <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-green-900/30 border border-green-600 rounded text-green-400 text-xs sm:text-sm flex items-start sm:items-center gap-2">
                <CheckCircle size={16} className="flex-shrink-0 mt-0.5 sm:mt-0" />
                <span>
                  Swap successful! {txHash && <a href={`https://bscscan.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="underline ml-1">View</a>}
                </span>
              </div>
            )}

            {/* From Input */}
            <div className="mb-5 sm:mb-6">
              <label className="block text-white text-xs sm:text-sm mb-2" style={{ fontFamily: "'Sweet Gothic Serif', serif" }}>
                You Pay
              </label>
              <div className="flex flex-col sm:flex-row gap-2 mb-3">
                <input
                  type="number"
                  placeholder="0"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  disabled={txLoading}
                  className="flex-1 bg-black border border-yellow-600/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-yellow-600 disabled:opacity-50"
                  style={{ fontFamily: "'Georgia', 'Garamond', serif" }}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCurrency('USDT')}
                    disabled={txLoading}
                    className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 disabled:opacity-50 flex-1 sm:flex-none"
                    style={{
                      fontFamily: "'Sweet Gothic Serif', serif",
                      backgroundColor: selectedCurrency === 'USDT' ? '#d4af37' : '#1a1a1a',
                      color: selectedCurrency === 'USDT' ? '#000000' : '#d4af37',
                      border: `1px solid ${selectedCurrency === 'USDT' ? '#d4af37' : '#d4af37/30'}`,
                    }}
                  >
                    USDT
                  </button>
                  <button
                    onClick={() => setSelectedCurrency('BNB')}
                    disabled={txLoading}
                    className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 disabled:opacity-50 flex-1 sm:flex-none"
                    style={{
                      fontFamily: "'Sweet Gothic Serif', serif",
                      backgroundColor: selectedCurrency === 'BNB' ? '#d4af37' : '#1a1a1a',
                      color: selectedCurrency === 'BNB' ? '#000000' : '#d4af37',
                      border: `1px solid ${selectedCurrency === 'BNB' ? '#d4af37' : '#d4af37/30'}`,
                    }}
                  >
                    BNB
                  </button>
                </div>
              </div>
              {/* Limit hint / inline error */}
              <div className="flex items-center justify-between text-xs mt-2" style={{ fontFamily: "'Georgia', 'Garamond', serif" }}>
                <span style={{ color: limitError ? '#f87171' : 'rgba(255,255,255,0.35)' }}>
                  {limitError
                    ? limitError
                    : `Min $${MIN_USD} · Max $${MAX_USD.toLocaleString()} USD`}
                </span>
                {inputAmount && !limitError && usdValue > 0 && (
                  <span style={{ color: 'rgba(212,175,55,0.7)' }}>≈ ${usdValue.toFixed(2)} USD</span>
                )}
              </div>

              <div className="text-xs text-gray-400 text-right mt-1" style={{ fontFamily: "'Georgia', 'Garamond', serif" }}>
                {loading ? (
                  <span className="flex items-center justify-end gap-1">
                    <Loader size={12} className="animate-spin" />
                    Fetching price...
                  </span>
                ) : (
                  <span>1 {selectedCurrency} = ${prices[selectedCurrency].toFixed(2)}</span>
                )}
              </div>
            </div>

            {/* Arrow Separator */}
            <div className="flex justify-center mb-5 sm:mb-6">
              <div
                className="p-2 rounded-lg"
                style={{
                  backgroundColor: '#d4af37/10',
                  border: '1px solid #d4af37/30',
                }}
              >
                <ArrowDownUp size={18} color="#d4af37" />
              </div>
            </div>

            {/* To Output */}
            <div className="mb-5 sm:mb-6">
              <label className="block text-white text-xs sm:text-sm mb-2" style={{ fontFamily: "'Sweet Gothic Serif', serif" }}>
                You Receive
              </label>
              <div className="bg-black border border-yellow-600/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
                <span className="text-white text-base sm:text-lg font-bold" style={{ fontFamily: "'Georgia', 'Garamond', serif" }}>
                  {xoraAmount.toFixed(2)}
                </span>
                <span className="text-yellow-600 font-bold text-xs sm:text-sm" style={{ fontFamily: "'Sweet Gothic Serif', serif" }}>
                  XORA
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-2 text-right" style={{ fontFamily: "'Georgia', 'Garamond', serif" }}>
                1 XORA = ${XORA_PRICE_USD}
              </div>
            </div>

            {/* Conversion Info */}
            {inputAmount && (
              <div className="mb-5 sm:mb-6 p-2 sm:p-3 bg-yellow-600/10 border border-yellow-600/30 rounded text-xs sm:text-sm text-yellow-600">
                <p style={{ fontFamily: "'Georgia', 'Garamond', serif" }}>
                  {inputAmount} {selectedCurrency} = {xoraAmount.toFixed(2)} XORA
                </p>
              </div>
            )}

            {/* Purchase Button */}
            <button
              onClick={handleSwap}
              disabled={!inputAmount || parseFloat(inputAmount) <= 0 || !!limitError || txLoading}
              className="w-full py-2 sm:py-3 px-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 disabled:opacity-50"
              style={{
                fontFamily: "'Sweet Gothic Serif', serif",
                backgroundColor: '#d4af37',
                color: '#000000',
                letterSpacing: '0.05em',
                boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)',
              }}
              onMouseEnter={(e) => {
                if (txLoading) return;
                const element = e.currentTarget as HTMLElement;
                element.style.backgroundColor = '#f0e68c';
                element.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.8)';
                element.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                const element = e.currentTarget as HTMLElement;
                element.style.backgroundColor = '#d4af37';
                element.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.3)';
                element.style.transform = 'scale(1)';
              }}
            >
              {txLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader size={16} className="animate-spin" />
                  <span className="text-xs sm:text-sm">Processing...</span>
                </span>
              ) : inputAmount && parseFloat(inputAmount) > 0 ? (
                <span className="text-xs sm:text-sm">Purchase {xoraAmount.toFixed(2)} XORA</span>
              ) : (
                'Enter Amount'
              )}
            </button>

            {/* Connected Address */}
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-xs text-gray-400" style={{ fontFamily: "'Georgia', 'Garamond', serif" }}>
                Connected: {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
