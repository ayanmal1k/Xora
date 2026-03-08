'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.code === 'auth/user-not-found' 
        ? 'User not found' 
        : error.code === 'auth/wrong-password' 
        ? 'Incorrect password' 
        : error.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div
          className="bg-gradient-to-br from-gray-900 to-black border border-yellow-600 rounded-xl p-8 shadow-2xl"
          style={{
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
          }}
        >
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold mb-2"
              style={{
                fontFamily: "'Sweet Gothic Serif', serif",
                background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              XORA Admin
            </h1>
            <p className="text-gray-400 text-sm">Presale Management Portal</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@xora.com"
                required
                className="bg-black/40 border-yellow-600/30 text-white placeholder:text-gray-600"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-black/40 border-yellow-600/30 text-white placeholder:text-gray-600"
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-bold"
              style={{
                fontFamily: "'Sweet Gothic Serif', serif",
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Authorized personnel only</p>
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
