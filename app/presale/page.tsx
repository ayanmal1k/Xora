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
