
document.addEventListener('DOMContentLoaded', () => {
    
    const darkModeBtn = document.getElementById('dark-mode-btn');
    const lightModeBtn = document.getElementById('light-mode-btn');
    const systemModeBtn = document.getElementById('system-mode-btn');
    
    
    initializeTheme();
    
    
    darkModeBtn.addEventListener('click', () => setTheme('dark'));
    lightModeBtn.addEventListener('click', () => setTheme('light'));
    systemModeBtn.addEventListener('click', () => setTheme('system'));
    
    
    initializeAnimations();
    
    
    initializeMobileMenu();
    
    
    initializeHeaderScroll();
    
    
    initializeUIToggles();
});


function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
}

function setTheme(theme) {
    const darkModeBtn = document.getElementById('dark-mode-btn');
    const lightModeBtn = document.getElementById('light-mode-btn');
    const systemModeBtn = document.getElementById('system-mode-btn');
    
    
    darkModeBtn.classList.remove('active');
    lightModeBtn.classList.remove('active');
    systemModeBtn.classList.remove('active');
    
    
    if (theme === 'dark') {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        darkModeBtn.classList.add('active');
    } else if (theme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        lightModeBtn.classList.add('active');
    } else if (theme === 'system') {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkScheme) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
        }
        systemModeBtn.classList.add('active');
        
        
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (localStorage.getItem('theme') === 'system') {
                if (e.matches) {
                    document.body.classList.remove('light-theme');
                    document.body.classList.add('dark-theme');
                } else {
                    document.body.classList.remove('dark-theme');
                    document.body.classList.add('light-theme');
                }
            }
        });
    }
    
    
    localStorage.setItem('theme', theme);
}


function initializeAnimations() {
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay * 1000);
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal-on-scroll').forEach(element => {
        revealObserver.observe(element);
    });
    
    
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.transitionDelay = `${0.1 * index}s`;
    });
    
    
    document.querySelectorAll('.download-card').forEach((card, index) => {
        card.style.transitionDelay = `${0.1 * index}s`;
    });
    
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                
                const mobileMenu = document.querySelector('.main-nav');
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });
}


function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
}


function initializeHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}


function initializeCursorEffect() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        
        
        setTimeout(() => {
            cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }, 100);
    });
    
    
    const interactiveElements = document.querySelectorAll('a, button, .feature-card, .download-card, .creator-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('expand');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('expand');
        });
    });
}


function initializeUIToggles() {
    const toggleButtons = document.querySelectorAll('.toggle-button');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const toggleValue = button.querySelector('.toggle-value');
            const currentValue = toggleValue.textContent;
            
            if (currentValue === 'TRUE') {
                toggleValue.textContent = 'FALSE';
                toggleValue.style.color = 'var(--error-red)';
            } else {
                toggleValue.textContent = 'TRUE';
                toggleValue.style.color = 'var(--success-green)';
            }
            
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            
            ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}


function initializeStarsAnimation() {
    const starsContainer = document.getElementById('stars-container');
    if (!starsContainer) return;
    
    
    const maxStars = 150;
    const minStars = 100;
    let currentStars = 0;
    
    
    for (let i = 0; i < maxStars; i++) {
        createStar(starsContainer, i < 30); 
        currentStars++;
    }
    
    
    setInterval(() => {
        
        const actualStars = document.querySelectorAll('.star').length;
        
        
        if (actualStars < minStars) {
            const starsToAdd = Math.min(10, minStars - actualStars);
            for (let i = 0; i < starsToAdd; i++) {
                createStar(starsContainer, false);
                currentStars++;
            }
        }
    }, 500);
}

function createStar(container, noDelay = false) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    
    const fromSide = Math.random() > 0.7;
    let xPos, yPos;
    
    if (fromSide) {
        
        xPos = Math.random() > 0.5 ? -5 : 105; 
        yPos = Math.random() * 70; 
    } else {
        
        xPos = Math.random() * 100;
        yPos = -5; 
    }
    
    star.style.left = `${xPos}vw`;
    star.style.top = `${yPos}vh`;
    
    
    const size = 1 + Math.random() * 3;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    
    const brightness = 0.7 + (size / 4 * 0.3); 
    star.style.opacity = brightness;
    
    
    const duration = 5 + Math.random() * 7;
    star.style.animationDuration = `${duration}s`;
    
    
    const delay = noDelay ? 0 : Math.random() * 5;
    star.style.animationDelay = `${delay}s`;
    
    
    container.appendChild(star);
    
    
    setTimeout(() => {
        if (star.parentNode) {
            star.remove();
            createStar(container, true); 
        }
    }, (duration + delay) * 1000);
}


window.addEventListener('load', () => {
    
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hide');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1000);
    }
    
    
    setTimeout(() => {
        console.log('Initializing stars animation');
        initializeStarsAnimation();
    }, 500);
    
    
    if (typeof initializeCursorEffect === 'function') {
        initializeCursorEffect();
    }
});
