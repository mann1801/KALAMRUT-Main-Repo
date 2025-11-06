document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");
  
  // Throttle function for better performance
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  function revealSections() {
    const windowHeight = window.innerHeight;
    const triggerBottom = windowHeight * 0.8; // Trigger when 80% of viewport is reached

      sections.forEach(section => {
      if (!section) return;
      
          const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;

      // Check if section is in viewport
      if (sectionTop < triggerBottom && sectionTop > -sectionHeight) {
              section.classList.add("show");
          }
      });
  }

  // Use throttled version for better performance
  const throttledRevealSections = throttle(revealSections, 100);

  // Initial check
  revealSections();

  // Add scroll listener
  window.addEventListener("scroll", throttledRevealSections);
  
  // Also check on resize
  window.addEventListener("resize", throttledRevealSections);

  // Navbar hide/show functionality
  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");
  
  if (navbar) {
    window.addEventListener("scroll", throttle(function () {
      let scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > 100) {
          navbar.style.top = "-80px";
      } else {
          navbar.style.top = "0";
      }
      lastScrollTop = scrollTop;
    }, 50));
  }
});

