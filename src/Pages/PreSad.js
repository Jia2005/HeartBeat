import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PreSad = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showDramaticEffect, setShowDramaticEffect] = useState(false);
  const [heartBroken, setHeartBroken] = useState(false);
  const [showShatteredMessage, setShowShatteredMessage] = useState(false);
  const navigate = useNavigate();

  const sassyMessages = [
    "So rude of you! 😤",
    "How could you?! 😔", 
    "My heart is breaking... 💔",
    "Really? REALLY?! 🙄",
    "That's not very nice... 😢",
    "I can't believe this... 😭",
    "You've hurt my feelings! 💔",
    "This is so unfair! 😤",
    "Why would you do this?! 😰",
    "I'm so disappointed... 😞"
  ];

  const floatingTears = [...Array(20)].map((_, i) => ({
    id: i,
    size: Math.random() * 10 + 8,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 6,
    duration: Math.random() * 4 + 3
  }));

  const staticClouds = [...Array(8)].map((_, i) => ({
    id: i,
    size: Math.random() * 20 + 25,
    left: Math.random() * 100,
    top: Math.random() * 30 + 10 
  }));

  useEffect(() => {
    const messageInterval = setInterval(() => {
      if (!showShatteredMessage) {
        setCurrentMessage(prev => (prev + 1) % sassyMessages.length);
      }
    }, 1800);

    setTimeout(() => setShowDramaticEffect(true), 1000);
    setTimeout(() => {
      setHeartBroken(true);
      clearInterval(messageInterval);
    }, 5000);

    setTimeout(() => {
      setShowShatteredMessage(true);
    }, 5000);

    setTimeout(() => {
      navigate('/sad');
    }, 7000);

    return () => {
      clearInterval(messageInterval);
    };
  }, [navigate, sassyMessages.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 via-blue-900 to-black flex flex-col items-center justify-center p-4 overflow-hidden relative transition-all duration-1000">
      <div className="absolute inset-0 pointer-events-none">
        {floatingTears.map((tear) => (
          <div
            key={tear.id}
            className="absolute text-blue-200 opacity-60 animate-fall"
            style={{
              fontSize: `${tear.size}px`,
              left: `${tear.left}%`,
              top: `${tear.top}%`,
              animationDelay: `${tear.delay}s`,
              animationDuration: `${tear.duration}s`
            }}
          >
            💧
          </div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {staticClouds.map((cloud) => (
          <div
            key={cloud.id}
            className="absolute text-gray-600 opacity-40"
            style={{
              fontSize: `${cloud.size}px`,
              left: `${cloud.left}%`,
              top: `${cloud.top}%`
            }}
          >
            ☁️
          </div>
        ))}
      </div>

      {showDramaticEffect && (
        <div className="absolute inset-0 bg-white opacity-10 animate-lightning pointer-events-none"></div>
      )}
      <div className="relative z-10 flex flex-col items-center space-y-8 max-w-md w-full">
        <div className="text-center mb-4">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent mb-2 animate-dramatic-pulse">
            SO RUDE!
          </h1>
          <p className="text-gray-300 text-sm sm:text-base opacity-80">
            Calculating the audacity... 😤
          </p>
        </div>

        <div className="relative">
          <svg 
            width="220" 
            height="200" 
            viewBox="0 0 220 200" 
            className="drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
          >
            <defs>
              <linearGradient id="heartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
            </defs>
            
            {!heartBroken ? (
              <path
                d="M110,180 C110,180 30,120 30,70 C30,35 55,15 85,15 C100,15 110,25 110,45 C110,25 120,15 135,15 C165,15 190,35 190,70 C190,120 110,180 110,180 Z"
                fill="url(#heartGradient)"
                stroke="#7c3aed"
                strokeWidth="3"
                className="animate-pulse"
              />
            ) : (
              <g>
                <path
                  d="M110,180 C110,180 30,120 30,70 C30,35 55,15 85,15 C100,15 110,25 110,45 L110,180 Z"
                  fill="url(#heartGradient)"
                  stroke="#7c3aed"
                  strokeWidth="3"
                  className="animate-heart-break-left"
                />
                <path
                  d="M110,45 C110,25 120,15 135,15 C165,15 190,35 190,70 C190,120 110,180 110,180 L110,45 Z"
                  fill="url(#heartGradient)"
                  stroke="#7c3aed"
                  strokeWidth="3"
                  className="animate-heart-break-right"
                />
              </g>
            )}
          </svg>

          {heartBroken && (
            <div className="absolute -inset-8">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-red-400 text-lg animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                >
                  💥
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center min-h-[80px] flex items-center justify-center">
          {!showShatteredMessage ? (
            <p className="text-lg sm:text-xl font-medium text-gray-200 animate-sassy-fade px-4">
              {sassyMessages[currentMessage]}
            </p>
          ) : (
            <div className="space-y-3">
              <p className="text-xl sm:text-2xl font-bold text-red-400 animate-dramatic-shake px-4">
                My heart is SHATTERED! 💔💔💔
              </p>
              <div className="flex justify-center space-x-3 text-2xl">
                <span className="animate-bounce">💔</span>
                <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>😭</span>
                <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>⚡</span>
              </div>
            </div>
          )}
        </div>

        {!showShatteredMessage && (
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.3}s` }}
              ></div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes sassy-fade {
          0% { opacity: 0; transform: translateY(15px) scale(0.9); }
          50% { opacity: 1; transform: translateY(-5px) scale(1.05); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dramatic-shake {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(-10px) rotate(-1deg); }
          20% { transform: translateX(10px) rotate(1deg); }
          30% { transform: translateX(-8px) rotate(-1deg); }
          40% { transform: translateX(8px) rotate(1deg); }
          50% { transform: translateX(-6px) rotate(0deg); }
          60% { transform: translateX(6px) rotate(0deg); }
          70% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
          90% { transform: translateX(-2px); }
        }
        @keyframes dramatic-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes fall {
          0% { 
            transform: translateY(-100vh) translateX(0px) rotate(0deg); 
            opacity: 0.8;
          }
          50% {
            opacity: 0.6;
            transform: translateY(50vh) translateX(20px) rotate(180deg);
          }
          100% { 
            transform: translateY(100vh) translateX(-10px) rotate(360deg); 
            opacity: 0;
          }
        }
        @keyframes lightning {
          0%, 90%, 100% { opacity: 0; }
          5% { opacity: 0.3; }
          10% { opacity: 0; }
          15% { opacity: 0.4; }
          20% { opacity: 0; }
        }
        @keyframes heart-break-left {
          0% { transform: translateX(0) rotate(0deg); }
          100% { transform: translateX(-30px) rotate(-15deg); }
        }
        @keyframes heart-break-right {
          0% { transform: translateX(0) rotate(0deg); }
          100% { transform: translateX(30px) rotate(15deg); }
        }
        .animate-sassy-fade {
          animation: sassy-fade 0.8s ease-out;
        }
        .animate-dramatic-shake {
          animation: dramatic-shake 1s ease-in-out infinite;
        }
        .animate-dramatic-pulse {
          animation: dramatic-pulse 2s ease-in-out infinite;
        }
        .animate-fall {
          animation: fall linear infinite;
        }
        .animate-lightning {
          animation: lightning 4s ease-in-out infinite;
        }
        .animate-heart-break-left {
          animation: heart-break-left 1s ease-out forwards;
        }
        .animate-heart-break-right {
          animation: heart-break-right 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PreSad;