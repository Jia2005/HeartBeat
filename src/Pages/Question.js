import React, { useState, useEffect } from 'react';
import { Heart, Cloud, Star, Clock } from 'lucide-react';

export default function HeartBeat() {
  const [attempts, setAttempts] = useState(0);

  const handleYesClick = () => {
    window.location.href = '/happy';
  };

  const handleMaybeClick = (e) => {
    if (attempts >= 3) {
      window.location.href = '/sad';
      return;
    }
    
    e.preventDefault();
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts >= 3) {
      setTimeout(() => {
        window.location.href = '/sad';
      }, 500);
      return;
    }

    const button = e.target.closest('button');
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const btnRect = button.getBoundingClientRect();
    const padding = 20;
    const maxX = viewportWidth - btnRect.width - padding;
    const minX = padding;
    const maxY = viewportHeight - btnRect.height - padding;
    const minY = padding;

    const newX = Math.floor(Math.random() * (maxX - minX)) + minX;
    const newY = Math.floor(Math.random() * (maxY - minY)) + minY;

    const parentRect = button.parentElement.getBoundingClientRect();
    const relativeX = newX - parentRect.left;
    const relativeY = newY - parentRect.top;

    button.style.position = 'absolute';
    button.style.left = relativeX + 'px';
    button.style.top = relativeY + 'px';
    button.style.transform = 'none';
  };

  const handleMaybeHover = (e) => {
    if (attempts >= 3) return;
    
    const button = e.target.closest('button');
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const btnRect = button.getBoundingClientRect();
    const padding = 20;
    const maxX = viewportWidth - btnRect.width - padding;
    const minX = padding;
    const maxY = viewportHeight - btnRect.height - padding;
    const minY = padding;

    const newX = Math.floor(Math.random() * (maxX - minX)) + minX;
    const newY = Math.floor(Math.random() * (maxY - minY)) + minY;

    const parentRect = button.parentElement.getBoundingClientRect();
    const relativeX = newX - parentRect.left;
    const relativeY = newY - parentRect.top;

    button.style.position = 'absolute';
    button.style.left = relativeX + 'px';
    button.style.top = relativeY + 'px';
    button.style.transform = 'none';
    
    setAttempts(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 font-comic relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-30"></div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            {i % 4 === 0 && <Heart className="text-pink-400 w-6 h-6" />}
            {i % 4 === 1 && <Cloud className="text-blue-400 w-8 h-8" />}
            {i % 4 === 2 && <Star className="text-yellow-400 w-5 h-5" />}
            {i % 4 === 3 && <div className="text-purple-400 text-2xl">💕</div>}
          </div>
        ))}
      </div>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
        .font-comic {
          font-family: 'Comic Neue', cursive;
        }
        
        body {
          background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b9d' fill-opacity='0.1'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
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
          animation: bounce 2s infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: floatReverse 2.5s ease-in-out infinite;
        }

        .card-shadow {
          box-shadow: 0 10px 25px -5px rgba(255, 107, 157, 0.3), 
                      0 8px 10px -6px rgba(255, 107, 157, 0.2);
        }

        .bg-pattern {
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(255, 107, 157, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 69, 193, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b9d' fill-opacity='0.03'%3E%3Ccircle cx='9' cy='9' r='1'/%3E%3Ccircle cx='49' cy='49' r='1'/%3E%3Ccircle cx='29' cy='29' r='1'/%3E%3Ccircle cx='39' cy='19' r='1'/%3E%3Ccircle cx='19' cy='39' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute text-pink-500 opacity-20 text-8xl top-10 left-10 animate-float">
          <Heart className="w-20 h-20" />
        </div>
        <div className="absolute text-blue-400 opacity-20 text-6xl top-20 right-20 animate-float-reverse">
          <Cloud className="w-16 h-16" />
        </div>
        <div className="absolute text-pink-500 opacity-20 text-7xl bottom-10 left-1/4 animate-float">
          <div className="text-7xl">😘</div>
        </div>
        <div className="absolute text-blue-400 opacity-20 text-6xl bottom-20 right-1/3 animate-float-reverse">
          <Star className="w-16 h-16" />
        </div>
        <div className="absolute text-purple-400 opacity-25 text-5xl top-1/2 left-10 animate-float">
          <div className="text-5xl">💖</div>
        </div>
        <div className="absolute text-pink-400 opacity-25 text-4xl top-1/3 right-10 animate-float-reverse">
          <div className="text-4xl">✨</div>
        </div>
      </div>

      <div className="container max-w-md mx-auto z-10">
        <div className="bg-white rounded-3xl card-shadow p-8 text-center transition-all duration-500 transform hover:scale-105">
          <div className="relative mb-6">
            <h1 className="text-3xl font-bold text-pink-500 mb-2">Will you go out with me?</h1>
            <div className="absolute -top-12 -right-6 transform rotate-12 text-pink-500 opacity-50">
              <span className="text-4xl">❤️</span>
            </div>
          </div>
          
          <div className="text-8xl mb-6 animate-bounce-custom">😊</div>
          
          <p className="text-xl text-gray-600 mb-4">Please lets go!!!</p>

          <p className="text-2xl font-bold text-pink-500 mb-8">I really want to spend time with you! ❤️🥺</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <button 
              onClick={handleYesClick}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-pink-200"
            >
              <Heart className="w-4 h-4 mr-2 inline" />Yes!
            </button>
            
            <button 
              onClick={handleMaybeClick}
              onMouseOver={handleMaybeHover}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-200 mt-3 sm:mt-0"
            >
              <Clock className="w-4 h-4 mr-2 inline" />Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}