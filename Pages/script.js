document.addEventListener('DOMContentLoaded', function() {
    let keyboardModeEnabled = false;
    let reducedMotionEnabled = false;
    let highContrastEnabled = false;
    let largeTextEnabled = false;
    
    const statusAnnouncements = document.getElementById('status-announcements') || createStatusElement();
    
    function createStatusElement() {
        const element = document.createElement('div');
        element.id = 'status-announcements';
        element.setAttribute('aria-live', 'polite');
        element.setAttribute('aria-atomic', 'true');
        element.className = 'sr-only';
        document.body.appendChild(element);
        return element;
    }

    function announceToScreenReader(message) {
        if (statusAnnouncements) {
            statusAnnouncements.textContent = message;
            setTimeout(() => {
                statusAnnouncements.textContent = '';
            }, 1000);
        }
    }

    function initAccessibilityControls() {
        const highContrastBtn = document.getElementById('high-contrast-btn');
        const largeTextBtn = document.getElementById('large-text-btn');
        const reduceMotionBtn = document.getElementById('reduce-motion-btn');
        const keyboardModeBtn = document.getElementById('keyboard-mode-btn');

        if (highContrastBtn) {
            highContrastBtn.addEventListener('click', function() {
                highContrastEnabled = !highContrastEnabled;
                this.setAttribute('aria-pressed', highContrastEnabled.toString());
                this.classList.toggle('active', highContrastEnabled);
                
                if (highContrastEnabled) {
                    document.documentElement.setAttribute('data-theme', 'high-contrast');
                    announceToScreenReader('High contrast mode enabled');
                } else {
                    document.documentElement.removeAttribute('data-theme');
                    announceToScreenReader('High contrast mode disabled');
                }
            });
        }

        if (largeTextBtn) {
            largeTextBtn.addEventListener('click', function() {
                largeTextEnabled = !largeTextEnabled;
                this.setAttribute('aria-pressed', largeTextEnabled.toString());
                this.classList.toggle('active', largeTextEnabled);
                document.body.classList.toggle('large-text', largeTextEnabled);
                
                announceToScreenReader(largeTextEnabled ? 'Large text enabled' : 'Large text disabled');
            });
        }

        if (reduceMotionBtn) {
            reduceMotionBtn.addEventListener('click', function() {
                reducedMotionEnabled = !reducedMotionEnabled;
                this.setAttribute('aria-pressed', reducedMotionEnabled.toString());
                this.classList.toggle('active', reducedMotionEnabled);
                document.body.classList.toggle('reduced-motion', reducedMotionEnabled);
                
                announceToScreenReader(reducedMotionEnabled ? 'Animations reduced' : 'Animations restored');
                
                if (reducedMotionEnabled) {
                    clearAllAnimations();
                } else {
                    restoreAnimations();
                }
            });
        }

        if (keyboardModeBtn) {
            keyboardModeBtn.addEventListener('click', function() {
                keyboardModeEnabled = !keyboardModeEnabled;
                this.setAttribute('aria-pressed', keyboardModeEnabled.toString());
                this.classList.toggle('active', keyboardModeEnabled);
                
                const runawayBtn = document.getElementById('runaway-btn');
                const maybeBtn = document.getElementById('maybe-btn');
                const targetBtn = runawayBtn || maybeBtn;
                
                if (targetBtn) {
                    targetBtn.classList.toggle('keyboard-accessible', keyboardModeEnabled);
                    
                    if (keyboardModeEnabled) {
                        targetBtn.style.position = 'static';
                        targetBtn.style.transform = 'none';
                        targetBtn.style.left = 'auto';
                        targetBtn.style.top = 'auto';
                        announceToScreenReader('Keyboard friendly mode enabled. Buttons will no longer move.');
                    } else {
                        targetBtn.style.position = '';
                        targetBtn.style.transform = '';
                        targetBtn.style.left = '';
                        targetBtn.style.top = '';
                        announceToScreenReader('Keyboard mode disabled. Buttons may move around.');
                    }
                }
            });
        }
    }

    function addFocusManagement() {
        let isTabbing = false;

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                isTabbing = true;
                document.body.classList.add('focus-visible');
            }
            if (e.key === 'Escape') {
                const activeElement = document.activeElement;
                if (activeElement && activeElement.blur) {
                    activeElement.blur();
                }
            }
        });

        document.addEventListener('mousedown', function() {
            isTabbing = false;
            document.body.classList.remove('focus-visible');
        });

        document.addEventListener('focusin', function(e) {
            if (isTabbing && e.target) {
                e.target.classList.add('focus-visible');
            }
        });

        document.addEventListener('focusout', function(e) {
            if (e.target) {
                e.target.classList.remove('focus-visible');
            }
        });
    }

    function clearAllAnimations() {
        const animatedElements = document.querySelectorAll('.floating-heart, .floating-butterfly, .sparkle, .tear, .walking');
        animatedElements.forEach(element => {
            element.style.animation = 'none';
        });
    }

    function restoreAnimations() {
        const hearts = document.querySelectorAll('.floating-heart');
        hearts.forEach(heart => {
            heart.style.animation = 'float-circle 20s linear infinite';
        });

        const butterflies = document.querySelectorAll('.floating-butterfly');
        butterflies.forEach(butterfly => {
            butterfly.style.animation = 'flutter-circle 30s linear infinite';
        });

        const sparkles = document.querySelectorAll('.sparkle');
        sparkles.forEach(sparkle => {
            sparkle.style.animation = 'sparkle 2s linear infinite';
        });

        const tears = document.querySelectorAll('.tear');
        tears.forEach(tear => {
            tear.style.animation = 'tear-drop 2s infinite';
        });
    }

    function handleButtonInteraction(button, attempts = 0) {
        if (keyboardModeEnabled || reducedMotionEnabled) {
            return false;
        }

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

        announceToScreenReader(`Button moved to a different position. Attempt ${attempts + 1}`);

        return true;
    }

    function createHearts(count = 100) {
        const heartsContainer = document.getElementById('hearts-container');
        if (!heartsContainer || reducedMotionEnabled) return;

        heartsContainer.classList.remove('hidden');
        heartsContainer.innerHTML = '';

        const srAnnouncement = document.createElement('div');
        srAnnouncement.className = 'sr-only';
        srAnnouncement.setAttribute('aria-live', 'polite');
        srAnnouncement.textContent = 'Hearts are floating across the screen';
        document.body.appendChild(srAnnouncement);

        const heartIcons = ['❤️', '💖', '💕', '💓', '💗', '💘'];

        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.setAttribute('aria-hidden', 'true');

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

                if (!reducedMotionEnabled) {
                    setTimeout(() => {
                        heart.style.transition = `bottom ${animationDuration}s linear, opacity 1s ease-in, left ${animationDuration/3}s ease-in-out`;
                        heart.style.opacity = '1';
                        heart.style.bottom = window.innerHeight + 'px';
                        heart.style.left = (startPositionX + (Math.random() * 100 - 50)) + 'px';

                        setTimeout(() => {
                            heart.remove();
                        }, animationDuration * 1000);
                    }, 10);
                }
            }, i * 100);
        }

        setTimeout(() => {
            srAnnouncement.remove();
        }, (count * 100) + 5000);
    }

    function initDecorations() {
        if (reducedMotionEnabled) return;

        const decorations = document.getElementById('decorations');
        if (!decorations) return;

        const icons = ['fa-heart', 'fa-star', 'fa-kiss', 'fa-heart-circle', 'fa-cloud-rain'];

        for (let i = 0; i < 8; i++) {
            addRandomDecoration(decorations, icons);
        }

        const decorationInterval = setInterval(() => {
            if (!reducedMotionEnabled) {
                addRandomDecoration(decorations, icons);
            }
        }, 3000);

        if (reducedMotionEnabled) {
            clearInterval(decorationInterval);
        }
    }

    function addRandomDecoration(decorations, icons) {
        if (!decorations || reducedMotionEnabled) return;

        const decoration = document.createElement('div');
        decoration.classList.add('decoration');
        decoration.setAttribute('aria-hidden', 'true');

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
        const countdownElement = document.createElement('div');
        countdownElement.className = 'sr-only';
        countdownElement.setAttribute('aria-live', 'polite');
        document.body.appendChild(countdownElement);

        let timeLeft = seconds;
        const countdownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 5 && timeLeft > 0) {
                countdownElement.textContent = `Redirecting in ${timeLeft} seconds`;
            }

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                countdownElement.textContent = "Redirecting now";
                window.location.href = url;
            }
        }, 1000);

        const skipBtn = document.createElement('button');
        skipBtn.textContent = "Skip countdown";
        skipBtn.className = "text-sm text-gray-500 hover:text-primary transition-colors fixed bottom-4 right-4 bg-white border border-gray-300 px-4 py-2 rounded-md min-h-11 min-w-11";
        skipBtn.setAttribute('aria-label', 'Skip countdown and redirect now');

        skipBtn.addEventListener('click', function() {
            clearInterval(countdownInterval);
            announceToScreenReader('Redirecting now');
            window.location.href = url;
        });

        skipBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        document.body.appendChild(skipBtn);
        return { countdownInterval, skipBtn, countdownElement };
    }

    function handlePageSpecificElements() {
        const yesBtn = document.getElementById('yes-btn');
        const maybeBtn = document.getElementById('maybe-btn');
        const runawayBtn = document.getElementById('runaway-btn');
        const mainCard = document.getElementById('main-card');

        if (yesBtn) {
            const handleYesClick = function(e) {
                e.preventDefault();
                announceToScreenReader('You chose Yes! Redirecting to happy page.');
                if (mainCard) {
                    mainCard.classList.add('fade-out');
                }
                setTimeout(() => {
                    window.location.href = 'happy.html';
                }, 500);
            };

            yesBtn.addEventListener('click', handleYesClick);
            yesBtn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleYesClick(e);
                }
            });
        }

        if (maybeBtn) {
            let attempts = 0;
            
            const handleMaybeInteraction = function(e) {
                if (keyboardModeEnabled) {
                    announceToScreenReader('You chose Maybe. Redirecting to uncertain page.');
                    if (mainCard) {
                        mainCard.classList.add('fade-out');
                    }
                    setTimeout(() => {
                        window.location.href = 'sad.html';
                    }, 500);
                    return;
                }

                e.preventDefault();
                attempts++;
                
                if (attempts >= 3) {
                    announceToScreenReader('After multiple attempts, redirecting to uncertain page.');
                    this.classList.add('animate-shake');
                    if (mainCard) {
                        mainCard.classList.add('fade-out');
                    }
                    setTimeout(() => {
                        window.location.href = 'sad.html';
                    }, 500);
                    return;
                }

                const moved = handleButtonInteraction(this, attempts);
                if (!moved) {
                    announceToScreenReader('You chose Maybe. Redirecting to uncertain page.');
                    if (mainCard) {
                        mainCard.classList.add('fade-out');
                    }
                    setTimeout(() => {
                        window.location.href = 'sad.html';
                    }, 500);
                }
            };

            maybeBtn.addEventListener('click', handleMaybeInteraction);
            maybeBtn.addEventListener('mouseover', function(e) {
                if (!keyboardModeEnabled && attempts < 3) {
                    handleButtonInteraction(this, attempts);
                    attempts++;
                }
            });
        }

        if (runawayBtn) {
            let attempts = 0;
            let slideAwayTriggered = false;
            let hammerTime = false;

            const handleRunawayInteraction = function(e) {
                if (slideAwayTriggered || hammerTime || keyboardModeEnabled || reducedMotionEnabled) {
                    return;
                }

                attempts++;

                if (attempts >= 5 && !hammerTime) {
                    hammerTime = true;
                    summonBabyWithHammer();
                    return;
                }

                const moved = handleButtonInteraction(this, attempts);
                
                if (moved && Math.random() < 0.1) {
                    slideAwayTriggered = true;
                    this.classList.add('slide-away');
                    announceToScreenReader('Button is sliding away');

                    setTimeout(() => {
                        this.classList.remove('slide-away');
                        this.style.left = '50%';
                        this.style.top = '0';
                        this.style.transform = 'translateX(-50%)';
                        slideAwayTriggered = false;
                        announceToScreenReader('Button returned to center');
                    }, 1000);
                }
            };

            runawayBtn.addEventListener('mouseover', handleRunawayInteraction);
            runawayBtn.addEventListener('touchstart', function(e) {
                if (!keyboardModeEnabled) {
                    e.preventDefault();
                    handleRunawayInteraction.call(this, e);
                }
            });

            runawayBtn.addEventListener('click', function(e) {
                if (keyboardModeEnabled) {
                    announceToScreenReader('You clicked the busy button');
                }
            });
        }

        const yesAnywayBtn = document.getElementById('yes-anyway');
        const ofCourseYesBtn = document.getElementById('of-course-yes');

        if (yesAnywayBtn) {
            yesAnywayBtn.addEventListener('click', function() {
                announceToScreenReader('You chose Yes! Redirecting to happy page.');
                const card = document.querySelector('.main-card');
                if (card) {
                    card.classList.add('fade-out');
                }
                setTimeout(() => {
                    window.location.href = 'happy.html';
                }, 500);
            });
        }

        if (ofCourseYesBtn) {
            ofCourseYesBtn.addEventListener('click', function() {
                announceToScreenReader('You chose Of course Yes! Redirecting to happy page.');
                const card = document.querySelector('.main-card');
                if (card) {
                    card.classList.add('fade-out');
                }
                setTimeout(() => {
                    window.location.href = 'happy.html';
                }, 500);
            });
        }
    }

    function summonBabyWithHammer() {
        const babyCharacter = document.getElementById('baby-character');
        const hammer = document.querySelector('.hammer');
        const runawayBtn = document.getElementById('runaway-btn');
        const replacementBtn = document.getElementById('replacement-btn');

        if (!babyCharacter || !runawayBtn) return;

        announceToScreenReader('A baby character appears with a hammer');

        const btnRect = runawayBtn.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;

        babyCharacter.classList.add('visible');
        if (!reducedMotionEnabled) {
            babyCharacter.classList.add('walking');
        }

        babyCharacter.style.bottom = '20px';
        babyCharacter.style.left = '20px';

        const targetLeft = btnCenterX - 150;
        const steps = reducedMotionEnabled ? 1 : 10;
        const walkPath = [];

        for (let i = 0; i <= steps; i++) {
            const position = {
                left: 20 + ((targetLeft - 20) * (i / steps)),
                bottom: 20 + ((window.innerHeight - btnCenterY - 60) - 20) * (i / steps)
            };
            walkPath.push(position);
        }

        let step = 0;
        const walkInterval = setInterval(() => {
            if (step < walkPath.length) {
                babyCharacter.style.left = walkPath[step].left + 'px';
                babyCharacter.style.bottom = walkPath[step].bottom + 'px';
                step++;
            } else {
                clearInterval(walkInterval);
                babyCharacter.classList.remove('walking');

                setTimeout(() => {
                    if (hammer && !reducedMotionEnabled) {
                        hammer.classList.add('hammer-swing');
                    }
                    announceToScreenReader('The baby swings the hammer at the button');

                    setTimeout(() => {
                        const btnRect = runawayBtn.getBoundingClientRect();
                        createButtonPieces(btnRect);
                        runawayBtn.style.opacity = "0";
                        runawayBtn.style.pointerEvents = "none";
                        announceToScreenReader('The busy button has been destroyed! A new option appears.');

                        setTimeout(() => {
                            if (replacementBtn) {
                                replacementBtn.classList.add('show');
                                replacementBtn.focus();
                                createSparklesAroundButton(replacementBtn);
                            }

                            if (!reducedMotionEnabled) {
                                babyCharacter.classList.add('walking');
                            }
                            babyCharacter.style.left = '-150px';

                            setTimeout(() => {
                                babyCharacter.classList.remove('visible');
                                babyCharacter.classList.remove('walking');
                                announceToScreenReader('The baby character has left');
                            }, 1000);
                        }, 1500);
                    }, 1000);
                }, 500);
            }
        }, reducedMotionEnabled ? 10 : 150);
    }

    function createButtonPieces(btnRect) {
        const leftPiece = document.createElement('div');
        leftPiece.className = 'button-piece piece-left';
        leftPiece.setAttribute('aria-hidden', 'true');
        leftPiece.style.width = btnRect.width + 'px';
        leftPiece.style.height = btnRect.height + 'px';
        leftPiece.style.left = btnRect.left + 'px';
        leftPiece.style.top = btnRect.top + 'px';
        leftPiece.textContent = "I'm re";
        document.body.appendChild(leftPiece);

        const rightPiece = document.createElement('div');
        rightPiece.className = 'button-piece piece-right';
        rightPiece.setAttribute('aria-hidden', 'true');
        rightPiece.style.width = btnRect.width + 'px';
        rightPiece.style.height = btnRect.height + 'px';
        rightPiece.style.left = btnRect.left + 'px';
        rightPiece.style.top = btnRect.top + 'px';
        rightPiece.textContent = "ally busy";
        document.body.appendChild(rightPiece);

        setTimeout(() => {
            leftPiece.remove();
            rightPiece.remove();
        }, 3000);
    }

    function createSparklesAroundButton(button) {
        if (reducedMotionEnabled || !button) return;

        const btnRect = button.getBoundingClientRect();

        for(let i = 0; i < 10; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.setAttribute('aria-hidden', 'true');
                const angle = Math.random() * Math.PI * 2;
                const distance = 30 + Math.random() * 20;

                const centerX = btnRect.left + btnRect.width/2;
                const centerY = btnRect.top + btnRect.height/2;

                sparkle.style.left = (centerX + Math.cos(angle) * distance) + 'px';
                sparkle.style.top = (centerY + Math.sin(angle) * distance) + 'px';
                document.body.appendChild(sparkle);

                setTimeout(() => {
                    sparkle.remove();
                }, 2000);
            }, i * 200);
        }
    }

    function detectUserPreferences() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) {
            reducedMotionEnabled = true;
            document.body.classList.add('reduced-motion');
            const reduceMotionBtn = document.getElementById('reduce-motion-btn');
            if (reduceMotionBtn) {
                reduceMotionBtn.setAttribute('aria-pressed', 'true');
                reduceMotionBtn.classList.add('active');
            }
        }

        mediaQuery.addEventListener('change', function(e) {
            if (e.matches) {
                reducedMotionEnabled = true;
                document.body.classList.add('reduced-motion');
                const reduceMotionBtn = document.getElementById('reduce-motion-btn');
                if (reduceMotionBtn) {
                    reduceMotionBtn.setAttribute('aria-pressed', 'true');
                    reduceMotionBtn.classList.add('active');
                }
                announceToScreenReader('Reduced motion detected and enabled');
            }
        });

        const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
        if (highContrastQuery.matches) {
            highContrastEnabled = true;
            document.documentElement.setAttribute('data-theme', 'high-contrast');
            const highContrastBtn = document.getElementById('high-contrast-btn');
            if (highContrastBtn) {
                highContrastBtn.setAttribute('aria-pressed', 'true');
                highContrastBtn.classList.add('active');
            }
        }
    }

    initAccessibilityControls();
    addFocusManagement();
    detectUserPreferences();
    handlePageSpecificElements();
    initDecorations();

    setTimeout(() => {
        const mainCard = document.querySelector('.main-card');
        if (mainCard) {
            mainCard.classList.add('fade-in');
        }
        announceToScreenReader('Page loaded successfully');
    }, 100);

    window.createHearts = createHearts;
    window.autoRedirect = autoRedirect;
    window.announceToScreenReader = announceToScreenReader;
});