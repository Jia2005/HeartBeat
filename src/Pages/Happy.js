import { Heart, Cloud, Star, Eye, Pause, Type, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { parsePath, useNavigate } from 'react-router-dom';

function Happy() {
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [animationsDisabled, setAnimationsDisabled] = useState(false);
  const [fontSize, setFontSize] = useState('normal'); 
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [flyingHearts, setFlyingHearts] = useState([]);
  const [animationKey, setAnimationKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!animationsDisabled) {
      createFlyingHearts(50);
    }
  }, [animationsDisabled, animationKey]);

  const createFlyingHearts = (count) => {
    const hearts = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 3000,
      duration: 3000 + Math.random() * 2000,
      size: 16 + Math.random() * 16
    }));
    setFlyingHearts(hearts);
    
    setTimeout(() => {
      setFlyingHearts([]);
    }, 6000);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const formatSelectedDateTime = () => {
    if (!selectedDate && !selectedTime) return '';
    
    let result = '';
    if (selectedDate) {
      const date = new Date(selectedDate);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const formattedDate = date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
      });
      result += `${dayName}, ${formattedDate}`;
    }
    
    if (selectedTime) {
      const [hours, minutes] = selectedTime.split(':');
      const time = new Date();
      time.setHours(parseInt(hours), parseInt(minutes));
      const formattedTime = time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      result += selectedDate ? ` at ${formattedTime}` : formattedTime;
    }
    
    return result;
  };

  const handleRestart = () => {
    navigate("/");
  };

  const toggleColorBlindMode = () => {
    setColorBlindMode(!colorBlindMode);
  };

  const toggleAnimations = () => {
    setAnimationsDisabled(!animationsDisabled);
  };

  const cycleFontSize = () => {
    const sizes = ['normal', 'large', 'extra-large'];
    const currentIndex = sizes.indexOf(fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setFontSize(sizes[nextIndex]);
  };

  const getColorScheme = () => {
    if (colorBlindMode) {
      return {
        primary: 'from-gray-100 via-blue-50 to-orange-50',
        cardBg: 'bg-white border-4 border-blue-600',
        titleColor: 'text-blue-800',
        textColor: 'text-gray-900',
        buttonPrimary: 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 border-4 border-blue-900',
        buttonSecondary: 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 border-4 border-orange-800',
        dayButton: 'bg-blue-100 hover:bg-blue-200 text-blue-800 border-2 border-blue-400',
        dayButtonSelected: 'bg-blue-700 text-white border-4 border-blue-900',
        iconColors: {
          heart: 'text-blue-700',
          cloud: 'text-gray-600',
          star: 'text-orange-600'
        },
        accentBorder: 'border-blue-600'
      };
    }
    return {
      primary: 'from-pink-100 via-purple-50 to-indigo-100',
      cardBg: 'bg-white border-4 border-pink-400',
      titleColor: 'text-pink-600',
      textColor: 'text-gray-700',
      buttonPrimary: 'bg-pink-500 hover:bg-pink-600 focus:ring-pink-300',
      buttonSecondary: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300',
      dayButton: 'bg-pink-100 hover:bg-pink-200 text-pink-800',
      dayButtonSelected: 'bg-pink-600 text-white',
      iconColors: {
        heart: 'text-pink-400',
        cloud: 'text-blue-400',
        star: 'text-yellow-500'
      },
      accentBorder: 'border-pink-300'
    };
  };

  const getFontSizeClasses = () => {
    switch (fontSize) {
      case 'large':
        return {
          title: 'text-4xl',
          emoji: 'text-6xl',
          subtitle: 'text-xl',
          message: 'text-2xl',
          button: 'text-lg py-4 px-10',
          containerWidth: 'max-w-3xl',
          label: 'text-md',
          textWrap: 'whitespace-nowrap'
        };
      case 'extra-large':
        return {
          title: 'text-4xl',
          emoji: 'text-6xl',
          subtitle: 'text-2xl',
          message: 'text-3xl',
          label: 'text-semibold',
          button: 'text-xl py-5 px-12',
          containerWidth: 'max-w-5xl',
          textWrap: 'whitespace-nowrap'
        };
      default:
        return {
          title: 'text-2xl',
          emoji: 'text-6xl',
          subtitle: 'text-xl',
          message: 'text-2xl',
          label: 'text-sm',
          button: 'text-base py-3 px-8',
          containerWidth: 'max-w-md',
          textWrap: ''
        };
    }
  };

  const colors = getColorScheme();
  const fontSizes = getFontSizeClasses();
  const shouldAnimate = !animationsDisabled;

  return (
    <div 
      className={`min-h-screen flex items-center justify-center p-4 bg-gradient-to-br ${colors.primary} font-comic relative overflow-hidden`}
      role="main"
      aria-label="Date accepted celebration page"
    >
      <div className="absolute inset-0 bg-pattern opacity-30" aria-hidden="true"></div>
      
      <div className="fixed top-4 right-4 z-50 flex gap-4" role="toolbar" aria-label="Accessibility controls">
        <button
          onClick={toggleColorBlindMode}
          className={`p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 ${colorBlindMode ? 'ring-4 ring-blue-600 bg-blue-50' : ''}`}
          aria-label={colorBlindMode ? 'Switch to standard colors' : 'Switch to color-blind friendly colors'}
          aria-pressed={colorBlindMode}
          title="Toggle color-blind friendly mode"
        >
          <Eye className={`w-5 h-5 ${colorBlindMode ? 'text-blue-700' : 'text-gray-700'}`} />
        </button>
        
        <button
          onClick={toggleAnimations}
          className={`p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 ${animationsDisabled ? 'ring-4 ring-red-600 bg-red-50' : ''}`}
          aria-label={animationsDisabled ? 'Enable animations' : 'Disable animations'}
          aria-pressed={animationsDisabled}
          title="Toggle animations"
        >
          <Pause className={`w-5 h-5 ${animationsDisabled ? 'text-red-700' : 'text-gray-700'}`} />
        </button>
        
        <button
          onClick={cycleFontSize}
          className={`p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 ${fontSize !== 'normal' ? 'ring-4 ring-green-600 bg-green-50' : ''} relative`}
          aria-label={`Current font size: ${fontSize}. Click to change`}
          title="Change font size"
        >
          <div className="flex flex-col items-center">
            <Type className={`w-4 h-4 ${fontSize !== 'normal' ? 'text-green-700' : 'text-gray-700'} mb-1`} />
            <span className={`text-xs font-bold ${fontSize !== 'normal' ? 'text-green-700' : 'text-gray-700'}`}>
              {fontSize === 'normal' ? 'N' : fontSize === 'large' ? 'L' : 'XL'}
            </span>
          </div>
        </button>
      </div>

      {shouldAnimate && flyingHearts.length > 0 && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-20" aria-hidden="true">
          {flyingHearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute animate-fly-up"
              style={{
                left: `${heart.left}%`,
                bottom: '-50px',
                animationDelay: `${heart.delay}ms`,
                animationDuration: `${heart.duration}ms`,
                fontSize: `${heart.size}px`
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}

      {shouldAnimate && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" key={animationKey}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`${animationKey}-${i}`}
              className={`absolute animate-float ${i % 2 === 0 ? 'animate-float-reverse' : ''}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.3 + 0.1
              }}
            >
              {i % 4 === 0 && <Heart className={`${colors.iconColors.heart} w-6 h-6`} />}
              {i % 4 === 1 && <Cloud className={`${colors.iconColors.cloud} w-8 h-8`} />}
              {i % 4 === 2 && <Star className={`${colors.iconColors.star} w-5 h-5`} />}
              {i % 4 === 3 && <div className={`${colorBlindMode ? 'text-blue-600' : 'text-purple-400'} text-2xl`}>💕</div>}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
        .font-comic {
          font-family: 'Comic Neue', cursive;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-20px); }
          60% { transform: translateY(-15px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes floatReverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }

        @keyframes flyUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-bounce-custom {
          animation: ${shouldAnimate ? 'bounce 2s infinite' : 'none'};
        }

        .animate-float {
          animation: ${shouldAnimate ? 'float 3s ease-in-out infinite' : 'none'};
        }

        .animate-float-reverse {
          animation: ${shouldAnimate ? 'floatReverse 2.5s ease-in-out infinite' : 'none'};
        }

        .animate-fly-up {
          animation: flyUp linear forwards;
        }

        .card-shadow {
          box-shadow: 0 10px 25px -5px rgba(255, 107, 157, 0.3), 
                      0 8px 10px -6px rgba(255, 107, 157, 0.2);
        }

        .bg-pattern {
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.05) 0%, transparent 50%);
        }

        button:focus-visible {
          outline: 3px solid #3B82F6;
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-bounce-custom,
          .animate-float,
          .animate-float-reverse,
          .animate-fly-up {
            animation: none !important;
          }
        }
      `}</style>

      <div className={`container ${fontSizes.containerWidth} mx-auto z-10 relative transition-all duration-500 px-4`}>
        <div 
          className={`${colors.cardBg} rounded-3xl card-shadow py-4 md:p-6 text-center transition-all duration-500 ${colorBlindMode ? 'shadow-2xl' : ''} relative`}
          role="dialog"
          aria-labelledby="celebration-title"
          aria-describedby="celebration-description"
        >
          <div className={`absolute -top-2 -right-2 transform rotate-12 ${colorBlindMode ? 'text-blue-600' : 'text-pink-500'}`} aria-hidden="true">
            <span className="text-2xl">❤️</span>
          </div>
          
          <div 
            className={`${fontSizes.emoji} mb-2 ${shouldAnimate ? 'animate-bounce-custom' : ''} ${colorBlindMode ? 'bg-blue-100 rounded-full p-4 inline-block mx-auto' : ''}`}
            role="img"
            aria-label="Happy face emoji"
          >
            😄
          </div>
          
          <h1 
            id="celebration-title"
            className={`${fontSizes.title} font-bold ${colors.titleColor} mb-3 ${colorBlindMode ? 'underline decoration-4 decoration-blue-600' : ''} ${fontSizes.textWrap}`}
          >
            YAYAYAYYYYYY!
          </h1>
          
          <p 
            className={`${fontSizes.subtitle} ${colors.textColor} mb-2 ${colorBlindMode ? 'font-bold border-l-4 border-blue-600 pl-4 mx-auto max-w-xs' : ''} ${fontSizes.textWrap}`}
            id="celebration-description"
          >
            Looking forward to our date!
          </p>

          <div className="mt-4 flex flex-col items-center">
            <p className={`${fontSizes.message} ${colors.titleColor} font-bold mb-2 ${colorBlindMode ? 'bg-blue-100 p-2 rounded-lg border-2 border-blue-600' : ''}`}>
              Let me know when you're free:
            </p>
            
            <div className="flex flex-col gap-4 items-center justify-center w-full max-w-sm">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="date-input" className={`${fontSizes.label} font-semibold ${colors.titleColor}`}>
                  📅 Pick a date:
                </label>
                <input
                  id="date-input"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className={`${fontSizes.button} rounded-lg border-2 ${colorBlindMode ? 'border-blue-400 focus:border-blue-600' : 'border-pink-300 focus:border-pink-500'} focus:outline-none focus:ring-2 focus:ring-pink-300 px-3 py-2 ${colorBlindMode ? 'bg-blue-50' : 'bg-pink-50'} w-full`}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="time-input" className={`${fontSizes.label} font-semibold ${colors.titleColor} `}>
                  🕐 Pick a time:
                </label>
                <input
                  id="time-input"
                  type="time"
                  value={selectedTime}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className={`${fontSizes.button} rounded-lg border-2 ${colorBlindMode ? 'border-blue-400 focus:border-blue-600' : 'border-pink-300 focus:border-pink-500'} focus:outline-none focus:ring-2 focus:ring-pink-300 px-3 py-2 ${colorBlindMode ? 'bg-blue-50' : 'bg-pink-50'} w-full`}
                />
              </div>
            </div>
            
            {(selectedDate || selectedTime) && (
              <div className={`text-center mb-4 mt-4 w-full max-w-m ${colorBlindMode ? 'bg-green-100 p-3 rounded-lg border-2 border-green-600' : 'bg-teal-100 p-3 rounded-lg border-2 border-teal-600'}`}>
                <p className={`${fontSizes.message} ${colors.titleColor} font-semibold`}>
                  You selected: <span className="font-bold">
                    {formatSelectedDateTime()}
                  </span>
                </p>
                <p className={`${colors.textColor} mt-1 font-bold`}>
                  I'll text you the details! 💕
                </p>
              </div>
            )}
            
            <button 
              onClick={handleRestart}
              className={`mt-2 ${colors.textColor} hover:${colors.titleColor} transition-colors duration-200 flex items-center gap-2 font-bold text-xl focus:outline-none focus:ring-2 focus:ring-pink-300 rounded px-2 py-1`}
              aria-label="Start over and go back to the question"
            >
              <RotateCcw className="w-6 h-6" />
              Start Over
            </button>
          </div>
        </div>
      </div>

      <div className="sr-only" aria-live="polite" id="announcements">
        {colorBlindMode && "Color-blind friendly mode enabled with high contrast colors and visual indicators"}
        {animationsDisabled && "Animations disabled for reduced motion"}
        {fontSize !== 'normal' && `Font size changed to ${fontSize}`}
        {flyingHearts.length > 0 && "Hearts flying animation playing"}
        {(selectedDate || selectedTime) && `You selected ${formatSelectedDateTime()} for your date`}
      </div>
    </div>
  );
}

export default Happy;