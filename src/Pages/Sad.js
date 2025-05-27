import { useState, useEffect, useRef } from 'react';
import { Heart, Cloud, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Baby from './../Images/baby.png'; 

const Sad = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [slideAwayTriggered, setSlideAwayTriggered] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [hammerTime, setHammerTime] = useState(false);
  const [babyVisible, setBabyVisible] = useState(false);
  const [babyWalking, setBabyWalking] = useState(false);
  const [hammerSwing, setHammerSwing] = useState(false);
  const [showReplacement, setShowReplacement] = useState(false);
  const [runawayVisible, setRunawayVisible] = useState(true);
  const [buttonPosition, setButtonPosition] = useState({ left: '50%', top: '0', transform: 'translateX(-50%)' });
  const [babyPosition, setBabyPosition] = useState({ bottom: '-150px', left: '-100px' });
  const [sparkles, setSparkles] = useState([]);
  const [buttonPieces, setButtonPieces] = useState([]);
  const [decorations, setDecorations] = useState({ hearts: [], sparkleElements: [], butterflies: [] });
  const navigate = useNavigate();
  const runawayBtnRef = useRef(null);
  const replacementBtnRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
    initDecorations();
  }, []);

  const initDecorations = () => {
    const hearts = [];
    const sparkleElements = [];
    const butterflies = [];

    for (let i = 0; i < 15; i++) {
      hearts.push({
        id: `heart-${i}`,
        left: Math.random() * 100,
        top: Math.random() * 100,
        fontSize: Math.random() * 20 + 10,
        opacity: Math.random() * 0.7 + 0.3,
        animationDelay: -(Math.random() * 20)
      });
    }

    for (let i = 0; i < 10; i++) {
      sparkleElements.push({
        id: `sparkle-${i}`,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDelay: -(Math.random() * 2)
      });
    }

    for (let i = 0; i < 5; i++) {
      butterflies.push({
        id: `butterfly-${i}`,
        left: Math.random() * 100,
        top: Math.random() * 100,
        fontSize: Math.random() * 20 + 15,
        animationDelay: -(Math.random() * 30)
      });
    }

    setDecorations({ hearts, sparkleElements, butterflies });
  };

  const handleRunawayInteraction = (e) => {
    if (slideAwayTriggered || hammerTime) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts >= 5 && !hammerTime) {
      setHammerTime(true);
      summonBabyWithHammer();
      return;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const btnRect = runawayBtnRef.current?.getBoundingClientRect();
    if (!btnRect) return;

    const padding = 20;
    const maxX = viewportWidth - btnRect.width - padding;
    const minX = padding;
    const maxY = viewportHeight - btnRect.height - padding;
    const minY = padding;

    const newX = Math.floor(Math.random() * (maxX - minX)) + minX;
    const newY = Math.floor(Math.random() * (maxY - minY)) + minY;

    const parentRect = runawayBtnRef.current.parentElement.getBoundingClientRect();
    const relativeX = newX - parentRect.left;
    const relativeY = newY - parentRect.top;

    setButtonPosition({
      left: relativeX + 'px',
      top: relativeY + 'px',
      transform: 'none'
    });

    if (Math.random() < 0.1) {
      setSlideAwayTriggered(true);
      setTimeout(() => {
        setSlideAwayTriggered(false);
        setButtonPosition({ left: '50%', top: '0', transform: 'translateX(-50%)' });
      }, 1000);
    }
  };

  const summonBabyWithHammer = () => {
    const btnRect = runawayBtnRef.current?.getBoundingClientRect();
    if (!btnRect) return;

    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    setBabyVisible(true);
    setBabyWalking(true);
    setBabyPosition({ bottom: '20px', left: '20px' });

    const targetLeft = btnCenterX - 150;
    const steps = 10;
    let step = 0;

    const walkInterval = setInterval(() => {
      if (step < steps) {
        const newLeft = 20 + ((targetLeft - 20) * (step / steps));
        const newBottom = 20 + ((window.innerHeight - btnCenterY - 60) - 20) * (step / steps);
        setBabyPosition({ left: newLeft + 'px', bottom: newBottom + 'px' });
        step++;
      } else {
        clearInterval(walkInterval);
        setBabyWalking(false);

        setTimeout(() => {
          setHammerSwing(true);

          setTimeout(() => {
            createButtonPieces();
            setRunawayVisible(false);

            setTimeout(() => {
              setShowReplacement(true);
              createSparklesAroundButton();

              setBabyWalking(true);
              setBabyPosition({ left: '-150px', bottom: '20px' });

              setTimeout(() => {
                setBabyVisible(false);
                setBabyWalking(false);
                setHammerSwing(false);
              }, 1000);
            }, 1500);
          }, 1000);
        }, 500);
      }
    }, 150);
  };

  const createButtonPieces = () => {
    const btnRect = runawayBtnRef.current?.getBoundingClientRect();
    if (!btnRect) return;

    const leftPiece = {
      id: 'left',
      width: btnRect.width,
      height: btnRect.height,
      left: btnRect.left,
      top: btnRect.top,
      text: "I'm re",
      clipPath: 'polygon(0 0, 50% 0, 60% 100%, 0 100%)',
      animation: 'fallLeft 3s forwards cubic-bezier(0.42, 0, 0.58, 1)'
    };

    const rightPiece = {
      id: 'right',
      width: btnRect.width,
      height: btnRect.height,
      left: btnRect.left,
      top: btnRect.top,
      text: "ally busy",
      clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 40% 100%)',
      animation: 'fallRight 3s forwards cubic-bezier(0.42, 0, 0.58, 1)'
    };

    setButtonPieces([leftPiece, rightPiece]);

    setTimeout(() => {
      setButtonPieces([]);
    }, 3000);
  };

  const createSparklesAroundButton = () => {
    const newSparkles = [];
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 20;
      newSparkles.push({
        id: i,
        left: Math.cos(angle) * distance,
        top: Math.sin(angle) * distance,
        delay: i * 200
      });
    }
    setSparkles(newSparkles);

    setTimeout(() => setSparkles([]), 2000);
  };

  const handleYesClick = () => {
    navigate('/happy');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 font-comic relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-30" aria-hidden="true"></div>
      
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
        .font-comic {
          font-family: 'Comic Neue', cursive;
        }

        .bg-pattern {
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.05) 0%, transparent 50%);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes floatReverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: floatReverse 2.5s ease-in-out infinite;
        }

        .running-button {
          position: absolute;
          width: 160px;
          height: 48px;
          transition: left 0.3s ease, top 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slide-away {
          animation: slideAway 1s ease-in-out;
        }

        @keyframes slideAway {
          to {
            left: 200%;
          }
        }

        .fade-in {
          opacity: 1 !important;
          transition: opacity 0.5s ease-in-out;
        }

        .baby-character {
          position: fixed;
          width: 120px;
          height: 120px;
          z-index: 1000;
          transition: bottom 0.5s ease-in-out, left 0.5s ease-in-out;
        }

        .baby-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .hammer {
          position: absolute;
          width: 40px;
          height: 80px;
          right: 8px;
          top: -50px;
          transform-origin: bottom right;
          transition: transform 0.3s ease-in-out;
        }

        .hammer-swing {
          animation: hammerSwing 1s ease-in-out;
        }

        @keyframes hammerSwing {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(100deg); }
          100% { transform: rotate(0deg); }
        }

        .button-piece {
          position: fixed;
          background-color: #6C63FF;
          color: white;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 24px;
          z-index: 50;
        }

        @keyframes fallLeft {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(600px) rotate(-45deg); opacity: 0; }
        }

        @keyframes fallRight {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(600px) rotate(45deg); opacity: 0; }
        }

        .replacement-button {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 160px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 1s ease-in-out;
          pointer-events: none;
        }

        .replacement-button:hover {
          scale: 1.05;
          transition: ease-in-out;
          transition-duration: 0.5s;
        }

        .replacement-button.show {
          opacity: 1;
          pointer-events: all;
        }

        .floating-heart {
          position: absolute;
          font-size: 24px;
          color: #FF6B9D;
          animation: float-circle 20s linear infinite;
          opacity: 0.8;
          z-index: 1;
        }

        @keyframes float-circle {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(100px, -100px) rotate(90deg);
          }
          50% {
            transform: translate(0, -200px) rotate(180deg);
          }
          75% {
            transform: translate(-100px, -100px) rotate(270deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }

        .floating-butterfly {
          position: absolute;
          font-size: 24px;
          animation: flutter-circle 30s linear infinite;
          z-index: 1;
        }

        @keyframes flutter-circle {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          20% {
            transform: translate(100px, -50px) rotate(72deg) scale(1.2);
          }
          40% {
            transform: translate(50px, -100px) rotate(144deg) scale(1);
          }
          60% {
            transform: translate(-50px, -100px) rotate(216deg) scale(1.2);
          }
          80% {
            transform: translate(-100px, -50px) rotate(288deg) scale(1);
          }
          100% {
            transform: translate(0, 0) rotate(360deg) scale(1);
          }
        }

        .sparkle {
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: #FFD700;
          border-radius: 50%;
          animation: sparkle 2s linear infinite;
          z-index: 1;
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .crying-face {
          position: relative;
          width: 120px;
          height: 120px;
          background-color: #FFDB58;
          border-radius: 50%;
        }

        .eyes {
          display: flex;
          justify-content: space-around;
          padding-left: -5px;
          padding-right: -5px;
          padding-top: 20px;
        }

        .eye {
          width: 20px;
          height: 20px;
          background-color: #333;
          border-radius: 50%;
          position: relative;
        }

        .tear {
          position: absolute;
          width: 8px;
          height: 20px;
          background-color: #7DF9FF;
          border-radius: 50%;
          animation: tear-drop 2s infinite;
        }

        .tear-left {
          left: -5px;
          top: 20px;
        }

        .tear-right {
          right: -5px;
          top: 20px;
        }

        @keyframes tear-drop {
          0% {
            height: 0;
            top: 20px;
            opacity: 0;
          }
          30% {
            height: 15px;
            opacity: 1;
          }
          100% {
            height: 15px;
            top: 60px;
            opacity: 0;
          }
        }

        .mouth {
          width: 30px;
          height: 15px;
          margin: 20px auto 0;
          transform: rotate(180deg);
        }

        .walking {
          animation: walking 0.5s infinite alternate;
        }

        @keyframes walking {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }

        .button-sparkle {
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: #FFD700;
          border-radius: 50%;
          animation: sparkle 2s linear infinite;
          z-index: 1000;
        }

        .card-shadow {
          box-shadow: 0 10px 25px -5px rgba(255, 107, 157, 0.3), 
                      0 8px 10px -6px rgba(255, 107, 157, 0.2);
        }
      `}</style>

      {babyVisible && (
        <div
          className={`baby-character ${babyWalking ? 'walking' : ''}`}
          style={babyPosition}
        >
          <img src={Baby} alt="Baby character" className="baby-image" />
          <div className={`hammer ${hammerSwing ? 'hammer-swing' : ''}`}>
            <svg viewBox="0 0 40 80" width="40" height="80">
              <rect x="15" y="40" width="10" height="40" fill="#8B4513" />
              <rect x="5" y="30" width="30" height="15" fill="#A0522D" />
              <rect x="5" y="30" width="30" height="5" fill="#708090" />
            </svg>
          </div>
        </div>
      )}

      {buttonPieces.map((piece) => (
        <div
          key={piece.id}
          className="button-piece"
          style={{
            width: piece.width + 'px',
            height: piece.height + 'px',
            left: piece.left + 'px',
            top: piece.top + 'px',
            clipPath: piece.clipPath,
            animation: piece.animation
          }}
        >
          {piece.text}
        </div>
      ))}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`absolute ${i % 2 === 0 ? 'animate-float' : 'animate-float-reverse'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.3 + 0.1
            }}
          >
            {i % 4 === 0 && <Heart className="text-pink-400 w-6 h-6" />}
            {i % 4 === 1 && <Cloud className="text-blue-400 w-8 h-8" />}
            {i % 4 === 2 && <Star className="text-yellow-500 w-5 h-5" />}
            {i % 4 === 3 && <div className="text-purple-400 text-2xl">💕</div>}
          </div>
        ))}

        {decorations.hearts.map((heart) => (
          <div
            key={heart.id}
            className="floating-heart"
            style={{
              left: heart.left + 'vw',
              top: heart.top + 'vh',
              fontSize: heart.fontSize + 'px',
              opacity: heart.opacity,
              animationDelay: heart.animationDelay + 's'
            }}
          >
            ❤️
          </div>
        ))}

        {decorations.sparkleElements.map((sparkle) => (
          <div
            key={sparkle.id}
            className="sparkle"
            style={{
              left: sparkle.left + 'vw',
              top: sparkle.top + 'vh',
              animationDelay: sparkle.animationDelay + 's'
            }}
          />
        ))}

        {decorations.butterflies.map((butterfly) => (
          <div
            key={butterfly.id}
            className="floating-butterfly"
            style={{
              left: butterfly.left + 'vw',
              top: butterfly.top + 'vh',
              fontSize: butterfly.fontSize + 'px',
              animationDelay: butterfly.animationDelay + 's'
            }}
          >
            🦋
          </div>
        ))}
      </div>

      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="button-sparkle"
          style={{
            left: `calc(50% + ${sparkle.left}px)`,
            top: `calc(50% + ${sparkle.top}px)`,
            animationDelay: `${sparkle.delay}ms`
          }}
        />
      ))}

      <div className="container max-w-md mx-auto z-10">
        <div className={`bg-white border-4 border-pink-400 rounded-3xl card-shadow p-8 text-center transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'} relative`}>
          <div className="absolute -top-2 -right-2 transform rotate-12 text-pink-500" aria-hidden="true">
            <span className="text-2xl">❤️</span>
          </div>
        
          <div className="mb-6 relative w-24 h-24 mx-auto">
            <div className="crying-face">
              <div className="eyes">
                <div className="eye">
                  <div className="tear tear-left"></div>
                </div>
                <div className="eye">
                  <div className="tear tear-right"></div>
                </div>
              </div>
              <div className="mouth"></div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-pink-600 mb-4">Are you sure??</h2>
          <p className="text-xl italic text-pink-600 mb-2">
            Don't you love me? <span className="text-2xl">💔</span>
          </p>
          <p className="text-gray-600 mb-6">I was really looking forward to spending time with you...</p>

          <div className="mb-4 relative h-20">
            {runawayVisible && (
              <button
                ref={runawayBtnRef}
                className={`running-button bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full ${slideAwayTriggered ? 'slide-away' : ''}`}
                style={buttonPosition}
                onMouseOver={handleRunawayInteraction}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleRunawayInteraction(e);
                }}
              >
                I'm really busy
              </button>
            )}

            <button
              ref={replacementBtnRef}
              className={`replacement-button bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full ${showReplacement ? 'show' : ''}`}
              onClick={handleYesClick}
            >
              I'll make time for you 😅😅
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-full transform transition-all duration-300 hover:scale-105 flex items-center justify-center"
              onClick={handleYesClick}
            >
              <span className="mr-2">❤️</span>Yes
            </button>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-full transform transition-all duration-300 hover:scale-105 flex items-center justify-center"
              onClick={handleYesClick}
            >
              <span className="mr-2">❤️</span>Of course, Yes!!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sad;