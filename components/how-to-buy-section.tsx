'use client';

export function HowToBuySection() {
  const steps = [
    {
      number: '01',
      title: 'Go to Presale Section',
      description: 'Navigate to the presale section on our website and locate the "Buy $XORA" button to get started.',
      icon: '🎯',
    },
    {
      number: '02',
      title: 'Press Buy $XORA Button',
      description: 'Click the "Buy $XORA" button to proceed to the presale page where all transactions happen.',
      icon: '🔘',
    },
    {
      number: '03',
      title: 'Connect Your Wallet',
      description: 'On the presale page, click "Connect Wallet" and connect any BSC (Binance Smart Chain) compatible wallet.',
      icon: '🔗',
    },
    {
      number: '04',
      title: 'Enter Amount',
      description: 'Enter the amount you want to invest in USDT or BNB tokens and review the transaction details.',
      icon: '💰',
    },
    {
      number: '05',
      title: 'Confirm & Swap',
      description: 'Click the "Buy" button to swap your USDT or BNB for XORA tokens. Confirm the transaction in your wallet.',
      icon: '✅',
    },
  ];

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      {/* Section Container */}
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 
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
            How to Buy $XORA
          </h2>
          <p 
            className="text-base sm:text-lg text-white opacity-75 mt-4 max-w-2xl mx-auto"
            style={{
              fontFamily: "'Georgia', 'Garamond', serif",
            }}
          >
            Follow these simple steps to purchase XORA tokens during our presale
          </p>
        </div>

        {/* Desktop Horizontal Steps */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Horizontal connector line */}
            <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600" 
              style={{
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
              }}
            ></div>

            {/* Steps Grid Horizontal */}
            <div className="grid grid-cols-5 gap-4 lg:gap-6">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="relative flex flex-col items-center"
                >
                  {/* Top Circle with Step Number */}
                  <div className="relative flex items-center justify-center mb-8 transition-all duration-300 hover:scale-110" style={{ width: '80px', height: '80px', zIndex: 10 }}>
                    {/* Outer glow circle */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                        boxShadow: '0 0 40px rgba(212, 175, 55, 0.8)',
                      }}
                    ></div>

                    {/* Inner black circle */}
                    <div 
                      className="absolute inset-2 rounded-full flex items-center justify-center bg-black"
                    >
                      <div 
                        className="text-2xl font-bold"
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
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div
                    className="relative group bg-gradient-to-br from-gray-900 to-black border border-yellow-600 rounded-lg p-4 lg:p-6 overflow-hidden transition-all duration-300 group-hover:shadow-2xl h-full w-full"
                    style={{
                      boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 40px rgba(212, 175, 55, 0.5), inset 0 0 20px rgba(212, 175, 55, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.2)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Shine overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)',
                      }}
                    ></div>

                    <div className="relative z-10">
                      <h3 
                        className="text-sm lg:text-base font-bold mb-2 text-white line-clamp-2"
                        style={{
                          fontFamily: "'Sweet Gothic Serif', serif",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p 
                        className="text-xs lg:text-sm leading-relaxed text-white opacity-90"
                        style={{
                          fontFamily: "'Georgia', 'Garamond', serif",
                        }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Vertical Steps */}
        <div className="md:hidden">
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 via-yellow-400 to-yellow-600" 
              style={{
                transform: 'translateX(-50%)',
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
              }}
            ></div>

            {/* Steps Grid */}
            <div className="space-y-8 sm:space-y-12">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`relative flex flex-col sm:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full sm:w-5/12">
                    <div
                      className="relative group bg-gradient-to-br from-gray-900 to-black border border-yellow-600 rounded-lg p-6 sm:p-8 overflow-hidden transition-all duration-300 group-hover:shadow-2xl"
                      style={{
                        boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 40px rgba(212, 175, 55, 0.5), inset 0 0 20px rgba(212, 175, 55, 0.1)';
                        e.currentTarget.style.transform = 'translateY(-5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.2)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {/* Shine overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)',
                        }}
                      ></div>

                      <div className="relative z-10">
                        <h3 
                          className="text-lg sm:text-xl font-bold mb-2 text-white"
                          style={{
                            fontFamily: "'Sweet Gothic Serif', serif",
                          }}
                        >
                          {step.title}
                        </h3>
                        <p 
                          className="text-sm sm:text-base leading-relaxed text-white opacity-90"
                          style={{
                            fontFamily: "'Georgia', 'Garamond', serif",
                          }}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Step Number */}
                  <div className="sm:hidden">
                    <div 
                      className="relative flex items-center justify-center"
                      style={{
                        width: '80px',
                        height: '80px',
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                          boxShadow: '0 0 30px rgba(212, 175, 55, 0.8)',
                        }}
                      ></div>

                      <div 
                        className="absolute inset-2 rounded-full flex items-center justify-center bg-black"
                      >
                        <div 
                          className="text-3xl font-bold"
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
                          {step.number}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden sm:block sm:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block">
            <button
              className="px-10 sm:px-14 py-4 sm:py-5 text-base sm:text-lg font-bold rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: "'Sweet Gothic Serif', serif",
                backgroundColor: '#d4af37',
                color: '#000000',
                letterSpacing: '0.05em',
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
              }}
              onMouseEnter={(e) => {
                const element = e.currentTarget as HTMLElement;
                element.style.backgroundColor = '#f0e68c';
                element.style.boxShadow = '0 0 40px rgba(212, 175, 55, 0.8)';
              }}
              onMouseLeave={(e) => {
                const element = e.currentTarget as HTMLElement;
                element.style.backgroundColor = '#d4af37';
                element.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.3)';
              }}
              onClick={() => {
                // Scroll to presale section or navigate
                window.location.href = '#presale';
              }}
            >
              Start Buying Now
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
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
    </section>
  );
}
