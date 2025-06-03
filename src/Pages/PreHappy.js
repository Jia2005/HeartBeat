import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PreHappy = () => {
  const navigate = useNavigate();
  const [fillLevel, setFillLevel] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const messages = [
    "Calculating our compatibility... 💕",
    "Measuring heart flutter levels... 💓",
    "Scanning for butterflies in stomach... 🦋",
    "Computing love algorithm... 💖",
    "Analyzing cute factor... 😊",
    "Processing romantic chemistry... 💘",
    "Evaluating soul connection... ✨",
    "Measuring spark intensity... ⚡"
  ];

  const finalMessages = [
    "It's a perfect match! 💖",
    "Love meter: OFF THE CHARTS! 📊💕",
    "Perfect compatibility detected! ✨",
    "Soulmate status: CONFIRMED! 💫",
    "Love level: MAXIMUM! 🚀💘"
  ];

  useEffect(() => {
    const fillInterval = setInterval(() => {
      setFillLevel(prev => {
        if (prev >= 100) {
          setIsComplete(true);
          setTimeout(() => setShowResult(true), 500);
          setTimeout(() => navigate('/happy'), 3500);
          clearInterval(fillInterval);
          return 100;
        }
        return prev + 1.5;
      });
    }, 80);

    const messageInterval = setInterval(() => {
      if (!isComplete) {
        setCurrentMessage(prev => (prev + 1) % messages.length);
      }
    }, 1500);

    return () => {
      clearInterval(fillInterval);
      clearInterval(messageInterval);
    };
  }, [isComplete, navigate]);

  return (
   <div className={`min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 via-orange-200 to-purple-200 flex flex-col items-center justify-center p-4 overflow-hidden relative transition-all duration-700 ease-in-out`}>
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 opacity-40 animate-float"
            style={{
              fontSize: `${Math.random() * 15 + 12}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 3 + 4}s`
            }}
          >
            💖
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-8 max-w-md w-full">
        <div className="text-center mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-2 animate-pulse">
            Love Meter
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Measuring the magic between hearts...
          </p>
        </div>

        <div className="relative">
          <svg 
            width="220" 
            height="200" 
            viewBox="0 0 220 200" 
            className="drop-shadow-xl transform hover:scale-105 transition-transform duration-300"
          >
            <defs>
              <path
                id="heartPath"
                d="M110,180 C110,180 30,120 30,70 C30,35 55,15 85,15 C100,15 110,25 110,45 C110,25 120,15 135,15 C165,15 190,35 190,70 C190,120 110,180 110,180 Z"
              />
              <clipPath id="heartClip">
                <use href="#heartPath" />
              </clipPath>
              
              <pattern id="waterFlow" patternUnits="userSpaceOnUse" width="40" height="40">
                <circle cx="5" cy="5" r="2" fill="rgba(255,255,255,0.3)" className="animate-ping">
                  <animate attributeName="cy" values="5;35;5" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="15" cy="15" r="1.5" fill="rgba(255,255,255,0.4)" className="animate-ping">
                  <animate attributeName="cy" values="15;25;15" dur="1.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.5)" className="animate-ping">
                  <animate attributeName="cy" values="25;35;25" dur="1.8s" repeatCount="indefinite"/>
                </circle>
                <circle cx="35" cy="10" r="1.5" fill="rgba(255,255,255,0.3)" className="animate-ping">
                  <animate attributeName="cy" values="10;30;10" dur="2.2s" repeatCount="indefinite"/>
                </circle>
              </pattern>
              
              <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff1744" stopOpacity="0.9">
                  <animate attributeName="stop-color" 
                    values="#ff1744;#e91e63;#f06292;#ff1744" 
                    dur="3s" 
                    repeatCount="indefinite"/>
                </stop>
                <stop offset="50%" stopColor="#e91e63" stopOpacity="0.8">
                  <animate attributeName="stop-color" 
                    values="#e91e63;#f06292;#ff1744;#e91e63" 
                    dur="2.5s" 
                    repeatCount="indefinite"/>
                </stop>
                <stop offset="100%" stopColor="#f06292" stopOpacity="0.7">
                  <animate attributeName="stop-color" 
                    values="#f06292;#ff1744;#e91e63;#f06292" 
                    dur="2s" 
                    repeatCount="indefinite"/>
                </stop>
              </linearGradient>
              
              <path id="wave" d="M0,10 Q10,0 20,10 T40,10" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none">
                <animateTransform 
                  attributeName="transform" 
                  type="translate" 
                  values="0,0;20,0;0,0" 
                  dur="2s" 
                  repeatCount="indefinite"/>
              </path>
            </defs>
            
            <use 
              href="#heartPath" 
              fill="none" 
              stroke="#ec4899" 
              strokeWidth="5" 
              className="animate-pulse"
            />
            
            <rect
              x="0"
              y={200 - (fillLevel * 1.7)}
              width="220"
              height={fillLevel * 1.7}
              fill="url(#liquidGradient)"
              clipPath="url(#heartClip)"
              className="transition-all duration-200 ease-out"
            />
            
            <rect
              x="0"
              y={200 - (fillLevel * 1.7)}
              width="220"
              height={fillLevel * 1.7}
              fill="url(#waterFlow)"
              clipPath="url(#heartClip)"
              opacity="0.6"
            />
            
            {fillLevel > 10 && (
              <g clipPath="url(#heartClip)">
                <use 
                  href="#wave" 
                  x="30" 
                  y={200 - (fillLevel * 1.7)}
                  opacity="0.8"
                />
                <use 
                  href="#wave" 
                  x="60" 
                  y={200 - (fillLevel * 1.7) + 2}
                  opacity="0.6"
                />
                <use 
                  href="#wave" 
                  x="90" 
                  y={200 - (fillLevel * 1.7) - 1}
                  opacity="0.7"
                />
              </g>
            )}
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-xl sm:text-2xl drop-shadow-lg">
              {Math.round(fillLevel)}%
            </span>
          </div>

          {isComplete && (
            <div className="absolute -inset-8">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-yellow-300 text-xl animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center min-h-[60px] flex items-center justify-center">
          {!showResult ? (
            <p className="text-lg sm:text-xl font-medium text-gray-700 animate-fade-in px-4">
              {messages[currentMessage]}
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-xl sm:text-2xl font-bold text-pink-600 animate-bounce px-4">
                {finalMessages[Math.floor(Math.random() * finalMessages.length)]}
              </p>
              <div className="flex justify-center space-x-2 text-2xl">
                <span className="animate-pulse">💖</span>
                <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>💕</span>
                <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>💘</span>
              </div>
            </div>
          )}
        </div>

        <div className="w-full max-w-xs">
          <div className="bg-pink-200 rounded-full h-3 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-pink-400 to-red-400 h-full rounded-full transition-all duration-200 ease-out shadow-sm"
              style={{ width: `${fillLevel}%` }}
            ></div>
          </div>
        </div>

        {!isComplete && (
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
          }
          25% { 
            transform: translateY(-10px) translateX(5px) rotate(2deg); 
          }
          50% { 
            transform: translateY(-5px) translateX(-3px) rotate(-1deg); 
          }
          75% { 
            transform: translateY(-12px) translateX(2px) rotate(1deg); 
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PreHappy;