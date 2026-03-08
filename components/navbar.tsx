'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Whitepaper', href: '#whitepaper' },
    { name: 'Tokenomics', href: '#tokenomics' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Community', href: '#community' },
  ];

  return (
    <nav className="relative bg-black/40 backdrop-blur-md border-b border-yellow-600/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-white hover:text-yellow-400 transition-colors duration-300"
                style={{
                  fontFamily: "'Sweet Gothic Serif', serif",
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Buy XORA Button */}
          <div className="hidden md:block">
            <Link href="/presale">
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
                Buy XORA
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-yellow-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-black/80 backdrop-blur-md border-t border-yellow-600/20 px-4 py-4">
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-white hover:text-yellow-400 transition-colors py-2"
                  style={{
                    fontFamily: "'Sweet Gothic Serif', serif",
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Link href="/presale" onClick={() => setIsOpen(false)}>
                <button
                  className="w-full px-6 py-2 text-base font-bold rounded-lg transition-all duration-300"
                  style={{
                    fontFamily: "'Sweet Gothic Serif', serif",
                    backgroundColor: '#d4af37',
                    color: '#000000',
                    letterSpacing: '0.05em',
                  }}
                >
                  Buy XORA
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

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
    </nav>
  );
}
