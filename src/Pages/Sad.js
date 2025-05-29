import { useState, useEffect, useRef } from 'react';
import { Cloud } from 'lucide-react';
import Baby from './../Images/baby.png';
import { useNavigate } from 'react-router-dom';

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
  const [babyPosition, setBabyPosition] = useState({ bottom: '150px', left: '100px' });
  const [buttonPieces, setButtonPieces] = useState([]);
  const [raindrops, setRaindrops] = useState([]);
  const runawayBtnRef = useRef(null);
  const replacementBtnRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
    initRaindrops();
  }, []);

  const initRaindrops = () => {
    const drops = [];
    for (let i = 0; i < 50; i++) {
      drops.push({
        id: `drop-${i}`,
        left: Math.random() * 100,
        animationDelay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
        opacity: Math.random() * 0.6 + 0.2
      });
    }
    setRaindrops(drops);
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
              setBabyWalking(true);
              setBabyPosition({ left: '0px', bottom: '20px' });

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

  const handleYesClick = () => {
    navigate('/happy');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-700 via-gray-800 to-slate-900 font-comic relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-purple-900/20 to-gray-800/40"></div>
      <div className="absolute inset-0 bg-storm-clouds opacity-40"></div>
      
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
        .font-comic {
          font-family: 'Comic Neue', cursive;
        }

        .bg-storm-clouds {
          background-image: 
            radial-gradient(ellipse at 20% 30%, rgba(75, 85, 99, 0.8) 20%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(55, 65, 81, 0.7) 25%, transparent 65%),
            radial-gradient(ellipse at 40% 60%, rgba(107, 114, 128, 0.6) 15%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(75, 85, 99, 0.5) 30%, transparent 70%),
            radial-gradient(ellipse at 10% 80%, rgba(55, 65, 81, 0.4) 20%, transparent 60%);
          animation: driftClouds 30s ease-in-out infinite;
        }

        @keyframes driftClouds {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-20px); }
        }

        .raindrop {
          position: absolute;
          width: 2px;
          height: 15px;
          background: linear-gradient(to bottom, rgba(147, 197, 253, 0.8), rgba(59, 130, 246, 0.4));
          border-radius: 0 0 2px 2px;
          animation: rainfall linear infinite;
        }

        @keyframes rainfall {
          0% {
            transform: translateY(-100vh);
            opacity: 1;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        .floating-heart {
          position: absolute;
          font-size: 20px;
          color: #8B5A9F;
          animation: float-melancholy 25s linear infinite;
          opacity: 0.6;
          z-index: 1;
          filter: saturate(0.7) brightness(0.8);
        }

        @keyframes float-melancholy {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(-50px, -80px) rotate(45deg);
          }
          50% {
            transform: translate(20px, -160px) rotate(90deg);
          }
          75% {
            transform: translate(-30px, -80px) rotate(135deg);
          }
          100% {
            transform: translate(0, 0) rotate(180deg);
          }
        }

        .floating-butterfly {
          position: absolute;
          font-size: 18px;
          animation: flutter-slow 40s linear infinite;
          z-index: 1;
          opacity: 0.5;
          filter: grayscale(0.3) brightness(0.7);
        }

        @keyframes flutter-slow {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(60px, -40px) rotate(90deg) scale(0.8);
          }
          50% {
            transform: translate(20px, -80px) rotate(180deg) scale(1);
          }
          75% {
            transform: translate(-40px, -40px) rotate(270deg) scale(0.8);
          }
          100% {
            transform: translate(0, 0) rotate(360deg) scale(1);
          }
        }

        .floating-sad-emoji {
          position: absolute;
          animation: float-sad linear infinite;
          z-index: 1;
          pointer-events: none;
        }

        @keyframes float-sad {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(-30px, -40px) rotate(5deg);
          }
          50% {
            transform: translate(10px, -80px) rotate(-5deg);
          }
          75% {
            transform: translate(-20px, -40px) rotate(3deg);
          }
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
        }

        .sparkle {
          position: absolute;
          width: 6px;
          height: 6px;
          background-color: #A78BFA;
          border-radius: 50%;
          animation: sparkle-dim 3s linear infinite;
          z-index: 1;
          opacity: 0.4;
        }

        @keyframes sparkle-dim {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 0.6;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes floatReverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(15px); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: floatReverse 3.5s ease-in-out infinite;
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
          background-color: #3B82F6;
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
          100% { transform: translateY(600px) rotate(-60deg); opacity: 0; }
        }

        @keyframes fallRight {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(600px) rotate(60deg); opacity: 0; }
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

        .crying-face {
            position: relative;
            width: 100px;
            height: 100px;
            background: linear-gradient(145deg, #FFE55C, #FFDB58);
            border-radius: 50%;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .eyebrows {
            position: absolute;
            top: 25px;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-between;
            padding: 0 22.5px;
        }

        .eyebrow {
            width: 15px;
            height: 4px;
            background-color: #D4AC0D;
            border-radius: 5px;
            transform: rotate(-15deg);
        }

        .eyebrow.right {
            transform: rotate(15deg);
        }

        .eyes {
            position: absolute;
            top: 32.5px;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-between;
            padding: 0 25px;
        }

        .eye {
            width: 12.5px;
            height: 17.5px;
            background-color: #000;
            border-radius: 50%;
            position: relative;
        }

        .eye::after {
            content: '';
            position: absolute;
            top: 2.5px;
            right: 2.5px;
            width: 4px;
            height: 4px;
            background-color: white;
            border-radius: 50%;
        }

        .tear {
            position: absolute;
            width: 6px;
            height: 10px;
            background: linear-gradient(180deg, #87CEEB, #4682B4);
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            animation: tear-drop 3s infinite;
        }

        .tear-left {
            left: 42.5px;
            top: 45px;
            animation-delay: 1s;
        }

        .tear-right {
            right: 42.5px;
            top: 45px;
            animation-delay: 1s;
        }

        @keyframes tear-drop {
            0% {
                opacity: 0;
                transform: translateY(-50px) scale(0.5);
            }
            20% {
                opacity: 1;
                transform: translateY(0px) scale(1);
            }
            80% {
                opacity: 1;
                transform: translateY(20px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(30px) scale(0.8);
            }
        }

        .mouth {
            position: absolute;
            bottom: 25px;
            left: 50%;
            transform: translateX(-50%);
            width: 30px;
            height: 15px;
            background-color: #8B4513;
            border-top-left-radius: 50px;
            border-top-right-radius: 50px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
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
          box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.4), 
                      0 8px 15px -6px rgba(0, 0, 0, 0.3);
        }

        .cute-button {
          background: #ec4899; 
          box-shadow: 0 4px 15px rgba(255, 107, 157, 0.4);
        }

        .cute-button:hover {
          background: #db2777; 
          box-shadow: 0 6px 20px rgba(255, 64, 129, 0.5);
          transform: scale(1.05) translateY(-2px);
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {raindrops.map((drop) => (
          <div
            key={drop.id}
            className="raindrop"
            style={{
              left: drop.left + '%',
              animationDelay: drop.animationDelay + 's',
              animationDuration: drop.duration + 's',
              opacity: drop.opacity
            }}
          />
        ))}
      </div>

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
        {Array.from({ length: 6 }).map((_, i) => (
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
            <Cloud className="text-gray-500 w-6 h-6" />
          </div>
        ))}
      </div>

      <div className="container max-w-md mx-auto z-10">
        <div className={`bg-white/90 backdrop-blur-sm border-2 border-gray-300 rounded-3xl card-shadow p-8 text-center transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'} relative`}>
          <div className="absolute -top-2 -right-2 transform rotate-12 text-purple-500" aria-hidden="true">
            <span className="text-2xl">💔</span>
          </div>
        
            <div className="mb-6 relative w-24 h-24 mx-auto">
                <div className="crying-face">
                    <div className="eyebrows">
                        <div className="eyebrow left"></div>
                        <div className="eyebrow right"></div>
                    </div>
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

          <h2 className="text-2xl font-bold text-gray-700 mb-4">Are you sure??</h2>
          <p className="text-xl italic text-gray-600 mb-2">
            Don't you love me? <span className="text-2xl">💔</span>
          </p>
          <p className="text-gray-500 mb-6">I was really looking forward to spending time with you...</p>

          <div className="mb-4 relative h-20">
            {runawayVisible && (
              <button
                ref={runawayBtnRef}
                className={`running-button bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full ${slideAwayTriggered ? 'slide-away' : ''}`}
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
              className={`replacement-button bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full ${showReplacement ? 'show' : ''}`}
              onClick={handleYesClick}
            >
              I'll make time for you 😅😅
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              className="cute-button text-white font-bold py-3 px-4 rounded-full transform transition-all duration-300 hover:scale-105 flex items-center justify-center"
              onClick={handleYesClick}
            >
              <span className="mr-2">❤️</span>Yes
            </button>
            <button
              className="cute-button text-white font-bold py-3 px-4 rounded-full transform transition-all duration-300 hover:scale-105 flex items-center justify-center"
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