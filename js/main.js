document.addEventListener('DOMContentLoaded', function() {
  
    initializeNavigation();
    initializeScrollAnimations();
    initializeIntersectionObserver();
    initializeParallaxEffects();
    initializeTypewriterEffect();
    initializeMouseEffects();
});


function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navigation = document.querySelector('.main-navigation');
    

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navigation.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            navigation.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navigation.style.backgroundColor = 'rgb(0, 0, 0)';
            navigation.style.boxShadow = 'none';
        }
    });
    

    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}


function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function initializeIntersectionObserver() {
    const aboutSection = document.querySelector('.about-section');
    const serviceItems = document.querySelectorAll('.service-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-section')) {
                    entry.target.classList.add('visible');
                    
                    serviceItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
            }
        });
    }, {
        threshold: 0.3
    });
    
    if (aboutSection) {
        observer.observe(aboutSection);
    }
    
    serviceItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
    });
}

function initializeParallaxEffects() {
    const shapes = document.querySelectorAll('.geometric-bg-shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.3;
            shape.style.transform += ` translateY(${scrolled * speed}px)`;
        });
    });
}

function initializeTypewriterEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const text = 'Je Mary';
    let index = 0;
    
    typingText.textContent = '';
    typingText.style.borderRight = '3px solid #2563eb';
    
    function typeWriter() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 200);
        } else {

            setInterval(() => {
                typingText.style.borderRightColor = 
                    typingText.style.borderRightColor === 'transparent' ? '#2563eb' : 'transparent';
            }, 500);
        }
    }
    
    setTimeout(typeWriter, 1500);
}

function initializeMouseEffects() {
    const heroSection = document.querySelector('.hero-section');
    const profileFrame = document.querySelector('.profile-frame');
    
    document.addEventListener('mousemove', function(e) {
        if (!heroSection) return;
        
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        if (profileFrame) {
            const xRotation = (mouseY - 0.5) * 10;
            const yRotation = (mouseX - 0.5) * 10;
            profileFrame.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        }
        
        const shapes = document.querySelectorAll('.geometric-bg-shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.01;
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;
            shape.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });
    
    document.addEventListener('mouseleave', function() {
        if (profileFrame) {
            profileFrame.style.transform = '';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const hireBtn = document.querySelector('.hire-btn');
    
    if (hireBtn) {
        hireBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        hireBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        hireBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(37, 99, 235, 0.3);
                border-radius: 50%;
                transform: scale(0);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});


const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .hire-btn {
        position: relative;
        overflow: hidden;
    }
    
    .nav-link.active::before {
        left: 0;
    }
    
    .nav-link.active {
        color: #2563eb;
    }
`;
document.head.appendChild(style);

// Loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15.0.0/dist/smooth-scroll.polyfills.min.js';
    document.head.appendChild(script);
    
    script.onload = function() {
        new SmoothScroll('a[href*="#"]');
    };
}

function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const throttledScrollHandler = throttle(function() {

}, 16); 

window.addEventListener('scroll', throttledScrollHandler);

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }
    
    // Enter key for button-like elements
    if (e.key === 'Enter' && e.target.classList.contains('hire-btn')) {
        e.target.click();
    }
});

// Print styles injection
const printStyle = document.createElement('style');
printStyle.textContent = `
    @media print {
        .geometric-bg-shape,
        .mobile-menu-btn {
            display: none !important;
        }
        
        body {
            background: white !important;
            color: black !important;
        }
        
        .hero-section,
        .about-section {
            background: white !important;
        }
        
        .nav-link,
        .logo {
            color: black !important;
        }
    }
`;
document.head.appendChild(printStyle);

