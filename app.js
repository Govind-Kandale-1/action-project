// Portfolio JavaScript for Govind Kandale

document.addEventListener('DOMContentLoaded', function() {

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            // Calculate offset considering fixed navbar height
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const offsetTop = targetSection.offsetTop - navbarHeight - 20;
            window.scrollTo({
                top: Math.max(0, offsetTop),
                behavior: 'smooth'
            });
            // Update active navigation state immediately
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Hero buttons smooth scrolling
const heroButtons = document.querySelectorAll('.hero-buttons .btn[href^="#"]');
heroButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const offsetTop = targetSection.offsetTop - navbarHeight - 20;
            window.scrollTo({
                top: Math.max(0, offsetTop),
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background opacity on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    if (scrolled > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Navigation active state based on scroll position
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', function() {
    const scrollY = window.pageYOffset + 100; // Add offset for better detection
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // Update active navigation state
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.card, .skill-category, .project-card, .timeline-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Enhanced contact form handling
const contactForm = document.querySelector('.contact-form form');
const submitButton = contactForm?.querySelector('button[type="submit"]');
if (contactForm && submitButton) {
    const originalButtonText = submitButton.textContent;
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Update button state
        submitButton.textContent = 'Opening Email Client...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';

        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Validate form
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            resetSubmitButton();
            return;
        }

        // Create mailto link with better formatting
        const emailBody = `Hello Govind,

Name: ${name}
Email: ${email}

Message:
${message}

Best regards,
${name}`;

        const mailtoLink = `mailto:govindkandale40@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

        // Show success message first
        showNotification('Email client is opening! Please send the message from your email app.', 'success');

        // Small delay before opening email client
        setTimeout(() => {
            try {
                window.location.href = mailtoLink;
                // Reset form after a delay
                setTimeout(() => {
                    this.reset();
                    resetSubmitButton();
                    showNotification('Form reset. Thank you for your message!', 'info');
                }, 2000);
            } catch (error) {
                showNotification('Unable to open email client. Please contact directly: govindkandale40@gmail.com', 'error');
                resetSubmitButton();
            }
        }, 500);
    });

    function resetSubmitButton() {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
    }
}

// Skill item hover effects
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(1deg)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Project card click effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'translateY(-5px) scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'translateY(-5px) scale(1)';
        }, 150);
    });
});

// Dynamic typing effect for hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// FIXED: Parallax effect for background elements - EXCLUDING meteors to prevent animation conflicts
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    // Only apply parallax to stars, NOT meteors
    const parallaxElements = document.querySelectorAll('.star');
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.05);
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
});

// Enhanced lighthouse beam animation with visibility
const lighthouseBeam = document.querySelector('.lighthouse-beam');
if (lighthouseBeam) {
    // Ensure the beam is more visible
    lighthouseBeam.style.opacity = '1';
    lighthouseBeam.style.zIndex = '15';
    // Add periodic flash effect to make it more noticeable
    setInterval(() => {
        lighthouseBeam.style.boxShadow = '0 0 30px rgba(156, 136, 255, 0.8), 0 0 60px rgba(156, 136, 255, 0.4)';
        setTimeout(() => {
            lighthouseBeam.style.boxShadow = '0 0 20px rgba(156, 136, 255, 0.4)';
        }, 200);
    }, 5000); // Match the animation cycle
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    // Create notification content
    const content = document.createElement('div');
    content.textContent = message;
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
        opacity: 0.7;
    `;

    notification.appendChild(content);
    notification.appendChild(closeBtn);

    // Style the notification
    const bgColor = type === 'success' ? '#9C88FF' :
                    type === 'error' ? '#e53e3e' :
                    type === 'info' ? '#4A90E2' : '#9C88FF';

    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: bgColor,
        color: 'white',
        padding: '16px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '350px',
        wordWrap: 'break-word',
        display: 'flex',
        alignItems: 'flex-start',
        fontWeight: '500'
    });

    document.body.appendChild(notification);

    // Close button functionality
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after delay
    const autoRemoveTimeout = setTimeout(() => {
        removeNotification(notification);
    }, type === 'error' ? 5000 : 4000);

    function removeNotification(notif) {
        clearTimeout(autoRemoveTimeout);
        notif.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notif.parentNode) {
                notif.parentNode.removeChild(notif);
            }
        }, 300);
    }
}

// Add enhanced card hover effects
const cards = document.querySelectorAll('.card, .skill-category, .project-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 40px rgba(156, 136, 255, 0.15)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #9C88FF, #8B7AE6);
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Enhanced mobile responsiveness
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    const cards = document.querySelectorAll('.card, .skill-category, .project-card');
    if (isMobile) {
        cards.forEach(card => {
            card.style.transform = 'none';
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(1.02)';
            });
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Call on load

// Initial navigation state - set hero as active
if (window.pageYOffset === 0) {
    navLinks.forEach(link => link.classList.remove('active'));
    // No active state for hero section
}

// Console welcome message
console.log('%c🌟 Welcome to Govind Kandale\'s Portfolio! 🌟', 'color: #9C88FF; font-size: 16px; font-weight: bold;');
console.log('%cCloud Engineer & Infrastructure Specialist', 'color: #CBD5E0; font-size: 14px;');
console.log('%cContact: govindkandale40@gmail.com', 'color: #9C88FF; font-size: 12px;');

// ==============================================
// AUTO-REFRESH FUNCTIONALITY FOR DEPLOYMENTS
// ==============================================

// Health check function for deployment updates
function checkForUpdates() {
    fetch('/health-check', { 
        method: 'HEAD',
        cache: 'no-store'
    })
    .catch(() => {
        // If service is down, show notification and wait before reload
        showNotification('🚀 Deployment detected! Refreshing in 5 seconds...', 'info');
        setTimeout(() => {
            window.location.reload();
        }, 5000); // Wait 5 seconds then reload
    });
}

// Server-Sent Events for real-time deployment notifications
let eventSource;

function initializeDeploymentListener() {
    try {
        eventSource = new EventSource('/deployment-status');
        
        eventSource.onmessage = function(event) {
            if (event.data === 'deployment-complete') {
                showNotification('✅ Deployment complete! Refreshing page...', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else if (event.data === 'deployment-started') {
                showNotification('🚀 Deployment started! Page will refresh automatically when complete.', 'info');
            }
        };

        eventSource.onerror = function(error) {
            // Silently handle connection errors - this is expected when server is down
            console.log('Deployment event source disconnected, will use polling fallback');
            eventSource.close();
        };

        eventSource.onopen = function(event) {
            console.log('Connected to deployment status stream');
        };
    } catch (error) {
        // Fallback to polling if SSE is not supported
        console.log('Server-Sent Events not available, using polling fallback');
    }
}

// Initialize deployment monitoring
initializeDeploymentListener();

// Check every 30 seconds during deployment window (fallback method)
const healthCheckInterval = setInterval(checkForUpdates, 30000);

// Cleanup when page is about to unload
window.addEventListener('beforeunload', function() {
    if (eventSource) {
        eventSource.close();
    }
    clearInterval(healthCheckInterval);
});

// Handle visibility change to reconnect when tab becomes active
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && (!eventSource || eventSource.readyState === EventSource.CLOSED)) {
        // Reconnect to deployment status when tab becomes visible
        setTimeout(initializeDeploymentListener, 1000);
    }
});

});

// Add active state styling for navigation
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--color-primary) !important;
        position: relative;
    }
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--color-primary);
        border-radius: 1px;
    }
    @media (max-width: 768px) {
        .nav-link.active::after {
            display: none;
        }
    }
`;
document.head.appendChild(style);
