'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ParticleBackground } from '@/components/particle-background';
import { Footer } from '@/components/footer';
import { DynamicProvider } from '@/components/dynamic-provider';
import { WalletConnectButton } from '@/components/wallet-connect-button';
import { PresaleSwapBox } from '@/components/presale-swap-box';
import { useEffect } from 'react';

function PresaleContent() {
  useEffect(() => {
    // Hide the global navbar and footer on presale page
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');
    
    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';
    
    return () => {
      // Show them again when leaving presale page
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
    };
  }, []);

  return (
    <main className="relative w-full bg-black overflow-hidden min-h-screen">
      <ParticleBackground />
      
      {/* Presale Navbar */}
      <nav className="relative bg-black/40 backdrop-blur-md border-b border-yellow-600/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo and Text - Left Side */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image
                  src="/Images/Icon Nobg.png"
                  alt="XORA Logo"
                  width={48}
                  height={48}
                  className="object-contain group-hover:brightness-150 transition-all duration-300"
                />
              </div>
              <span
                className="text-xl sm:text-2xl font-bold hidden sm:inline"
                style={{
                  fontFamily: "'Sweet Gothic Serif', serif",
                  background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 3s ease-in-out infinite',
                  letterSpacing: '0.05em',
                }}
              >
                
              </span>
            </Link>

            {/* Navigation Items - Right Side */}
            <div className="flex items-center gap-4">
              {/* Connect Wallet Button */}
              <WalletConnectButton />
              
              {/* Home Button */}
              <Link href="/">
                <button
                  className="px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base font-bold rounded-lg transition-all duration-300"
                  style={{
                    fontFamily: "'Sweet Gothic Serif', serif",
                    backgroundColor: '#d4af37',
                    color: '#000000',
                    letterSpacing: '0.05em',
                    boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    const element = e.currentTarget as HTMLElement;
                    element.style.backgroundColor = '#f0e68c';
                    element.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.8)';
                    element.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    const element = e.currentTarget as HTMLElement;
                    element.style.backgroundColor = '#d4af37';
                    element.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.3)';
                    element.style.transform = 'scale(1)';
                  }}
                >
                  Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content on top of particles */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-20">
        <div className="w-full flex flex-col items-center gap-12">
          {/* Title Section */}
          <div className="text-center max-w-2xl">
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-wider mb-4"
              style={{
                fontFamily: "'Sweet Gothic Serif', serif",
                background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 3s ease-in-out infinite',
                letterSpacing: '0.05em',
              }}
            >
              Presale
            </h1>
            <p 
              className="text-base sm:text-lg text-white opacity-75 mt-4"
              style={{
                fontFamily: "'Georgia', 'Garamond', serif",
              }}
            >
              Secure your XORA tokens during our presale. Limited time offer!
            </p>
          </div>

          {/* Presale Swap Box */}
          <PresaleSwapBox />

          {/* Anti-Phishing Warning */}
          <div
            className="w-full max-w-md rounded-xl border px-5 py-4 flex gap-3 items-start"
            style={{
              background: 'linear-gradient(135deg, rgba(20,10,0,0.85) 0%, rgba(40,20,0,0.9) 100%)',
              borderColor: 'rgba(212,175,55,0.35)',
              boxShadow: '0 0 24px rgba(212,175,55,0.08), inset 0 0 0 1px rgba(212,175,55,0.08)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d4af37"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-1.5">
              <p
                className="text-sm font-semibold tracking-wide"
                style={{ color: '#d4af37', fontFamily: "'Sweet Gothic Serif', serif" }}
              >
                Always verify you are on the official website
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Scammers create fake sites that look identical to ours. Before interacting with your
                wallet, confirm the URL in your browser matches exactly:
              </p>
              <div
                className="mt-1 rounded-md px-3 py-2 text-xs font-mono tracking-wide select-all"
                style={{
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  color: '#f0e68c',
                  letterSpacing: '0.03em',
                }}
              >
                https://xora.mintora.io/presale
              </div>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                We will <span style={{ color: '#d4af37' }}>never</span> ask for your seed phrase or
                private key. If in doubt, do not proceed.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% {
            background-position: 200% 0;
          }
          50% {
            background-position: -200% 0;
          }
        }

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
    </main>
  );
}

export default function PresalePage() {
  return (
    <DynamicProvider>
      <PresaleContent />
    </DynamicProvider>
  );
}
