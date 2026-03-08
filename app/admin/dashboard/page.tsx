'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getTokenData, updateTokenData, calculatePercentageSold, TokenData, initializeTokenData } from '@/lib/firestore-service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { LogOut, Save, RotateCcw } from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [soldToken, setSoldToken] = useState('');
  const [totalToken, setTotalToken] = useState('');
  const [saving, setSaving] = useState(false);
  const [percentageSold, setPercentageSold] = useState(0);

  // Check authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
        fetchTokenData();
      } else {
        setAuthenticated(false);
        router.push('/admin/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Fetch token data from Firestore
  const fetchTokenData = async () => {
    try {
      let data = await getTokenData();
      
      // Initialize if doesn't exist
      if (!data) {
        data = await initializeTokenData();
      }

      if (data) {
        setTokenData(data);
        setSoldToken(data.soldToken.toString());
        setTotalToken(data.totalToken.toString());
        setPercentageSold(calculatePercentageSold(data));
      }
    } catch (error) {
      console.error('Error fetching token data:', error);
      toast.error('Failed to load token data');
    }
  };

  // Update token values in input fields
  const handleSoldTokenChange = (value: string) => {
    setSoldToken(value);
    if (totalToken) {
      const sold = parseInt(value) || 0;
      const total = parseInt(totalToken) || 1;
      setPercentageSold(Math.round((sold / total) * 100));
    }
  };

  const handleTotalTokenChange = (value: string) => {
    setTotalToken(value);
    if (soldToken) {
      const sold = parseInt(soldToken) || 0;
      const total = parseInt(value) || 1;
      setPercentageSold(Math.round((sold / total) * 100));
    }
  };

  // Save changes to Firestore
  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      const sold = parseInt(soldToken);
      const total = parseInt(totalToken);

      if (isNaN(sold) || isNaN(total) || sold < 0 || total <= 0 || sold > total) {
        toast.error('Please enter valid token values');
        setSaving(false);
        return;
      }

      await updateTokenData(sold, total);
      toast.success('Token data updated successfully!');
      setPercentageSold(calculatePercentageSold({ soldToken: sold, totalToken: total, updatedAt: new Date().toISOString() }));
      await fetchTokenData();
    } catch (error) {
      console.error('Error saving token data:', error);
      toast.error('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  // Reset to original values
  const handleReset = () => {
    if (tokenData) {
      setSoldToken(tokenData.soldToken.toString());
      setTotalToken(tokenData.totalToken.toString());
      setPercentageSold(calculatePercentageSold(tokenData));
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-4xl md:text-5xl font-bold"
              style={{
                fontFamily: "'Sweet Gothic Serif', serif",
                background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-2">Manage Presale Progress</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-600/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Main Card */}
        <div
          className="bg-gradient-to-br from-gray-900 to-black border border-yellow-600 rounded-xl p-8 shadow-2xl"
          style={{
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
          }}
        >
          {/* Token Data Section */}
          <div className="space-y-8">
            {/* Current Stats */}
            {tokenData && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Sold Tokens */}
                <div className="bg-black/40 rounded-lg p-6 border border-yellow-600/30">
                  <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Tokens Sold</p>
                  <p
                    className="text-2xl md:text-3xl font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {tokenData.soldToken.toLocaleString()}
                  </p>
                </div>

                {/* Total Tokens */}
                <div className="bg-black/40 rounded-lg p-6 border border-yellow-600/30">
                  <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Total Allocation</p>
                  <p
                    className="text-2xl md:text-3xl font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {tokenData.totalToken.toLocaleString()}
                  </p>
                </div>

                {/* Percentage */}
                <div className="bg-black/40 rounded-lg p-6 border border-yellow-600/30">
                  <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Progress</p>
                  <p
                    className="text-2xl md:text-3xl font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {percentageSold}%
                  </p>
                </div>
              </div>
            )}

            {/* Progress Bar Preview */}
            <div className="bg-black/40 rounded-lg p-6 border border-yellow-600/30 space-y-4">
              <p className="text-gray-400 text-sm uppercase tracking-widest">Progress Bar Preview</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Presale Progress</span>
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                    className="font-bold"
                  >
                    {percentageSold}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-6 bg-black rounded-full overflow-hidden border border-yellow-600/30">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${percentageSold}%`,
                      background: 'linear-gradient(90deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                      boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)',
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Update Token Data</h3>

              {/* Sold Tokens Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Tokens Sold (XORA)
                </label>
                <Input
                  type="number"
                  value={soldToken}
                  onChange={(e) => handleSoldTokenChange(e.target.value)}
                  placeholder="Enter tokens sold"
                  className="bg-black/40 border-yellow-600/30 text-white placeholder:text-gray-600"
                />
                <p className="text-xs text-gray-500">
                  Current: {tokenData?.soldToken.toLocaleString()} tokens
                </p>
              </div>

              {/* Total Tokens Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Total Allocation (XORA)
                </label>
                <Input
                  type="number"
                  value={totalToken}
                  onChange={(e) => handleTotalTokenChange(e.target.value)}
                  placeholder="Enter total allocation"
                  className="bg-black/40 border-yellow-600/30 text-white placeholder:text-gray-600"
                />
                <p className="text-xs text-gray-500">
                  Current: {tokenData?.totalToken.toLocaleString()} tokens
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-blue-500/10 border border-blue-600/30 rounded-lg p-4">
                <p className="text-sm text-blue-300">
                  <span className="font-bold">Note:</span> Updates will be reflected on the homepage presale section immediately.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleSaveChanges}
                disabled={saving}
                className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold"
                style={{
                  fontFamily: "'Sweet Gothic Serif', serif",
                }}
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>

              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1 border-yellow-600 text-yellow-600 hover:bg-yellow-600/10"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Last Updated */}
            {tokenData && (
              <div className="pt-4 border-t border-yellow-600/30">
                <p className="text-xs text-gray-500 text-center">
                  Last updated: {new Date(tokenData.updatedAt).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @font-face {
          font-family: 'Sweet Gothic Serif';
          src: url('/Font/sweet-gothic-serif-font/sweet-gothic-serif-bold.ttf') format('truetype');
          font-weight: bold;
        }

        @font-face {
          font-family: 'Sweet Gothic Serif';
          src: url('/Font/sweet-gothic-serif-font/sweet-gothic-serif-regular.ttf') format('truetype');
          font-weight: normal;
        }
      `}</style>
    </div>
  );
}
