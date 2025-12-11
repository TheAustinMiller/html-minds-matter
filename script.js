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
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, phone, message });

        // Show success message
        const button = contactForm.querySelector('.submit-button');
        const originalText = button.textContent;
        button.textContent = 'Message Sent!';
        button.style.background = '#7fa876';

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
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

/* Buzz words dissolve */
(function() {
    const words = Array.from(document.querySelectorAll(".hero-dynamic-word"));
    const staticText = document.querySelector(".hero-static");
    const wrapper = document.querySelector(".hero-dynamic-wrapper");
    const heroSentence = document.querySelector(".hero-sentence");
    let current = words.findIndex(w => w.classList.contains("active"));
    if (current === -1) current = 0, words[0].classList.add('active');

    // Initialize widths so centering is correct from the start
    function setWidthsForCurrent() {
      const activeWord = words[current];
      // ensure activeWord is in the flow for measurement
      activeWord.style.position = 'absolute';
      // measure widths
      const staticW = Math.ceil(staticText.offsetWidth);
      const dynamicW = Math.ceil(activeWord.offsetWidth);
      // set wrapper width (so absolute-stacked words have container width)
      wrapper.style.width = dynamicW + "px";
      // set the entire sentence width so left:50% transform centers exactly
      heroSentence.style.width = (staticW + dynamicW + 8) + "px"; // + gap
    }

    // safe helper to switch classes and then update measurements
    function updateSentence() {
      const oldWord = words[current];
      oldWord.classList.remove("active");
      oldWord.classList.add("exit");

      // prepare next
      current = (current + 1) % words.length;
      const newWord = words[current];

      // Make sure the new word is measurable before we animate width:
      // temporarily make it visible offscreen for measurement, but keep opacity 0
      newWord.classList.remove('exit');
      newWord.style.opacity = '0';
      newWord.style.transform = 'translateY(8px)';

      // wait for next frame so DOM updates apply
      requestAnimationFrame(() => {
        // measure the new word's width
        const dynamicW = Math.ceil(newWord.offsetWidth);
        const staticW = Math.ceil(staticText.offsetWidth);

        // set wrapper and total widths (they have CSS transitions)
        wrapper.style.width = dynamicW + "px";
        heroSentence.style.width = (staticW + dynamicW + 8) + "px";

        // now fade in the new word and fade out the old one
        // use small timeout to ensure width transition has started (makes it smoother)
        setTimeout(() => {
          // remove exit from old after a short delay so it can animate out
          oldWord.classList.remove('exit');
          oldWord.style.opacity = '';
          oldWord.style.transform = '';

          newWord.classList.add("active");
          // restore inline styles to let CSS transitions handle the entrance
          newWord.style.opacity = '';
          newWord.style.transform = '';
        }, 20);

        // tidy up the previous word after it's finished exiting
        setTimeout(() => {
          oldWord.classList.remove('active');
          oldWord.classList.remove('exit');
        }, 700); // should match CSS transition timings
      });
    }

    // initialize measurements on load
    window.addEventListener('load', setWidthsForCurrent);
    // also recompute on resize so centering remains correct
    window.addEventListener('resize', () => {
      // compute after resize settles
      setTimeout(setWidthsForCurrent, 80);
    });

    // safely start interval (and ensure we set widths first)
    window.addEventListener('load', () => {
      setWidthsForCurrent();
      setInterval(updateSentence, 7000);
    });

    // in case load already fired
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setWidthsForCurrent();
      setInterval(updateSentence, 7000);
    }
  })();