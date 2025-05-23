import { Heart, Cloud, Star, Clock, Eye, Pause, Type } from 'lucide-react';
import { useState } from 'react';

function Question() {
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [animationsDisabled, setAnimationsDisabled] = useState(false);
  const [fontSize, setFontSize] = useState('normal');

  const handleYesClick = () => {
    alert('Yay! Thank you for saying yes! 💕');
  };

  const handleMaybeClick = () => {
    alert('That\'s okay! Maybe another time 😊');
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
        primary: 'from-blue-100 via-indigo-50 to-purple-100',
        cardBg: 'bg-white',
        titleColor: 'text-blue-600',
        textColor: 'text-gray-800',
        buttonPrimary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300',
        buttonSecondary: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-300',
        iconColors: {
          heart: 'text-blue-500',
          cloud: 'text-indigo-400',
          star: 'text-purple-400'
        }
      };
    }
    return {
      primary: 'from-pink-100 via-purple-50 to-indigo-100',
      cardBg: 'bg-white',
      titleColor: 'text-pink-600',
      textColor: 'text-gray-700',
      buttonPrimary: 'bg-pink-500 hover:bg-pink-600 focus:ring-pink-300',
      buttonSecondary: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300',
      iconColors: {
        heart: 'text-pink-400',
        cloud: 'text-blue-400',
        star: 'text-yellow-500'
      }
    };
  };

  const getFontSizeClasses = () => {
    switch (fontSize) {
      case 'large':
        return {
          title: 'text-4xl',
          emoji: 'text-9xl',
          subtitle: 'text-2xl',
          message: 'text-3xl',
          button: 'text-lg py-4 px-10'
        };
      case 'extra-large':
        return {
          title: 'text-5xl',
          emoji: 'text-10xl',
          subtitle: 'text-3xl',
          message: 'text-4xl',
          button: 'text-xl py-5 px-12'
        };
      default:
        return {
          title: 'text-3xl',
          emoji: 'text-8xl',
          subtitle: 'text-xl',
          message: 'text-2xl',
          button: 'text-base py-3 px-8'
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
      aria-label="Dating invitation page"
    >
      <div className="absolute inset-0 bg-pattern opacity-30" aria-hidden="true"></div>
      
      <div className="fixed top-4 right-4 z-50 flex gap-2" role="toolbar" aria-label="Accessibility controls">
        <button
          onClick={toggleColorBlindMode}
          className={`p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 ${colorBlindMode ? 'ring-2 ring-blue-500' : ''}`}
          aria-label={colorBlindMode ? 'Switch to standard colors' : 'Switch to color-blind friendly colors'}
          aria-pressed={colorBlindMode}
          title="Toggle color-blind friendly mode"
        >
          <Eye className="w-5 h-5 text-gray-700" />
        </button>
        
        <button
          onClick={toggleAnimations}
          className={`p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 ${animationsDisabled ? 'ring-2 ring-red-500' : ''}`}
          aria-label={animationsDisabled ? 'Enable animations' : 'Disable animations'}
          aria-pressed={animationsDisabled}
          title="Toggle animations"
        >
          <Pause className="w-5 h-5 text-gray-700" />
        </button>
        
        <button
          onClick={cycleFontSize}
          className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label={`Current font size: ${fontSize}. Click to change`}
          title="Change font size"
        >
          <Type className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {shouldAnimate && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
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
              {i % 4 === 3 && <div className="text-purple-400 text-2xl">💕</div>}
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
        .font-comic {
          font-family: 'Comic Neue', cursive;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-30px); }
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

        .animate-bounce-custom {
          animation: ${shouldAnimate ? 'bounce 2s infinite' : 'none'};
        }

        .animate-float {
          animation: ${shouldAnimate ? 'float 3s ease-in-out infinite' : 'none'};
        }

        .animate-float-reverse {
          animation: ${shouldAnimate ? 'floatReverse 2.5s ease-in-out infinite' : 'none'};
        }

        .card-shadow {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 
                      0 8px 10px -6px rgba(0, 0, 0, 0.1);
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
          .animate-float-reverse {
            animation: none !important;
          }
        }
      `}</style>

      {shouldAnimate && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className={`absolute ${colors.iconColors.heart} opacity-20 text-8xl top-10 left-10 animate-float`}>
            <Heart className="w-20 h-20" />
          </div>
          <div className={`absolute ${colors.iconColors.cloud} opacity-20 text-6xl top-20 right-20 animate-float-reverse`}>
            <Cloud className="w-16 h-16" />
          </div>
          <div className="absolute text-pink-500 opacity-20 text-7xl bottom-10 left-1/4 animate-float">
            <div className="text-7xl">😘</div>
          </div>
          <div className={`absolute ${colors.iconColors.star} opacity-20 text-6xl bottom-20 right-1/3 animate-float-reverse`}>
            <Star className="w-16 h-16" />
          </div>
          <div className="absolute text-purple-400 opacity-25 text-5xl top-1/2 left-10 animate-float">
            <div className="text-5xl">💖</div>
          </div>
          <div className="absolute text-pink-400 opacity-25 text-4xl top-1/3 right-10 animate-float-reverse">
            <div className="text-4xl">✨</div>
          </div>
        </div>
      )}

      <div className="container max-w-md mx-auto z-10 relative">
        <div 
          className={`${colors.cardBg} rounded-3xl card-shadow p-8 text-center transition-all duration-500 ${shouldAnimate ? 'transform hover:scale-105' : ''}`}
          role="dialog"
          aria-labelledby="invitation-title"
          aria-describedby="invitation-description"
        >
          <div className="relative mb-6">
            <h1 
              id="invitation-title"
              className={`${fontSizes.title} font-bold ${colors.titleColor} mb-2`}
            >
              Will you go out with me?
            </h1>
            <div className="absolute -top-12 -right-6 transform rotate-12 text-pink-500 opacity-50" aria-hidden="true">
              <span className="text-4xl">❤️</span>
            </div>
          </div>
          
          <div 
            className={`${fontSizes.emoji} mb-6 ${shouldAnimate ? 'animate-bounce-custom' : ''}`}
            role="img"
            aria-label="Heart eyes emoji"
          >
            😍
          </div>
          
          <p 
            className={`${fontSizes.subtitle} ${colors.textColor} mb-4`}
            id="invitation-description"
          >
            Please lets go!!!
          </p>

          <p className={`${fontSizes.message} font-bold ${colors.titleColor} mb-8`}>
            I really want to spend time with you! 
            <span role="img" aria-label="heart and pleading face emoji"> ❤️🥺</span>
          </p>

          <div 
            className="flex flex-col sm:flex-row justify-center gap-4 mt-6"
            role="group"
            aria-label="Response options"
          >
            <button 
              onClick={handleYesClick}
              className={`${colors.buttonPrimary} text-white font-bold ${fontSizes.button} rounded-full transform transition-all duration-300 ${shouldAnimate ? 'hover:scale-105 hover:-translate-y-1' : ''} focus:outline-none focus:ring-4`}
              aria-describedby="yes-description"
            >
              <Heart className="w-4 h-4 mr-2 inline" aria-hidden="true" />
              Yes!
            </button>
            <div id="yes-description" className="sr-only">
              Accept the invitation to go out
            </div>
            
            <button 
              onClick={handleMaybeClick}
              className={`${colors.buttonSecondary} text-white font-bold ${fontSizes.button} rounded-full transform transition-all duration-300 ${shouldAnimate ? 'hover:scale-105 hover:-translate-y-1' : ''} focus:outline-none focus:ring-4 mt-3 sm:mt-0`}
              aria-describedby="maybe-description"
            >
              <Clock className="w-4 h-4 mr-2 inline" aria-hidden="true" />
              Maybe later
            </button>
            <div id="maybe-description" className="sr-only">
              Politely decline for now but leave it open for the future
            </div>
          </div>
        </div>
      </div>

      <div className="sr-only" aria-live="polite" id="announcements">
        {colorBlindMode && "Color-blind friendly mode enabled"}
        {animationsDisabled && "Animations disabled for reduced motion"}
        {fontSize !== 'normal' && `Font size changed to ${fontSize}`}
      </div>
    </div>
  );
}

export default Question;