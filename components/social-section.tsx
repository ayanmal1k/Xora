'use client';

import Image from 'next/image';
import { Mail } from 'lucide-react';

export function SocialSection() {
  const socialLinks = [
    {
      name: 'X (Twitter)',
      description: 'Follow us for the latest updates, announcements, and community discussions.',
      icon: '/Images/X.png',
      link: 'https://x.com',
      bgGradient: 'from-gray-900 to-black',
      hoverColor: '#d4af37',
    },
    {
      name: 'Telegram',
      description: 'Join our community on Telegram for real-time conversations and support.',
      icon: '/Images/telegram.png',
      link: 'https://t.me/MintoraXora',
      bgGradient: 'from-gray-900 to-black',
      hoverColor: '#d4af37',
    },
  ];

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
            Join Our Community
          </h2>
          <p 
            className="text-base sm:text-lg text-white opacity-75 mt-4"
            style={{
              fontFamily: "'Georgia', 'Garamond', serif",
            }}
          >
            Connect with us on social media for the latest news and updates
          </p>
        </div>

        {/* Support CTA */}
        <div className="mb-12 text-center">
          <h3
            className="text-3xl sm:text-4xl font-bold tracking-wider mb-4"
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
            Reach XORA Support
          </h3>

          <a
            href="mailto:support@xora.capital"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'Sweet Gothic Serif', serif",
              backgroundColor: 'transparent',
              border: '2px solid #d4af37',
              color: '#d4af37',
              letterSpacing: '0.05em',
            }}
            onMouseEnter={(e) => {
              const element = e.currentTarget as HTMLElement;
              element.style.backgroundColor = '#d4af37';
              element.style.color = '#000000';
              element.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.6)';
            }}
            onMouseLeave={(e) => {
              const element = e.currentTarget as HTMLElement;
              element.style.backgroundColor = 'transparent';
              element.style.color = '#d4af37';
              element.style.boxShadow = 'none';
            }}
          >
            <Mail size={18} />
            Email Us
          </a>

          <p
            className="text-sm sm:text-base text-white opacity-85 mt-3"
            style={{
              fontFamily: "'Georgia', 'Garamond', serif",
            }}
          >
            support@xora.capital
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div
                className={`relative bg-gradient-to-br ${social.bgGradient} border border-yellow-600 rounded-lg overflow-hidden transition-all duration-300 h-full flex flex-col`}
                style={{
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  const element = e.currentTarget as HTMLElement;
                  element.style.boxShadow = '0 0 40px rgba(212, 175, 55, 0.5), inset 0 0 20px rgba(212, 175, 55, 0.1)';
                  element.style.transform = 'translateY(-10px)';
                }}
                onMouseLeave={(e) => {
                  const element = e.currentTarget as HTMLElement;
                  element.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.2)';
                  element.style.transform = 'translateY(0)';
                }}
              >
                {/* Shine overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)',
                  }}
                ></div>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                  }}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 sm:p-10 flex flex-col h-full">
                  {/* Icon Container */}
                  <div className="mb-6 flex justify-center">
                    <div
                      className="relative"
                      style={{
                        width: '100px',
                        height: '100px',
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                          boxShadow: '0 0 30px rgba(212, 175, 55, 0.6)',
                        }}
                      >
                        <div 
                          className="absolute inset-1 rounded-full flex items-center justify-center bg-black p-3"
                        >
                          <Image 
                            src={social.icon}
                            alt={social.name}
                            width={80}
                            height={80}
                            className="object-contain group-hover:brightness-150 transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="text-center flex-grow flex flex-col justify-between">
                    <div>
                      <h3 
                        className="text-2xl sm:text-3xl font-bold mb-4 transition-all duration-300"
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
                        {social.name}
                      </h3>

                      <p 
                        className="text-sm sm:text-base leading-relaxed text-white opacity-90 mx-auto max-w-md px-2"
                        style={{
                          fontFamily: "'Georgia', 'Garamond', serif",
                        }}
                      >
                        {social.description}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-8 pt-6 border-t border-gray-700">
                      <div
                        className="inline-block px-8 py-3 rounded-lg font-bold transition-all duration-300 group-hover:scale-105"
                        style={{
                          fontFamily: "'Sweet Gothic Serif', serif",
                          backgroundColor: 'transparent',
                          border: '2px solid #d4af37',
                          color: '#d4af37',
                          letterSpacing: '0.05em',
                        }}
                        onMouseEnter={(e) => {
                          const element = e.currentTarget as HTMLElement;
                          element.style.backgroundColor = '#d4af37';
                          element.style.color = '#000000';
                          element.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                          const element = e.currentTarget as HTMLElement;
                          element.style.backgroundColor = 'transparent';
                          element.style.color = '#d4af37';
                          element.style.boxShadow = 'none';
                        }}
                      >
                        Follow Us
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Stats */}
        {/* <div className="mt-16 pt-12 border-t border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <h4 
                className="text-3xl sm:text-4xl font-bold mb-2"
                style={{
                  fontFamily: "'Sweet Gothic Serif', serif",
                  background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                100K+
              </h4>
              <p className="text-sm text-gray-400" style={{ fontFamily: "'Georgia', 'Garamond', serif" }}>
                Community Members
              </p>
            </div>
            <div className="text-center">
              <h4 
                className="text-3xl sm:text-4xl font-bold mb-2"
                style={{
                  fontFamily: "'Sweet Gothic Serif', serif",
                  background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                50K+
              </h4>
              <p className="text-sm text-gray-400" style={{ fontFamily: "'Georgia', 'Garamond', serif" }}>
                Telegram Members
              </p>
            </div>
            <div className="text-center">
              <h4 
                className="text-3xl sm:text-4xl font-bold mb-2"
                style={{
                  fontFamily: "'Sweet Gothic Serif', serif",
                  background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                24/7
              </h4>
              <p className="text-sm text-gray-400" style={{ fontFamily: "'Georgia', 'Garamond', serif" }}>
                Active Support
              </p>
            </div>
            <div className="text-center">
              <h4 
                className="text-3xl sm:text-4xl font-bold mb-2"
                style={{
                  fontFamily: "'Sweet Gothic Serif', serif",
                  background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                150+
              </h4>
              <p className="text-sm text-gray-400" style={{ fontFamily: "'Georgia', 'Garamond', serif" }}>
                Countries
              </p>
            </div>
          </div>
        </div> */}
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
