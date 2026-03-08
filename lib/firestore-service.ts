import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export interface TokenData {
  totalToken: number;
  soldToken: number;
  updatedAt: string;
}

const TOKEN_DOC_ID = 'presale_token';
const TOKEN_COLLECTION = 'token';

// Initialize default token data if it doesn't exist
export const initializeTokenData = async () => {
  try {
    const tokenRef = doc(db, TOKEN_COLLECTION, TOKEN_DOC_ID);
    const tokenSnap = await getDoc(tokenRef);

    if (!tokenSnap.exists()) {
      const defaultData: TokenData = {
        totalToken: 560000000, // 560M tokens
        soldToken: 252000000, // 45% of total (45%)
        updatedAt: new Date().toISOString(),
      };
      await setDoc(tokenRef, defaultData);
      return defaultData;
    }
    return tokenSnap.data() as TokenData;
  } catch (error) {
    console.error('Error initializing token data:', error);
    throw error;
  }
};

// Get current token data
export const getTokenData = async (): Promise<TokenData | null> => {
  try {
    const tokenRef = doc(db, TOKEN_COLLECTION, TOKEN_DOC_ID);
    const tokenSnap = await getDoc(tokenRef);

    if (tokenSnap.exists()) {
      return tokenSnap.data() as TokenData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching token data:', error);
    throw error;
  }
};

// Update token data
export const updateTokenData = async (
  soldToken: number,
  totalToken: number
): Promise<void> => {
  try {
    const tokenRef = doc(db, TOKEN_COLLECTION, TOKEN_DOC_ID);
    
    // Validate data
    if (soldToken < 0 || totalToken <= 0 || soldToken > totalToken) {
      throw new Error('Invalid token values');
    }

    await updateDoc(tokenRef, {
      soldToken,
      totalToken,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating token data:', error);
    throw error;
  }
};

// Calculate percentage sold
export const calculatePercentageSold = (data: TokenData): number => {
  if (data.totalToken === 0) return 0;
  return Math.round((data.soldToken / data.totalToken) * 100);
};
