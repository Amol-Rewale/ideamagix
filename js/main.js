const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Smooth scroll to sections
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Only handle hash links (internal sections)
    if (href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update active class
        document.querySelectorAll('.nav-link').forEach(navLink => {
          navLink.classList.remove('active');
        });
        this.classList.add('active');
      }
    }
  });
});

// Update active nav on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Page loader (if you want to keep it)
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 300);
  }
});

// Number Animation on Scroll
function animateNumber(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, 16);
}

// Intersection Observer for triggering animation
const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      
      // Get all stat cards
      const statCards = entry.target.querySelectorAll('.stat-card h3');
      
      statCards.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text);
        stat.textContent = '0+';
        
        // Animate each number
        setTimeout(() => {
          animateNumber(stat, number);
        }, 200);
      });
    }
  });
}, observerOptions);

// Observe the about section
const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
  observer.observe(aboutSection);
}