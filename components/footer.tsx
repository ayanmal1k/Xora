'use client';

import Image from 'next/image';

export function Footer() {
  return (
    <footer className="relative bg-black/60 backdrop-blur-md border-t border-yellow-600/20 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Left - Text */}
          <div className="text-center sm:text-left flex-1">
            <p 
              className="text-xs sm:text-sm text-gray-400"
              style={{
                fontFamily: "'Georgia', 'Garamond', serif",
              }}
            >
              © 2026 XORA. All rights reserved. | Empowering the future of blockchain
            </p>
          </div>

          {/* Right - Social Links */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* X (Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
            >
              <div
                className="relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300"
                style={{
                  boxShadow: '0 0 0 2px rgba(212, 175, 55, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.8), inset 0 0 20px rgba(212, 175, 55, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(212, 175, 55, 0.3)';
                }}
              >
                <Image
                  src="/Images/X.png"
                  alt="X (Twitter)"
                  width={24}
                  height={24}
                  className="object-contain group-hover:brightness-150 transition-all duration-300"
                />
              </div>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
            >
              <div
                className="relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300"
                style={{
                  boxShadow: '0 0 0 2px rgba(212, 175, 55, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.8), inset 0 0 20px rgba(212, 175, 55, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(212, 175, 55, 0.3)';
                }}
              >
                <Image
                  src="/Images/telegram.png"
                  alt="Telegram"
                  width={24}
                  height={24}
                  className="object-contain group-hover:brightness-150 transition-all duration-300"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
