'use client';

import Image from 'next/image';

export function RoadmapSection() {
  const roadmapStages = [
    {
      phase: 'Phase 1',
      title: 'Project Preparation',
      description: 'Website development, smart contract deployment, and community growth initiatives.',
      icon: '/Images/roadmap 1.png',
      status: 'Completed',
      position: 'left',
    },
    {
      phase: 'Phase 2',
      title: 'Token Pre-Sale',
      description: 'Token pre-sale launch and professional marketing campaigns to expand the global community.',
      icon: '/Images/roadmap 2.png',
      status: 'Active',
      position: 'right',
    },
    {
      phase: 'Phase 3',
      title: 'Ecosystem Activation',
      description: 'Capital deployment into diversified strategies and infrastructure expansion.',
      icon: '/Images/roadmap 3.png',
      status: 'Upcoming',
      position: 'left',
    },
    {
      phase: 'Phase 4',
      title: 'Long-Term Growth',
      description: 'Periodic distribution mechanisms, strategic partnerships, and continued development.',
      icon: '/Images/roadmap 4.png',
      status: 'Future',
      position: 'right',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return '#10b981';
      case 'Active':
        return '#d4af37';
      case 'Upcoming':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      {/* Section Container */}
      <div className="max-w-6xl mx-auto">
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
            $XORA Roadmap
          </h2>
          <p 
            className="text-base sm:text-lg text-white opacity-75 mt-4"
            style={{
              fontFamily: "'Georgia', 'Garamond', serif",
            }}
          >
            Our journey to building a sustainable blockchain ecosystem
          </p>
        </div>

        {/* Z-Shaped Roadmap */}
        <div className="relative">
          {/* Vertical line connector */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 via-yellow-400 to-yellow-600" 
            style={{
              transform: 'translateX(-50%)',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
            }}
          ></div>

          {/* Roadmap Items */}
          <div className="space-y-12 lg:space-y-16">
            {roadmapStages.map((stage, index) => {
              const isLeft = stage.position === 'left';

              return (
                <div 
                  key={index}
                  className={`relative flex items-center ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Content Card */}
                  <div className={`w-full lg:w-5/12 ${isLeft ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div
                      className="relative group bg-gradient-to-br from-gray-900 to-black border border-yellow-600 rounded-lg p-6 sm:p-8 overflow-hidden transition-all duration-300 group-hover:shadow-2xl h-full"
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

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <span 
                            className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full"
                            style={{
                              fontFamily: "'Sweet Gothic Serif', serif",
                              backgroundColor: getStatusColor(stage.status),
                              color: stage.status === 'Active' ? '#000000' : '#ffffff',
                            }}
                          >
                            {stage.status}
                          </span>
                        </div>

                        <p 
                          className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest mb-2"
                          style={{
                            fontFamily: "'Sweet Gothic Serif', serif",
                          }}
                        >
                          {stage.phase}
                        </p>

                        <h3 
                          className="text-2xl sm:text-3xl font-bold mb-4"
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
                          {stage.title}
                        </h3>

                        <p 
                          className="text-base text-white opacity-90 leading-relaxed"
                          style={{
                            fontFamily: "'Georgia', 'Garamond', serif",
                          }}
                        >
                          {stage.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Center Icon Circle - Desktop */}
                  <div className="hidden lg:flex w-2/12 justify-center">
                    <div 
                      className="relative"
                      style={{
                        width: '80px',
                        height: '80px',
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                          boxShadow: '0 0 30px rgba(212, 175, 55, 0.6)',
                        }}
                      >
                        <div 
                          className="absolute inset-1 rounded-full flex items-center justify-center bg-black p-2"
                        >
                          <Image 
                            src={stage.icon}
                            alt={stage.title}
                            width={60}
                            height={60}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Icon */}
                  <div className="lg:hidden absolute -left-6 top-0 w-12 h-12 flex items-center justify-center">
                    <div
                      className="relative"
                      style={{
                        width: '48px',
                        height: '48px',
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                          boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)',
                        }}
                      >
                        <div 
                          className="absolute inset-1 rounded-full flex items-center justify-center bg-black p-1"
                        >
                          <Image 
                            src={stage.icon}
                            alt={stage.title}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden lg:block w-5/12"></div>
                </div>
              );
            })}
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
