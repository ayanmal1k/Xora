'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTokenData, calculatePercentageSold } from '@/lib/firestore-service';

const PRESALE_START = new Date('2026-03-10T00:00:00Z');
const PRESALE_END = new Date('2026-05-10T23:59:59Z');

export function PresaleSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [soldPercentage, setSoldPercentage] = useState(45);
  const [soldTokens, setSoldTokens] = useState(252000000);
  const [presaleSupply, setPresaleSupply] = useState(560000000);
  const [loading, setLoading] = useState(true);
  const [presaleStatus, setPresaleStatus] = useState<'notStarted' | 'active' | 'ended'>('notStarted');

  // Fetch token data from Firestore
  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const data = await getTokenData();
        if (data) {
          setPresaleSupply(data.totalToken);
          setSoldTokens(data.soldToken);
          setSoldPercentage(calculatePercentageSold(data));
        }
      } catch (error) {
        console.error('Error fetching token data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenData();
  }, []);

  // Countdown timer code
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();

      if (now < PRESALE_START) {
        setPresaleStatus('notStarted');
        const difference = PRESALE_START.getTime() - now.getTime();
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else if (now <= PRESALE_END) {
        setPresaleStatus('active');
        const difference = PRESALE_END.getTime() - now.getTime();
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setPresaleStatus('ended');
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      {/* Section Container */}
      <div className="max-w-5xl mx-auto">
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
            Presale
          </h2>
          <p 
            className="text-base sm:text-lg text-white opacity-75 mt-4"
            style={{
              fontFamily: "'Georgia', 'Garamond', serif",
            }}
          >
            {presaleStatus === 'ended'
              ? 'The XORA presale has officially ended. Thank you to all participants.'
              : presaleStatus === 'notStarted'
              ? 'The presale opens on March 10, 2026. Get ready to secure your XORA tokens!'
              : 'Limited time offer - Join early supporters of XORA'}
          </p>
        </div>

        {/* Main Presale Card */}
        <div
          className="relative group bg-gradient-to-br from-gray-900 to-black border border-yellow-600 rounded-xl p-8 sm:p-12 overflow-hidden transition-all duration-300 group-hover:shadow-2xl"
          style={{
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 60px rgba(212, 175, 55, 0.6), inset 0 0 30px rgba(212, 175, 55, 0.1)';
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.3)';
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

          <div className="relative z-10 space-y-8">
            {/* Countdown Timer */}
            <div className="bg-black/40 rounded-lg p-6 sm:p-8 border border-yellow-600/30">
              <p 
                className="text-center text-sm sm:text-base text-gray-400 uppercase tracking-widest mb-6"
                style={{
                  fontFamily: "'Sweet Gothic Serif', serif",
                }}
              >
                {presaleStatus === 'notStarted' ? 'Presale Starts In' : presaleStatus === 'ended' ? 'Presale Has Ended' : 'Presale Ends In'}
              </p>

              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {/* Days */}
                <div className="text-center">
                  <div
                    className="text-3xl sm:text-4xl font-bold mb-2"
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
                    {timeLeft.days.toString().padStart(2, '0')}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">Days</p>
                </div>

                {/* Hours */}
                <div className="text-center">
                  <div
                    className="text-3xl sm:text-4xl font-bold mb-2"
                    style={{
                      fontFamily: "'Sweet Gothic Serif', serif",
                      background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      animation: 'shimmer 3s ease-in-out infinite 0.25s',
                    }}
                  >
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">Hours</p>
                </div>

                {/* Minutes */}
                <div className="text-center">
                  <div
                    className="text-3xl sm:text-4xl font-bold mb-2"
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
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">Minutes</p>
                </div>

                {/* Seconds */}
                <div className="text-center">
                  <div
                    className="text-3xl sm:text-4xl font-bold mb-2"
                    style={{
                      fontFamily: "'Sweet Gothic Serif', serif",
                      background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      animation: 'shimmer 3s ease-in-out infinite 0.75s',
                    }}
                  >
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">Seconds</p>
                </div>
              </div>
            </div>

            {/* Price and Supply Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div className="bg-black/40 rounded-lg p-6 border border-yellow-600/30">
                <p 
                  className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest mb-2"
                  style={{
                    fontFamily: "'Sweet Gothic Serif', serif",
                  }}
                >
                  Presale Price
                </p>
                <h3 
                  className="text-2xl sm:text-3xl font-bold"
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
                  $0.005 / 1 XORA
                </h3>
              </div>

              {/* Supply */}
              <div className="bg-black/40 rounded-lg p-6 border border-yellow-600/30">
                <p 
                  className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest mb-2"
                  style={{
                    fontFamily: "'Sweet Gothic Serif', serif",
                  }}
                >
                  Total Presale Allocation
                </p>
                <h3 className="text-1xl sm:text-2xl font-bold"
                  style={ {fontFamily: "'Sweet Gothic Serif', serif",
                  background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 3s ease-in-out infinite',}}
                >
                  {loading ? 'Loading...' : `${(presaleSupply / 1000000).toFixed(0)}M Tokens`}
                </h3>
                <p className="text-xs text-gray-500 mt-1">(20% of Total Supply)</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-black/40 rounded-lg p-6 border border-yellow-600/30 space-y-4">
              <div className="flex items-center justify-between">
                <p 
                  className="text-sm text-gray-400 uppercase tracking-widest"
                  style={{
                    fontFamily: "'Sweet Gothic Serif', serif",
                  }}
                >
                  Tokens Sold
                </p>
                <p 
                  className="text-lg font-bold"
                  style={{
                    fontFamily: "'Sweet Gothic Serif', serif",
                    background: 'linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {soldPercentage}%
                </p>
              </div>

              {/* Progress Bar Container */}
              <div className="relative h-4 bg-black rounded-full overflow-hidden border border-yellow-600/30">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${soldPercentage}%`,
                    background: 'linear-gradient(90deg, #d4af37 0%, #f0e68c 50%, #d4af37 100%)',
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)',
                  }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{soldTokens.toLocaleString()} sold</span>
                <span>{presaleSupply.toLocaleString()} tokens</span>
              </div>
            </div>

            {/* Call to Action Button */}
            {presaleStatus === 'active' && (
              <Link href="/presale" className="block">
                <button
                  className="w-full px-8 py-4 sm:py-5 text-base sm:text-lg font-bold rounded-lg transition-all duration-300 hover:scale-105"
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
                >
                  Join Presale Now
                </button>
              </Link>
            )}
            {presaleStatus === 'notStarted' && (
              <div
                className="w-full px-8 py-4 sm:py-5 text-base sm:text-lg font-bold rounded-lg text-center"
                style={{
                  fontFamily: "'Sweet Gothic Serif', serif",
                  background: 'rgba(212,175,55,0.07)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  color: 'rgba(212,175,55,0.65)',
                  letterSpacing: '0.05em',
                }}
              >
                Presale Opens March 10, 2026
              </div>
            )}
            {presaleStatus === 'ended' && (
              <div
                className="w-full px-8 py-4 sm:py-5 text-base sm:text-lg font-bold rounded-lg text-center"
                style={{
                  fontFamily: "'Sweet Gothic Serif', serif",
                  background: 'rgba(180,60,60,0.08)',
                  border: '1px solid rgba(180,60,60,0.3)',
                  color: 'rgba(255,120,120,0.9)',
                  letterSpacing: '0.05em',
                }}
              >
                Presale Has Ended
              </div>
            )}
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
