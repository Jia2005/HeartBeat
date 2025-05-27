import React, { useState, useEffect } from 'react';
import { Heart, Eye, Pause, Type, RotateCcw } from 'lucide-react';

function AreYouSure() {
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [animationsDisabled, setAnimationsDisabled] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [slideAwayTriggered, setSlideAwayTriggered] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [hammerTime, setHammerTime] = useState(false);
  const [babyVisible, setBabyVisible] = useState(false);
  const [babyPosition, setBabyPosition] = useState({ left: -150, bottom: 20 });
  const [showReplacement, setShowReplacement] = useState(false);
  const [buttonBroken, setButtonBroken] = useState(false);
  const [runawayPosition, setRunawayPosition] = useState({ left: '50%', top: '0', transform: 'translateX(-50%)' });
  const [decorativeElements, setDecorativeElements] = useState({ hearts: [], sparkles: [], butterflies: [] });

  useEffect(() => {
    if (!animationsDisabled) {
      initDecorations();
    }
  }, [animationsDisabled]);

  const initDecorations = () => {
    const hearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 20 + 10,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 20
    }));

    const sparkles = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2
    }));

    const butterflies = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 20 + 15,
      delay: Math.random() * 30
    }));

    setDecorativeElements({ hearts, sparkles, butterflies });
  };

  const handleRunawayInteraction = () => {
    if (slideAwayTriggered || hammerTime || animationsDisabled) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts >= 5 && !hammerTime) {
      setHammerTime(true);
      summonBabyWithHammer();
      return;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const btnWidth = 160;
    const btnHeight = 48;
    const padding = 20;

    const maxX = viewportWidth - btnWidth - padding;
    const minX = padding;
    const maxY = viewportHeight - btnHeight - padding;
    const minY = padding;

    const newX = Math.floor(Math.random() * (maxX - minX)) + minX;
    const newY = Math.floor(Math.random() * (maxY - minY)) + minY;

    setRunawayPosition({
      left: `${newX}px`,
      top: `${newY}px`,
      transform: 'none'
    });

    if (Math.random() < 0.1) {
      setSlideAwayTriggered(true);
      setTimeout(() => {
        setRunawayPosition({ left: '50%', top: '0', transform: 'translateX(-50%)' });
        setSlideAwayTriggered(false);
      }, 1000);
    }
  };

  const summonBabyWithHammer = () => {
    setBabyVisible(true);
    
    // Walking animation
    setTimeout(() => {
      setBabyPosition({ left: 200, bottom: 200 });
    }, 100);

    // Hammer swing and button destruction
    setTimeout(() => {
      setButtonBroken(true);
      setTimeout(() => {
        setShowReplacement(true);
        // Baby walks away
        setBabyPosition({ left: -150, bottom: 20 });
        setTimeout(() => {
          setBabyVisible(false);
        }, 1000);
      }, 1500);
    }, 2000);
  };

  const handleYesClick = () => {
    // Navigate to success page or show success message
    alert("Yay! Looking forward to our time together! 💝");
  };

  const resetGame = () => {
    setAttempts(0);
    setHammerTime(false);
    setBabyVisible(false);
    setBabyPosition({ left: -150, bottom: 20 });
    setShowReplacement(false);
    setButtonBroken(false);
    setRunawayPosition({ left: '50%', top: '0', transform: 'translateX(-50%)' });
    setSlideAwayTriggered(false);
  };

  const toggleColorBlindMode = () => setColorBlindMode(!colorBlindMode);
  const toggleAnimations = () => setAnimationsDisabled(!animationsDisabled);
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
        runawayButton: 'bg-orange-600 hover:bg-orange-700 text-white border-4 border-orange-800',
        replacementButton: 'bg-green-600 hover:bg-green-700 text-white border-4 border-green-800'
      };
    }
    return {
      primary: 'from-pink-100 via-purple-50 to-indigo-100',
      cardBg: 'bg-white border-4 border-pink-400',
      titleColor: 'text-pink-600',
      textColor: 'text-gray-700',
      buttonPrimary: 'bg-pink-500 hover:bg-pink-600 focus:ring-pink-300',
      buttonSecondary: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300',
      runawayButton: 'bg-purple-500 hover:bg-purple-600 text-white',
      replacementButton: 'bg-green-500 hover:bg-green-600 text-white'
    };
  };

  const getFontSizeClasses = () => {
    switch (fontSize) {
      case 'large':
        return {
          title: 'text-4xl',
          emoji: 'text-6xl',
          subtitle: 'text-xl',
          message: 'text-xl',
          button: 'text-lg py-4 px-8',
          containerWidth: 'max-w-2xl'
        };
      case 'extra-large':
        return {
          title: 'text-5xl',
          emoji: 'text-8xl',
          subtitle: 'text-2xl',
          message: 'text-2xl',
          button: 'text-xl py-5 px-10',
          containerWidth: 'max-w-4xl'
        };
      default:
        return {
          title: 'text-2xl',
          emoji: 'text-5xl',
          subtitle: 'text-lg',
          message: 'text-base',
          button: 'text-base py-3 px-6',
          containerWidth: 'max-w-md'
        };
    }
  };

  const colors = getColorScheme();
  const fontSizes = getFontSizeClasses();
  const shouldAnimate = !animationsDisabled;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 bg-gradient-to-br ${colors.primary} relative overflow-hidden`}>
      <style jsx>{`
        @keyframes float-circle {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(100px, -100px) rotate(90deg); }
          50% { transform: translate(0, -200px) rotate(180deg); }
          75% { transform: translate(-100px, -100px) rotate(270deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        @keyframes flutter-circle {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          20% { transform: translate(100px, -50px) rotate(72deg) scale(1.2); }
          40% { transform: translate(50px, -100px) rotate(144deg) scale(1); }
          60% { transform: translate(-50px, -100px) rotate(216deg) scale(1.2); }
          80% { transform: translate(-100px, -50px) rotate(288deg) scale(1); }
          100% { transform: translate(0, 0) rotate(360deg) scale(1); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideAway {
          to { left: 200%; }
        }
        
        @keyframes tear-drop {
          0% { height: 0; top: 20px; opacity: 0; }
          30% { height: 15px; opacity: 1; }
          100% { height: 15px; top: 60px; opacity: 0; }
        }
        
        @keyframes walking {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }
        
        .floating-heart {
          animation: ${shouldAnimate ? 'float-circle 20s linear infinite' : 'none'};
        }
        
        .floating-butterfly {
          animation: ${shouldAnimate ? 'flutter-circle 30s linear infinite' : 'none'};
        }
        
        .sparkle {
          animation: ${shouldAnimate ? 'sparkle 2s linear infinite' : 'none'};
        }
        
        .slide-away {
          animation: ${shouldAnimate ? 'slideAway 1s ease-in-out' : 'none'};
        }
        
        .tear {
          animation: ${shouldAnimate ? 'tear-drop 2s infinite' : 'none'};
        }
        
        .walking {
          animation: ${shouldAnimate ? 'walking 0.5s infinite alternate' : 'none'};
        }
      `}</style>

      {/* Accessibility Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={toggleColorBlindMode}
          className={`p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 ${colorBlindMode ? 'ring-4 ring-blue-600 bg-blue-50' : ''}`}
          aria-label={colorBlindMode ? 'Switch to standard colors' : 'Switch to color-blind friendly colors'}
          title="Toggle color-blind friendly mode"
        >
          <Eye className={`w-4 h-4 ${colorBlindMode ? 'text-blue-700' : 'text-gray-700'}`} />
        </button>
        
        <button
          onClick={toggleAnimations}
          className={`p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 ${animationsDisabled ? 'ring-4 ring-red-600 bg-red-50' : ''}`}
          aria-label={animationsDisabled ? 'Enable animations' : 'Disable animations'}
          title="Toggle animations"
        >
          <Pause className={`w-4 h-4 ${animationsDisabled ? 'text-red-700' : 'text-gray-700'}`} />
        </button>
        
        <button
          onClick={cycleFontSize}
          className={`p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 ${fontSize !== 'normal' ? 'ring-4 ring-green-600 bg-green-50' : ''}`}
          aria-label={`Current font size: ${fontSize}. Click to change`}
          title="Change font size"
        >
          <Type className={`w-4 h-4 ${fontSize !== 'normal' ? 'text-green-700' : 'text-gray-700'}`} />
        </button>
        
        <button
          onClick={resetGame}
          className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Reset game"
          title="Start over"
        >
          <RotateCcw className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Decorative Elements */}
      {shouldAnimate && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {decorativeElements.hearts.map((heart) => (
            <div
              key={`heart-${heart.id}`}
              className="absolute floating-heart"
              style={{
                left: `${heart.left}vw`,
                top: `${heart.top}vh`,
                fontSize: `${heart.size}px`,
                opacity: heart.opacity,
                animationDelay: `-${heart.delay}s`
              }}
            >
              ❤️
            </div>
          ))}
          
          {decorativeElements.sparkles.map((sparkle) => (
            <div
              key={`sparkle-${sparkle.id}`}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full sparkle"
              style={{
                left: `${sparkle.left}vw`,
                top: `${sparkle.top}vh`,
                animationDelay: `-${sparkle.delay}s`
              }}
            />
          ))}
          
          {decorativeElements.butterflies.map((butterfly) => (
            <div
              key={`butterfly-${butterfly.id}`}
              className="absolute floating-butterfly"
              style={{
                left: `${butterfly.left}vw`,
                top: `${butterfly.top}vh`,
                fontSize: `${butterfly.size}px`,
                animationDelay: `-${butterfly.delay}s`
              }}
            >
              🦋
            </div>
          ))}
        </div>
      )}

      {/* Baby Character */}
      {babyVisible && shouldAnimate && (
        <div
          className={`fixed z-40 w-20 h-20 transition-all duration-1000 ${shouldAnimate ? 'walking' : ''}`}
          style={{
            left: `${babyPosition.left}px`,
            bottom: `${babyPosition.bottom}px`
          }}
          aria-hidden="true"
        >
          <div className="w-16 h-16 bg-yellow-200 rounded-full relative">
            <div className="absolute top-3 left-3 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute top-3 right-3 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-pink-400 rounded-full"></div>
          </div>
          <div className="absolute -top-8 -right-2 w-8 h-12 bg-amber-700 rounded transform rotate-45 origin-bottom"></div>
        </div>
      )}

      {/* Main Content */}
      <div className={`container ${fontSizes.containerWidth} mx-auto z-10`}>
        <div className={`${colors.cardBg} rounded-3xl shadow-2xl p-8 text-center transition-all duration-500`}>
          {/* Crying Face */}
          <div className="mb-6 relative w-24 h-24 mx-auto">
            <div className="w-24 h-24 bg-yellow-400 rounded-full relative">
              <div className="flex justify-around pt-5">
                <div className="w-4 h-4 bg-black rounded-full relative">
                  {shouldAnimate && <div className="absolute -left-1 top-5 w-2 h-5 bg-blue-300 rounded-full tear"></div>}
                </div>
                <div className="w-4 h-4 bg-black rounded-full relative">
                  {shouldAnimate && <div className="absolute -right-1 top-5 w-2 h-5 bg-blue-300 rounded-full tear"></div>}
                </div>
              </div>
              <div className="w-6 h-3 bg-pink-400 rounded-full mx-auto mt-4 transform rotate-180"></div>
            </div>
          </div>
          
          <h2 className={`${fontSizes.title} font-bold ${colors.titleColor} mb-4`}>
            Are you sure??
          </h2>
          
          <p className={`${fontSizes.subtitle} italic ${colors.titleColor} mb-2`}>
            Don't you love me? 💔
          </p>
          
          <p className={`${colors.textColor} ${fontSizes.message} mb-6`}>
            I was really looking forward to spending time with you...
          </p>
          
          {/* Button Area */}
          <div className="mb-4 relative h-20">
            {!buttonBroken && !showReplacement && (
              <button
                onMouseOver={handleRunawayInteraction}
                onTouchStart={handleRunawayInteraction}
                className={`absolute ${colors.runawayButton} font-bold ${fontSizes.button} rounded-full transition-all duration-300 ${slideAwayTriggered && shouldAnimate ? 'slide-away' : ''}`}
                style={runawayPosition}
                aria-label="I'm really busy"
              >
                I'm really busy
              </button>
            )}
            
            {showReplacement && (
              <button
                onClick={handleYesClick}
                className={`absolute left-1/2 transform -translate-x-1/2 ${colors.replacementButton} font-bold ${fontSizes.button} rounded-full transition-all duration-500 hover:scale-105`}
                aria-label="I'll make time for you"
              >
                I'll make time for you 😅😅
              </button>
            )}
          </div>
          
          {/* Yes Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleYesClick}
              className={`${colors.buttonPrimary} text-white font-bold ${fontSizes.button} rounded-full transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4`}
              aria-label="Yes button"
            >
              <Heart className="w-4 h-4 mr-2 inline" />
              Yes
            </button>
            
            <button
              onClick={handleYesClick}
              className={`${colors.buttonPrimary} text-white font-bold ${fontSizes.button} rounded-full transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4`}
              aria-label="Of course yes button"
            >
              <Heart className="w-4 h-4 mr-2 inline" />
              Of course, Yes!!
            </button>
          </div>
        </div>
      </div>

      {/* Screen Reader Announcements */}
      <div className="sr-only" aria-live="polite">
        {colorBlindMode && "Color-blind friendly mode enabled"}
        {animationsDisabled && "Animations disabled"}
        {fontSize !== 'normal' && `Font size set to ${fontSize}`}
        {hammerTime && "Baby character appeared with hammer"}
        {buttonBroken && "Runaway button has been destroyed"}
        {showReplacement && "New button appeared: I'll make time for you"}
      </div>
    </div>
  );
}

export default AreYouSure;