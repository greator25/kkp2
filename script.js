// Global variables
let currentLanguage = 'en';
let mobileMenuOpen = false;

// Language switching functionality
function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update body data-lang attribute for CSS targeting
    document.body.setAttribute('data-lang', lang);
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="switchLanguage('${lang}')"]`).classList.add('active');
    
    // Update all translatable elements
    updateTranslations(lang);
    
    // Update form placeholders
    updateFormPlaceholders(lang);
    
    // Save language preference
    localStorage.setItem('preferred-language', lang);
}

// Update translations for all elements with data attributes
function updateTranslations(lang) {
    const elements = document.querySelectorAll('[data-en]');
    
    elements.forEach(element => {
        if (element.hasAttribute(`data-${lang}`)) {
            element.textContent = element.getAttribute(`data-${lang}`);
        }
    });
    
    // Update page title
    const titles = {
        'en': 'KKP TRANSPORTS - Reliable Transportation Services',
        'ta': 'KKP டிரான்ஸ்போர்ட்ஸ் - நம்பகமான போக்குவரத்து சேவைகள்',
        'hi': 'KKP ट्रांसपोर्ट्स - विश्वसनीय परिवहन सेवाएं'
    };
    document.title = titles[lang];
}

// Update form placeholders
function updateFormPlaceholders(lang) {
    const placeholders = {
        'en': {
            name: 'Your Name',
            email: 'Your Email',
            phone: 'Phone Number',
            service: 'Select Service',
            message: 'Message',
            submit: 'Send Message'
        },
        'ta': {
            name: 'உங்கள் பெயர்',
            email: 'உங்கள் மின்னஞ்சல்',
            phone: 'தொலைபேசி எண்',
            service: 'சேவையைத் தேர்ந்தெடுக்கவும்',
            message: 'செய்தி',
            submit: 'செய்தி அனுப்பு'
        },
        'hi': {
            name: 'आपका नाम',
            email: 'आपका ईमेल',
            phone: 'फोन नंबर',
            service: 'सेवा चुनें',
            message: 'संदेश',
            submit: 'संदेश भेजें'
        }
    };
    
    const form = document.querySelector('.contact-form form');
    if (form) {
        const nameInput = form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('input[type="email"]');
        const phoneInput = form.querySelector('input[type="tel"]');
        const serviceSelect = form.querySelector('select');
        const messageTextarea = form.querySelector('textarea');
        const submitButton = form.querySelector('button[type="submit"]');
        
        if (nameInput) nameInput.placeholder = placeholders[lang].name;
        if (emailInput) emailInput.placeholder = placeholders[lang].email;
        if (phoneInput) phoneInput.placeholder = placeholders[lang].phone;
        if (messageTextarea) messageTextarea.placeholder = placeholders[lang].message;
        if (submitButton) submitButton.textContent = placeholders[lang].submit;
        
        // Update select options
        if (serviceSelect) {
            const defaultOption = serviceSelect.querySelector('option[value=""]');
            if (defaultOption) {
                defaultOption.textContent = placeholders[lang].service;
            }
        }
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        navMenu.classList.add('active');
        menuToggle.classList.add('active');
    } else {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
}

// Close mobile menu function
function closeMobileMenu() {
    if (mobileMenuOpen) {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        
        mobileMenuOpen = false;
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open (auto-close behavior)
                closeMobileMenu();
            }
        });
    });
}

// Form submission handler
function initFormHandler() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
           // e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show success message
            showNotification('Thank you for your message! We will contact you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .client-card, .vehicle-item, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Header background change on scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(63, 53, 46, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, var(--taupe) 0%, var(--zorba) 100%)';
            header.style.backdropFilter = 'none';
        }
    });
}

// Statistics counter animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    if (counter.textContent.includes('+')) {
                        counter.textContent = Math.floor(current).toLocaleString() + '+';
                    } else {
                        counter.textContent = Math.floor(current).toLocaleString();
                    }
                }, 20);
                
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

// Keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Language switching with keyboard
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    switchLanguage('en');
                    break;
                case '2':
                    switchLanguage('ta');
                    break;
                case '3':
                    switchLanguage('hi');
                    break;
            }
        }
        
        // Escape key closes mobile menu
        if (e.key === 'Escape' && mobileMenuOpen) {
            toggleMobileMenu();
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && ['en', 'ta', 'hi'].includes(savedLanguage)) {
        switchLanguage(savedLanguage);
    } else {
        // Set default language data attribute
        document.body.setAttribute('data-lang', 'en');
    }
    
    // Initialize all features
    initSmoothScrolling();
    initFormHandler();
    initScrollAnimations();
    initHeaderScroll();
    initCounters();
    initKeyboardNavigation();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navContainer = document.querySelector('.nav-container');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenuOpen && !navContainer.contains(e.target) && !mobileToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Lazy loading for images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
});

// Service Worker for offline functionality (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration can be added here if needed
    });
}

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

// Utility function for debouncing
function debounce(func, wait) {
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

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        switchLanguage,
        toggleMobileMenu,
        showNotification
    };
}
