document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yes-btn');
    const maybeBtn = document.getElementById('maybe-btn');
    
    if (yesBtn) {
        yesBtn.addEventListener('click', function() {
            document.getElementById('main-card').classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'happy.html';
            }, 500);
        });
    }
    
    if (maybeBtn) {
        maybeBtn.addEventListener('click', function() {
            this.classList.add('animate-shake');
            document.getElementById('main-card').classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'sad.html';
            }, 500);
        });
    }
    initDecorations();
});

function createHearts(count = 50) {
    const heartsContainer = document.getElementById('hearts-container');
    if (!heartsContainer) return;
    
    heartsContainer.classList.remove('hidden');
    heartsContainer.innerHTML = '';
    
    const heartIcons = ['❤️', '💖', '💕', '💓', '💗', '💘'];
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            
            const randomIcon = heartIcons[Math.floor(Math.random() * heartIcons.length)];
            heart.innerHTML = randomIcon;
            
            const startPositionX = Math.random() * window.innerWidth;
            const endPositionY = -100;
            
            heart.style.left = startPositionX + 'px';
            heart.style.bottom = endPositionY + 'px';
            heart.style.opacity = '0';
            
            const animationDuration = Math.random() * 3 + 2;
            const heartSize = Math.random() * 20 + 10;
            
            heart.style.fontSize = heartSize + 'px';
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.style.transition = `bottom ${animationDuration}s linear, 
                                         opacity 1s ease-in, 
                                         left ${animationDuration/3}s ease-in-out`;
                heart.style.opacity = '1';
                heart.style.bottom = window.innerHeight + 'px';
                heart.style.left = (startPositionX + (Math.random() * 100 - 50)) + 'px';
                setTimeout(() => {
                    heart.remove();
                }, animationDuration * 1000);
            }, 10);
        }, i * 100);
    }
}

function initDecorations() {
    for (let i = 0; i < 8; i++) {
        addRandomDecoration();
    }
    setInterval(addRandomDecoration, 3000);
}

function addRandomDecoration() {
    const decorations = document.getElementById('decorations');
    if (!decorations) return;
    
    const icons = ['fa-heart', 'fa-star', 'fa-kiss', 'fa-heart-circle', 'fa-cloud-rain'];
    
    const decoration = document.createElement('div');
    decoration.classList.add('decoration');
    const xPos = Math.random() * 100;
    const yPos = Math.random() * 100;
    const size = Math.random() * 4 + 2;
    const opacity = Math.random() * 0.15 + 0.05;
    const animClass = Math.random() > 0.5 ? 'animate-float' : 'animate-floatReverse';
    const rotation = Math.random() * 360;
    const iconClass = icons[Math.floor(Math.random() * icons.length)];
    
    decoration.classList.add('text-primary', animClass);
    decoration.style.fontSize = `${size}rem`;
    decoration.style.opacity = opacity;
    decoration.style.left = `${xPos}%`;
    decoration.style.top = `${yPos}%`;
    decoration.style.transform = `rotate(${rotation}deg)`;
    
    const icon = document.createElement('i');
    icon.classList.add('fas', iconClass);
    decoration.appendChild(icon);    
    decorations.appendChild(decoration);
    
    setTimeout(() => {
        decoration.classList.add('opacity-0', 'transition-opacity');
        setTimeout(() => decoration.remove(), 1000);
    }, 10000 + Math.random() * 5000);
}

function autoRedirect(url, seconds = 10) {
    setTimeout(() => {
        window.location.href = url;
    }, seconds * 1000);
}