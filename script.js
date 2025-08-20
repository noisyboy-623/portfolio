 // Portfolio functionality
        document.addEventListener('DOMContentLoaded', function() {
            const list = document.querySelector('.projects-list');
            const items = list.querySelectorAll('li');
            
            function setActiveItem(targetItem) {
                const index = Array.from(items).indexOf(targetItem);
                
                items.forEach((item, i) => {
                    item.setAttribute('data-active', i === index ? 'true' : 'false');
                });
                
                const columns = Array.from({length: items.length}, (_, i) => 
                    i === index ? '10fr' : '1fr'
                ).join(' ');
                
                list.style.gridTemplateColumns = columns;
            }
            
            items.forEach((item) => {
                item.addEventListener('mouseenter', () => setActiveItem(item));
                item.addEventListener('click', () => setActiveItem(item));
                item.addEventListener('focus', () => setActiveItem(item));
            });
            
            if (items.length > 0) {
                setActiveItem(items[0]);
            }
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navigation background on scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                nav.style.background = 'rgba(10, 10, 10, 0.8)';
            }
        });

        // Acievements carousel functionality

        const achievements = [
            { 
                name: "AI/ML Training Course", 
                org: "Completed a comprehensive training course in AI and ML, gaining knowledge of key concepts, algorithms, and applications.",
                date: "Dec 2024"
            },
            { 
                name: "Data Structures and Algorithms", 
                org: "Completed a foundational course in Data Structures and Algorithms, developing a strong understanding of key concepts, problem-solving techniques, and efficient coding practices.",
                date: "January 2024"
            },
            { 
                name: "AWS Cloud Job Simulation", 
                org: " Completed a real-world cloud simulation involving AWS resource management, S3 usage, and cloud cost analysis.",
                date: "December 2023"
            },
            { 
                name: "Learn Cloud Computing with AWS", 
                org: " Gained foundational knowledge of cloud computing, AWS architecture, and core deployment models.",
                date: "October 2023"
            },
            { 
                name: "Python Using AI Workshop", 
                org: "Completed a workshop on Python and AI, gaining hands-on experience in interactive visualizations, AI-powered debugging, and AI-assisted code generation in Python.",
                date: "August 2023"
            },
            { 
                name: "Figma Bootcamp", 
                org: " Completed an intensive bootcamp focused on UI/UX design using Figma, gaining hands-on experience ",
            },
            { 
                name: "Strategy Formulation and Data Visualization", 
                org: "  Participated in a short-term course focused on strategic thinking and data visualization techniques. ",
            },
            { 
                name: "Networking Basics", 
                org: " Completed foundational training in computer networking concepts, protocols, and infrastructure through Cisco’s official platform. ",
            },
            { 
                name: "Hands-on Tutorial on Cisco Packet Tracer", 
                org: " Attended a practical workshop on simulating network configurations using Cisco Packet Tracer",
            },
            { 
                name: "CODEATHON ", 
                org: "   Awarded for active participation in CODEATHON, part of Phase Shift 2023—an International Level Annual Technical Symposium ",
            },
            { 
                name: "Poster-Making Competition – International Yoga Day 2024", 
                org: " Participated in a poster-making competition celebrating International Yoga Day 2024, organized by the NSS and Youth Red Cross Units.",
            },
        ];

        let currentIndex = 0;
        let isAnimating = false;

        // Get DOM elements
        const cards = document.querySelectorAll(".card");
        const dots = document.querySelectorAll(".dot");
        const achievementName = document.querySelector(".achievement-name");
        const achievementOrg = document.querySelector(".achievement-org");
        const leftArrow = document.querySelector(".nav-arrow.left");
        const rightArrow = document.querySelector(".nav-arrow.right");

        // Enhanced tilt effect
        function addTiltEffect() {
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    if (!card.classList.contains('center')) return;
                    
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / centerY * -8;
                    const rotateY = (x - centerX) / centerX * 8;
                    
                    // Calculate gradient angle based on mouse position
                    const gradientAngle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI + 90;
                    
                    card.style.setProperty('--gradient-angle', `${gradientAngle}deg`);
                    card.style.transform = `scale(1.05) translateZ(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    card.style.transition = 'transform 0.1s ease-out';
                });
                
                card.addEventListener('mouseleave', () => {
                    if (!card.classList.contains('center')) return;
                    
                    card.style.transition = 'transform 0.8s cubic-bezier(0.23, 1, 0.320, 1)';
                    card.style.transform = 'scale(1.05) translateZ(0) rotateX(0deg) rotateY(0deg)';
                    card.style.setProperty('--gradient-angle', '135deg');
                });
            });
        }

        function updateCarousel(newIndex) {
            if (isAnimating) return;
            isAnimating = true;

            currentIndex = (newIndex + cards.length) % cards.length;

            cards.forEach((card, i) => {
                const offset = (i - currentIndex + cards.length) % cards.length;

                card.classList.remove(
                    "center",
                    "left-1",
                    "left-2",
                    "right-1",
                    "right-2",
                    "hidden"
                );

                // Reset transform when changing cards
                card.style.transform = '';

                if (offset === 0) {
                    card.classList.add("center");
                } else if (offset === 1) {
                    card.classList.add("right-1");
                } else if (offset === 2) {
                    card.classList.add("right-2");
                } else if (offset === cards.length - 1) {
                    card.classList.add("left-1");
                } else if (offset === cards.length - 2) {
                    card.classList.add("left-2");
                } else {
                    card.classList.add("hidden");
                }
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === currentIndex);
            });

            achievementName.style.opacity = "0";
            achievementOrg.style.opacity = "0";

            setTimeout(() => {
                achievementName.textContent = achievements[currentIndex].name;
                achievementOrg.textContent = achievements[currentIndex].org;
                achievementName.style.opacity = "1";
                achievementOrg.style.opacity = "1";
            }, 300);

            setTimeout(() => {
                isAnimating = false;
            }, 800);
        }

        // Event listeners
        leftArrow.addEventListener("click", () => {
            updateCarousel(currentIndex - 1);
        });

        rightArrow.addEventListener("click", () => {
            updateCarousel(currentIndex + 1);
        });

        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                updateCarousel(i);
            });
        });

        cards.forEach((card, i) => {
            card.addEventListener("click", () => {
                updateCarousel(i);
            });
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
                updateCarousel(currentIndex - 1);
            } else if (e.key === "ArrowRight") {
                updateCarousel(currentIndex + 1);
            }
        });

        // Touch events
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    updateCarousel(currentIndex + 1);
                } else {
                    updateCarousel(currentIndex - 1);
                }
            }
        }

        // Initialize carousel and tilt effect
        document.addEventListener('DOMContentLoaded', () => {
            updateCarousel(0);
            addTiltEffect();
        });

        /* Hero */

// scroll-hero.js - Add this to your existing script.js or create a new file

// Initialize scroll hero functionality
document.addEventListener('DOMContentLoaded', function() {
  initializeScrollHero();
});

function initializeScrollHero() {
  const heroSection = document.querySelector('.scroll-hero-section');
  if (!heroSection) return;

  const config = {
    theme: 'dark',
    animate: true,
    snap: true,
    start: Math.floor(Math.random() * 101), // Random between 0-100
    end: Math.floor(Math.random() * 101) + 900, // Random between 900-1000
    scroll: true,
    debug: false,
  };

  let items;
  let scrollerScrub;
  let dimmerScrub;
  let chromaEntry;
  let chromaExit;

  const update = () => {
    heroSection.dataset.theme = config.theme;
    heroSection.dataset.syncScrollbar = config.scroll;
    heroSection.dataset.animate = config.animate;
    heroSection.dataset.snap = config.snap;
    heroSection.dataset.debug = config.debug;
    heroSection.style.setProperty('--start-hero', config.start);
    heroSection.style.setProperty('--hue-hero', config.start);
    heroSection.style.setProperty('--end-hero', config.end);

    if (!config.animate) {
      if (chromaEntry?.scrollTrigger) chromaEntry.scrollTrigger.disable(true, false);
      if (chromaExit?.scrollTrigger) chromaExit.scrollTrigger.disable(true, false);
      if (dimmerScrub) dimmerScrub.disable(true, false);
      if (scrollerScrub) scrollerScrub.disable(true, false);
      if (typeof gsap !== 'undefined' && items) {
        gsap.set(items, { opacity: 1 });
        gsap.set(heroSection, { '--chroma-hero': 0 });
      }
    } else {
      if (typeof gsap !== 'undefined' && items) {
        gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) });
        if (dimmerScrub) dimmerScrub.enable(true, true);
        if (scrollerScrub) scrollerScrub.enable(true, true);
        if (chromaEntry?.scrollTrigger) chromaEntry.scrollTrigger.enable(true, true);
        if (chromaExit?.scrollTrigger) chromaExit.scrollTrigger.enable(true, true);
      }
    }
  };

  // Check if CSS scroll-driven animations are supported
  const supportsScrollTimeline = CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)');

  // Fallback to GSAP if CSS scroll-driven animations are not supported
  if (!supportsScrollTimeline && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Get scroll hero list items
    items = gsap.utils.toArray('.scroll-hero-list li');

    if (items.length > 0) {
      gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) });

      const dimmer = gsap
        .timeline()
        .to(items.slice(1), {
          opacity: 1,
          stagger: 0.5,
        })
        .to(
          items.slice(0, items.length - 1),
          {
            opacity: 0.2,
            stagger: 0.5,
          },
          0
        );

      dimmerScrub = ScrollTrigger.create({
        trigger: items[0],
        endTrigger: items[items.length - 1],
        start: 'center center',
        end: 'center center',
        animation: dimmer,
        scrub: 0.2,
      });

      // Color animation for scrollbar
      const scroller = gsap.timeline().fromTo(
        heroSection,
        {
          '--hue-hero': config.start,
        },
        {
          '--hue-hero': config.end,
          ease: 'none',
        }
      );

      scrollerScrub = ScrollTrigger.create({
        trigger: items[0],
        endTrigger: items[items.length - 1],
        start: 'center center',
        end: 'center center',
        animation: scroller,
        scrub: 0.2,
      });

      // Chroma animations
      chromaEntry = gsap.fromTo(
        heroSection,
        {
          '--chroma-hero': 0,
        },
        {
          '--chroma-hero': 0.3,
          ease: 'none',
          scrollTrigger: {
            scrub: 0.2,
            trigger: items[0],
            start: 'center center+=40',
            end: 'center center',
          },
        }
      );

      chromaExit = gsap.fromTo(
        heroSection,
        {
          '--chroma-hero': 0.3,
        },
        {
          '--chroma-hero': 0,
          ease: 'none',
          scrollTrigger: {
            scrub: 0.2,
            trigger: items[items.length - 2],
            start: 'center center',
            end: 'center center-=40',
          },
        }
      );
    }
  }

  // Initialize
  update();

  // Optional: Add keyboard controls for configuration (for development)
  if (config.debug) {
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'a':
          config.animate = !config.animate;
          update();
          console.log('Animation:', config.animate);
          break;
        case 's':
          config.snap = !config.snap;
          update();
          console.log('Snap:', config.snap);
          break;
        case 't':
          config.theme = config.theme === 'dark' ? 'light' : 'dark';
          update();
          console.log('Theme:', config.theme);
          break;
      }
    });
  }
}

// Load GSAP dynamically if not already loaded (optional fallback)
function loadGSAP() {
  if (typeof gsap === 'undefined') {
    const script1 = document.createElement('script');
    script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script1.onload = () => {
      const script2 = document.createElement('script');
      script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      script2.onload = () => {
        initializeScrollHero();
      };
      document.head.appendChild(script2);
    };
    document.head.appendChild(script1);
  }
}

// Uncomment the line below if you want to auto-load GSAP
// loadGSAP();
  
  const heroSplineContainer = document.getElementById('spline-hero');
  let heroSplineLoaded = false;

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !heroSplineLoaded) {
        heroSplineContainer.innerHTML = `
          <spline-viewer class="spline-background"
            url="https://prod.spline.design/Cuo-wIhcrkG3RAah/scene.splinecode">
          </spline-viewer>`;
        heroSplineLoaded = true;
      } else if (!entry.isIntersecting && heroSplineLoaded) {
        heroSplineContainer.innerHTML = ''; // Unload when out of view
        heroSplineLoaded = false;
      }
    });
  }, { threshold: 0.25 });

  heroObserver.observe(document.querySelector('#hero'));

  const splineInAbout = document.querySelector('#spline-about');
  let splineLoaded = false;

  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !splineLoaded) {
        splineInAbout.innerHTML = `
          <spline-viewer 
            class="spline-background"
            url="https://prod.spline.design/0Na5g5yIg6nroc3B/scene.splinecode">
          </spline-viewer>`;
        splineLoaded = true;
      } else if (!entry.isIntersecting && splineLoaded) {
        splineInAbout.innerHTML = ''; // Unload to free GPU
        splineLoaded = false;
      }
    });
  }, { threshold: 0.1 });

  aboutObserver.observe(document.querySelector('#about'));

  // Uncomment the following lines if you want to implement a custom cursor
  // const dot = document.querySelector('.cursor-dot');
  // document.addEventListener('mousemove', (e) => {
  //   dot.style.left = `${e.clientX}px`;
  //   dot.style.top = `${e.clientY}px`;
  // });

// let lastUpdate = 0;
// const delay = 1000 / 60; // max 60fps

// document.addEventListener('mousemove', (e) => {
//   const now = performance.now();
//   if (now - lastUpdate < delay) return;
//   lastUpdate = now;

//   const { clientX: x, clientY: y } = e;

//   dot.style.left = `${x}px`;
//   dot.style.top = `${y}px`;

//   trailX += (x - trailX) * 0.1;
//   trailY += (y - trailY) * 0.1;
//   trail.style.left = `${trailX}px`;
//   trail.style.top = `${trailY}px`;
// });


  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  
  if (window.innerWidth > 768) {
    const splineHero = document.getElementById('spline-hero');
    splineHero.innerHTML = `<spline-viewer class="spline-background" url="https://prod.spline.design/0Na5g5yIg6nroc3B/scene.splinecode"></spline-viewer>`;
  }





