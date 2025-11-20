// ===================================
// NAVIGATION
// ===================================

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translateY(8px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

// Close mobile menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= (sectionTop - 150)) {
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

// ===================================
// SMOOTH SCROLLING
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// SCROLL ANIMATIONS
// ===================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll('.card, .hero-text, .hero-image, .section-header');
animatedElements.forEach(el => {
  observer.observe(el);
});

// ===================================
// NAVBAR BACKGROUND ON SCROLL
// ===================================

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 14, 26, 0.95)';
    navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.background = 'rgba(10, 14, 26, 0.8)';
    navbar.style.boxShadow = 'none';
  }
});

// ===================================
// FORM HANDLING
// ===================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };
    
    // Get the submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Show success message
      submitBtn.textContent = '✓ Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
      
      // Reset form
      contactForm.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
        submitBtn.style.background = '';
      }, 3000);
      
      // Log form data (for development)
      console.log('Form submitted:', formData);
      
      // TODO: Replace with actual form submission logic
      // Example: Send to email service, backend API, etc.
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
    }, 1500);
  });
}

// ===================================
// SKILL BADGE HOVER EFFECTS
// ===================================

const skillBadges = document.querySelectorAll('.skill-badge');
skillBadges.forEach(badge => {
  badge.addEventListener('mouseenter', () => {
    badge.style.transition = 'all 0.3s ease';
  });
});

// ===================================
// TYPING EFFECT FOR SUBTITLE (Optional Enhancement)
// ===================================

const subtitle = document.querySelector('.hero-text .subtitle');
if (subtitle) {
  const text = subtitle.textContent;
  subtitle.textContent = '';
  let i = 0;
  
  const typeWriter = () => {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  
  // Start typing effect after a short delay
  setTimeout(typeWriter, 500);
}

// ===================================
// PARALLAX EFFECT ON SCROLL (Subtle)
// ===================================

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroImage = document.querySelector('.hero-image');
  
  if (heroImage && window.innerWidth > 768) {
    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ===================================
// LOADING ANIMATION
// ===================================

window.addEventListener('load', () => {
  // Add show class to body to trigger any initial animations
  document.body.classList.add('loaded');
});

// ===================================
// COPY EMAIL ON CLICK (Enhancement)
// ===================================

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const email = link.textContent;
    
    // Copy to clipboard
    navigator.clipboard.writeText(email).then(() => {
      // Show temporary tooltip or notification
      const notification = document.createElement('div');
      notification.textContent = 'Email copied to clipboard!';
      notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }, 2000);
    });
  });
});

// ===================================
// ADD ANIMATION KEYFRAMES DYNAMICALLY
// ===================================

const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===================================
// CONSOLE MESSAGE (Optional Easter Egg)
// ===================================

console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cLooking for a Quality Platform Engineer?', 'font-size: 14px; color: #4facfe;');
console.log('%cLet\'s build something great together!', 'font-size: 14px; color: #00f2fe;');
console.log('%c📧 sangamnath.professional@gmail.com', 'font-size: 14px; color: #43e97b;');
