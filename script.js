// Mobile Menu Functionality
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenuBtn = document.querySelector('.close-menu');

// Toggle mobile menu
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu with close button
if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close mobile menu when clicking outside
window.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && !menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on menu item
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Language Toggle
const languageToggle = document.querySelector('.language-toggle');
const englishLang = languageToggle.querySelector('.active-lang');
const urduLang = languageToggle.querySelector('.urdu-lang');

let isEnglish = true;

languageToggle.addEventListener('click', () => {
    isEnglish = !isEnglish;
    if (isEnglish) {
        englishLang.classList.add('active-lang');
        urduLang.classList.remove('active-lang');
    } else {
        englishLang.classList.remove('active-lang');
        urduLang.classList.add('active-lang');
    }
    // Update text content
    document.querySelectorAll('[data-lang]').forEach(element => {
        element.textContent = element.dataset.lang;
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

// Form Submission Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        try {
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show a success message
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            alert('Sorry, there was an error sending your message. Please try again.');
        }
    });
}

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Initialize Animations on Page Load
window.addEventListener('load', () => {
    // Initialize lightGallery
    lightGallery(document.querySelector('.gallery-grid'), {
        selector: '.gallery-item',
        download: false,
        thumbnail: false,
        counter: false,
        share: false
    });

    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
});
