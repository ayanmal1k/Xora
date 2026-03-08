'use client';

export function MissionVisionSection() {
  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      {/* Section Container */}
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
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
            Our Purpose
          </h2>
          <p 
            className="text-base sm:text-lg text-white opacity-75 mt-4"
            style={{
              fontFamily: "'Georgia', 'Garamond', serif",
            }}
          >
            Building a transparent blockchain ecosystem for the future
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Mission Card */}
          <div 
            className="relative group h-full"
            style={{
              perspective: '1000px',
            }}
          >
            <div
              className="relative bg-gradient-to-br from-gray-900 to-black border border-yellow-600 rounded-lg p-8 sm:p-10 overflow-hidden transition-all duration-300 group-hover:shadow-2xl h-full flex flex-col"
              style={{
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
                borderImage: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%) 1',
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
                  animation: 'shimmerOverlay 2s ease-in-out infinite',
                }}
              ></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                <h3 
                  className="text-3xl sm:text-4xl font-bold mb-6"
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
                  Mission
                </h3>
                <p 
                  className="text-base sm:text-lg leading-relaxed text-white opacity-90 flex-grow"
                  style={{
                    fontFamily: "'Georgia', 'Garamond', serif",
                  }}
                >
                  Mintora's mission is to develop a transparent, community-focused blockchain ecosystem capable of exploring modern financial models. Through responsible development, strategic capital planning, and continuous innovation, the project seeks to create long-term value within the evolving digital economy.
                </p>

                {/* Highlight Stats */}
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <p 
                    className="text-sm text-gray-400 uppercase tracking-widest mb-3"
                    style={{
                      fontFamily: "'Sweet Gothic Serif', serif",
                    }}
                  >
                    Key Focus Areas
                  </p>
                  <ul className="space-y-2 text-sm text-white opacity-80">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                      Community-Focused Development
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                      Strategic Capital Planning
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                      Long-Term Value Creation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div 
            className="relative group h-full"
            style={{
              perspective: '1000px',
            }}
          >
            <div
              className="relative bg-gradient-to-br from-gray-900 to-black border border-yellow-600 rounded-lg p-8 sm:p-10 overflow-hidden transition-all duration-300 group-hover:shadow-2xl h-full flex flex-col"
              style={{
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
                borderImage: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%) 1',
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
                  animation: 'shimmerOverlay 2s ease-in-out infinite',
                }}
              ></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                <h3 
                  className="text-3xl sm:text-4xl font-bold mb-6"
                  style={{
                    fontFamily: "'Sweet Gothic Serif', serif",
                    background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'shimmer 3s ease-in-out infinite 0.5s',
                  }}
                >
                  Vision
                </h3>
                <p 
                  className="text-base sm:text-lg leading-relaxed text-white opacity-90 flex-grow"
                  style={{
                    fontFamily: "'Georgia', 'Garamond', serif",
                  }}
                >
                  The vision of Mintora - Xora is to establish a globally accessible ecosystem where blockchain technology enables transparent participation in financial concepts that traditionally existed only in institutional environments. The project aims to develop a sustainable platform driven by community engagement, responsible growth, and strategic planning.
                </p>

                {/* Highlight Stats */}
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <p 
                    className="text-sm text-gray-400 uppercase tracking-widest mb-3"
                    style={{
                      fontFamily: "'Sweet Gothic Serif', serif",
                    }}
                  >
                    Core Values
                  </p>
                  <ul className="space-y-2 text-sm text-white opacity-80">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                      Global Accessibility
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                      Transparent Participation
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                      Sustainable Growth
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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

        @keyframes shimmerOverlay {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 0.2;
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
