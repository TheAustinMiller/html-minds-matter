// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const primaryNav = document.querySelector('.primary-nav');

hamburger.addEventListener('click', () => {
    primaryNav.classList.toggle('active');

    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (primaryNav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        primaryNav.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Active nav link on scroll
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;

                    navLinks.forEach(link => {
                        link.classList.remove("active");
                        if (link.getAttribute("href") === `#${id}`) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        },
        {
            root: null,
            rootMargin: "0px 0px -60% 0px",
            threshold: 0.25 // adjust sensitivity if needed
        }
    );

    sections.forEach(section => observer.observe(section));
});

// Smooth reveal on scroll for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';

            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards
document.querySelectorAll('.what-card').forEach(card => {
    observer.observe(card);
});

// Observe about section elements
if (document.querySelector('.about-content')) {
    observer.observe(document.querySelector('.about-content'));
}

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    button.textContent = 'Sending...';
    button.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        button.textContent = 'Message Sent!';
        contactForm.reset();
      } else {
        button.textContent = 'Submission Failed';
      }
    } catch (error) {
      button.textContent = 'Submission Failed';
      console.error(error);
    }

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 3000);
  });
}

// Navbar shadow on scroll
const siteHeader = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        siteHeader.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        siteHeader.style.boxShadow = 'none';
    }
});

// CTA Button scroll to contact
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Story Toggle
const storyBtn = document.getElementById("showStoryBtn");
const journeyWrapper = document.getElementById("journeyWrapper");
const journeyItems = document.querySelectorAll(".journey-item");

storyBtn.addEventListener("click", () => {
    const expanding = !journeyWrapper.classList.contains("expanded");

    journeyWrapper.classList.toggle("expanded");

    storyBtn.textContent = expanding ? "Hide Story" : "See My Story";

    if (expanding) {
        journeyItems.forEach((item, i) => {
            setTimeout(() => {
                item.classList.add("visible");
            }, 200 + i * 150);
        });
    } else {
        journeyItems.forEach(item => item.classList.remove("visible"));
    }
});

/* Parallax clouds */
document.addEventListener("scroll", () => {
    const y = window.scrollY;

    const clouds = [
        { el: document.querySelector(".cloud-center-left"), speed: 0.38 },
        { el: document.querySelector(".cloud-top-right"), speed: 0.42 },
        { el: document.querySelector(".cloud-bottom-right"), speed: 0.5 },
        { el: document.querySelector(".cloud-top-left"), speed: 0.45 }
    ];

    clouds.forEach(cloud => {
        if (cloud.el) {
            if(cloud.el.classList.contains('cloud-center-left')) {
                cloud.el.style.transform = `translateY(${y * cloud.speed}px) translateY(-50%)`;
            } else {
                cloud.el.style.transform = `translateY(${y * cloud.speed}px)`;
            }
        }
    });
});