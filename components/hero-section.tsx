'use client';

import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto text-center">
        {/* Branding - MINTORA */}
        <div className="mb-3">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider"
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
            MINTORA
          </h2>
        </div>

        {/* Main Title - XORA */}
        <div className="mb-10">
          <h1 
            className="text-7xl sm:text-8xl md:text-9xl lg:text-10xl font-bold tracking-wider"
            style={{
              fontFamily: "'Sweet Gothic Serif', serif",
              background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 3s ease-in-out infinite 0.5s',
              letterSpacing: '0.05em',
              lineHeight: '1.1',
            }}
          >
            XORA
          </h1>
        </div>

        {/* Description */}
        <div className="mb-12 max-w-3xl mx-auto px-4 sm:px-6">
          <p 
            className="text-base sm:text-lg md:text-xl leading-relaxed text-white opacity-90"
            style={{
              fontFamily: "'Georgia', 'Garamond', serif",
              fontWeight: 400,
              letterSpacing: '0.3px',
            }}
          >
            The financial world is rapidly evolving with the growth of blockchain technology and digital assets - Xora is designed to explore innovative models that combine
blockchain infrastructure with structured financial concepts.
          </p>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center">
          <a href="#whitepaper">
            <Button
              className="px-10 sm:px-14 py-4 sm:py-5 text-base sm:text-lg font-bold"
              style={{
                fontFamily: "'Sweet Gothic Serif', serif",
                backgroundColor: '#d4af37',
                color: '#000000',
                borderRadius: '0.5rem',
                transition: 'all 0.3s ease',
                letterSpacing: '0.05em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f0e68c';
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#d4af37';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Read Whitepaper
            </Button>
          </a>

          <a href="/presale">
            <Button
              className="px-10 sm:px-14 py-4 sm:py-5 text-base sm:text-lg font-bold"
              style={{
                fontFamily: "'Sweet Gothic Serif', serif",
                backgroundColor: 'transparent',
                color: '#d4af37',
                border: '2px solid #d4af37',
                borderRadius: '0.5rem',
                transition: 'all 0.3s ease',
                letterSpacing: '0.05em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d4af37';
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#d4af37';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Buy $XORA
            </Button>
          </a>
        </div>
      </div>

      {/* CSS for shimmer animation */}
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
    </div>
  );
}
