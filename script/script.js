// ======================== NAVIGATION ========================

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a non-dropdown link
document.querySelectorAll('.nav-link:not(.has-dropdown > .nav-link)').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Dropdown Menu Toggle (Desktop & Mobile)
const dropdownItems = document.querySelectorAll('.has-dropdown');

dropdownItems.forEach(dropdown => {
    const navLink = dropdown.querySelector('.nav-link');
    
    // Desktop hover
    dropdown.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            dropdown.classList.add('active');
        }
    });
    
    dropdown.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            dropdown.classList.remove('active');
        }
    });
    
    // Mobile click
    navLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            
            // Close other dropdowns
            dropdownItems.forEach(other => {
                if (other !== dropdown) {
                    other.classList.remove('active');
                }
            });
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        dropdownItems.forEach(dropdown => {
            if (window.innerWidth <= 768) {
                dropdown.classList.remove('active');
            }
        });
    }
});

// ======================== NAVBAR SCROLL EFFECT ========================

let lastScrollY = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    
    if (lastScrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.08)';
    }
});

// ======================== SMOOTH SCROLL ========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // If it's a valid anchor, smooth scroll
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // Close mobile menu before scrolling
                if (window.innerWidth <= 768) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    dropdownItems.forEach(dd => {
                        dd.classList.remove('active');
                    });
                }
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ======================== INTERSECTION OBSERVER FOR ANIMATIONS ========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.feature-card, .service-card, .team-member').forEach(el => {
    observer.observe(el);
});

// ======================== COUNTER ANIMATION ========================

function animateCounter(element, target, duration = 2000) {
    const text = element.textContent;
    const suffix = text.replace(/[0-9]/g, '');
    const startValue = 0;
    const increment = target / (duration / 16);
    
    let currentValue = startValue;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= target) {
            currentValue = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue) + suffix;
    }, 16);
}

// Animate stats when they come into view
const statsElements = document.querySelectorAll('.stat-value');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            
            statsElements.forEach(element => {
                const text = element.textContent;
                const number = parseInt(text);
                if (!isNaN(number)) {
                    animateCounter(element, number, 2000);
                }
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ======================== BUTTON INTERACTIONS ========================

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn, .cta-button, .cta-button-white');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ======================== PARALLAX EFFECT ========================

window.addEventListener('scroll', () => {
    const blobs = document.querySelectorAll('.hero-blob');
    const scrollY = window.scrollY;
    
    blobs.forEach((blob, index) => {
        const speed = 0.5 + (index * 0.1);
        blob.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// ======================== HERO IMAGE ANIMATION ========================

const pulseCircles = document.querySelectorAll('.pulse-circle');
const heroImageIcon = document.querySelector('.hero-image-icon');

// Animate pulse circles with delay
if (pulseCircles.length > 0) {
    pulseCircles.forEach((circle, index) => {
        const delay = index * 0.7;
        circle.style.animationDelay = `${delay}s`;
    });
}

// ======================== FLOATING CARDS ANIMATION ========================

const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    // Add floating animation
    const randomDelay = Math.random() * 0.5;
    card.style.animationDelay = `${0.7 + index * 0.2 + randomDelay}s`;
    
    // Add hover tilt effect
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const angle = Math.atan2(y, x) * (180 / Math.PI);
        
        this.style.transform = `translateY(-10px) rotateZ(${angle / 30}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateZ(0deg)';
    });
});

// ======================== FEATURE ICON PULSE ========================

const featureIcons = document.querySelectorAll('.feature-icon');

featureIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        this.style.transform = 'scale(1.2) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.animation = 'pulse-icon 2s ease-in-out infinite';
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ======================== WINDOW RESIZE HANDLER ========================

window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ======================== PAGE LOAD ANIMATIONS ========================

document.addEventListener('DOMContentLoaded', () => {
    // Trigger animations for visible elements on page load
    const visibleElements = document.querySelectorAll('.feature-card, .service-card, .team-member');
    
    visibleElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s forwards`;
        }
    });
});

// ======================== SCROLL TO TOP BUTTON (Optional) ========================

// Create scroll to top button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.className = 'scroll-to-top';
scrollButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #0066cc, #00d4ff);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 102, 204, 0.3);
`;

document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollButton.style.display = 'flex';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollButton.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
});

scrollButton.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
});

// ======================== ACTIVE NAV LINK HIGHLIGHTING ========================

const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
            link.style.fontWeight = '700';
        } else {
            link.style.color = 'var(--text-dark)';
            link.style.fontWeight = '500';
        }
    });
});

// ======================== MOBILE DROPDOWN MENU FIX ========================

// Handle dropdown visibility on mobile
if (window.innerWidth <= 768) {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const parent = toggle.parentElement;
            parent.classList.toggle('active');
            
            // Prevent default link behavior
            if (toggle.parentElement.classList.contains('dropdown')) {
                e.preventDefault();
            }
        });
    });
}

// ======================== FORM INTERACTIONS (Optional) ========================

// Add smooth transitions to form inputs
const inputs = document.querySelectorAll('input, textarea, select');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary-color)';
        this.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.1)';
    });
    
    input.addEventListener('blur', function() {
        this.style.borderColor = 'var(--border-color)';
        this.style.boxShadow = 'none';
    });
});

console.log('✨ Medenin Medical Website Loaded');
