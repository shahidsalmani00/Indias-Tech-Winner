// Enhanced Animation and Interaction
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load hero background image
    const optimizeHeroBackground = () => {
        const heroBackgroundImage = document.querySelector('.background-image');
        if (!heroBackgroundImage) return;
        
        // Check if the browser supports IntersectionObserver
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Set the appropriate background image based on screen size
                        setOptimalBackgroundImage(heroBackgroundImage);
                        
                        // Only observe once
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(heroBackgroundImage);
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            setOptimalBackgroundImage(heroBackgroundImage);
        }
    };
    
    // Function to set the optimal background image based on device
    const setOptimalBackgroundImage = (element) => {
        const width = window.innerWidth;
        const isHighDPI = window.devicePixelRatio > 1.5;
        const baseUrl = 'https://images.unsplash.com/photo-1550645612-83f5d594b671?ixlib=rb-1.2.1&auto=format&fit=crop';
        let imageUrl;
        
        // Determine optimal image size and quality
        if (isHighDPI) {
            if (width <= 576) {
                imageUrl = `${baseUrl}&w=1200&q=75`;
            } else if (width <= 992) {
                imageUrl = `${baseUrl}&w=1800&q=80`;
            } else {
                imageUrl = `${baseUrl}&w=2400&q=90`;
            }
        } else {
            if (width <= 375) {
                imageUrl = `${baseUrl}&w=375&q=70`;
            } else if (width <= 576) {
                imageUrl = `${baseUrl}&w=576&q=70`;
            } else if (width <= 768) {
                imageUrl = `${baseUrl}&w=768&q=75`;
            } else if (width <= 992) {
                imageUrl = `${baseUrl}&w=992&q=75`;
            } else if (width <= 1200) {
                imageUrl = `${baseUrl}&w=1200&q=80`;
            } else if (width <= 1600) {
                imageUrl = `${baseUrl}&w=1600&q=80`;
            } else {
                imageUrl = `${baseUrl}&w=1950&q=80`;
            }
        }
        
        // Create a new image to preload
        const img = new Image();
        img.onload = () => {
            // Once loaded, set the background
            element.style.backgroundImage = `url('${imageUrl}')`;
            element.classList.add('loaded');
        };
        img.src = imageUrl;
        
        // Also handle portrait/landscape orientation
        if (window.innerHeight < 500 && window.innerWidth > window.innerHeight) {
            element.style.backgroundPosition = 'center 30%';
        } else if (width <= 576) {
            element.style.backgroundPosition = '70% center';
        } else if (width <= 768) {
            element.style.backgroundPosition = '65% center';
        } else if (width <= 1200) {
            element.style.backgroundPosition = 'center top';
        } else {
            element.style.backgroundPosition = 'center';
        }
    };
    
    // Update background on resize (with debounce)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const heroBackgroundImage = document.querySelector('.background-image');
            if (heroBackgroundImage) {
                setOptimalBackgroundImage(heroBackgroundImage);
            }
        }, 200);
    });
    
    // Initialize hero background optimization
    optimizeHeroBackground();
    
    // Scroll Animation Handler
    const animateOnScroll = () => {
        const serviceCards = document.querySelectorAll('.service-card');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        // Animate elements when they come into view
        const animateElements = (elements, className) => {
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add(className);
                }
            });
        };
        
        animateElements(serviceCards, 'active');
        animateElements(portfolioItems, 'active');
        animateElements(testimonialCards, 'active');
        
        // Navbar Animation
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    // Run animations on scroll and on page load
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // *** FIXED MOBILE NAVIGATION TOGGLE ***
    console.log('Setting up nav toggle handler');
    
    // Get the navigation elements
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    
    // Setup the toggle behavior
    if (navToggle && navMenu) {
        console.log('Found nav toggle and menu elements');
        
        // Remove any existing event listeners by replacing with clone
        const newToggle = navToggle.cloneNode(true);
        navToggle.parentNode.replaceChild(newToggle, navToggle);
        
        // Function to open mobile menu
        const openMobileMenu = () => {
            newToggle.classList.add('active');
            navMenu.classList.add('active');
            if (mobileNavOverlay) {
                mobileNavOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
            console.log('Mobile menu opened');
        };
        
        // Function to close mobile menu
        const closeMobileMenu = () => {
            newToggle.classList.remove('active');
            navMenu.classList.remove('active');
            if (mobileNavOverlay) {
                mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
            console.log('Mobile menu closed');
        };
        
        // Add click event listener to the new toggle
        newToggle.addEventListener('click', function(e) {
            console.log('Nav toggle clicked');
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle mobile menu
            if (this.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Close menu when clicking overlay
        if (mobileNavOverlay) {
            mobileNavOverlay.addEventListener('click', () => {
                closeMobileMenu();
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            // If the click is outside the toggle button and the menu, and the menu is open
            if (!newToggle.contains(e.target) && 
                !navMenu.contains(e.target) && 
                navMenu.classList.contains('active')) {
                console.log('Closing menu on outside click');
                closeMobileMenu();
            }
        });
        
        // Close menu when a nav link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Nav link clicked, closing menu');
                closeMobileMenu();
            });
        });
    } else {
        console.error('Nav toggle or menu elements not found');
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Portfolio Projects Data
const portfolioProjects = [
    {
        id: 1,
        title: "Luxury E-commerce Platform",
        category: "web",
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800",
        description: "Premium e-commerce platform with AI-powered product recommendations.",
        technologies: ["React", "Node.js", "MongoDB", "AWS", "TensorFlow"]
    },
    {
        id: 2,
        title: "Wellness Mobile App",
        category: "mobile",
        image: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?auto=format&fit=crop&q=80&w=800",
        description: "Health and wellness app with personalized workout plans and nutrition tracking.",
        technologies: ["Flutter", "Firebase", "Google Fit API", "ML Kit"]
    },
    {
        id: 3,
        title: "Enterprise Cloud Solution",
        category: "it",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        description: "Scalable cloud infrastructure with automated deployment and monitoring.",
        technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "Prometheus"]
    },
    {
        id: 4,
        title: "Business Analytics Dashboard",
        category: "web",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        description: "Real-time data visualization with predictive analytics and reporting tools.",
        technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL", "TensorFlow"]
    },
    {
        id: 5,
        title: "Smart City App",
        category: "mobile",
        image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&q=80&w=800",
        description: "IoT-enabled application for monitoring urban infrastructure and services.",
        technologies: ["React Native", "Node.js", "MongoDB", "IoT Sensors", "Google Maps API"]
    },
    {
        id: 6,
        title: "Cybersecurity Suite",
        category: "it",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        description: "Advanced security system with AI-powered threat detection and response.",
        technologies: ["Python", "TensorFlow", "Elasticsearch", "Kibana", "OpenCV"]
    }
];

// Portfolio Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (!portfolioGrid) return;

    // Initialize portfolio with all items
    initPortfolio();
    
    // Check for screen size changes and adjust portfolio layout accordingly
    window.addEventListener('resize', debounce(() => {
        adjustPortfolioForScreenSize();
    }, 250));
    
    // Initial adjustment based on current screen size
    adjustPortfolioForScreenSize();
    
    // Implement keyboard navigation for accessibility
    setupKeyboardNavigation();

    // Filter button click handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items with animation
            filterPortfolioItems(filter);
        });
        
        // Add keyboard accessibility to filter buttons
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });

    // Initialize portfolio
    function initPortfolio() {
        portfolioGrid.innerHTML = '';

        portfolioProjects.forEach((project, index) => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.setAttribute('data-category', project.category);
            portfolioItem.setAttribute('tabindex', '0'); // Make focusable for keyboard navigation
            
            // Use responsive image loading with srcset for different screen sizes
            portfolioItem.innerHTML = `
                <img src="${project.image.replace(/&w=\d+/, '&w=10')}" 
                     srcset="${project.image}&w=400 400w, 
                             ${project.image}&w=600 600w, 
                             ${project.image}&w=800 800w,
                             ${project.image}&w=1200 1200w"
                     sizes="(max-width: 576px) 100vw, 
                            (max-width: 992px) 50vw, 
                            (max-width: 1600px) 33vw,
                            25vw"
                     alt="${project.title}" 
                     loading="lazy" 
                     onerror="this.src='https://via.placeholder.com/600x400?text=Project+Image'">
                <div class="portfolio-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="technology-tags">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                </div>
            `;

            portfolioGrid.appendChild(portfolioItem);
            
            // Add touch support for mobile devices
            if (isTouchDevice()) {
                addTouchSupport(portfolioItem);
            }
            
            // Handle keyboard interaction
            portfolioItem.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    // Show the portfolio info on keyboard interaction
                    const info = portfolioItem.querySelector('.portfolio-info');
                    if (info) {
                        info.style.transform = 'translateY(0)';
                    }
                    portfolioItem.classList.add('keyboard-focus');
                }
            });
            
            // Remove focus styling when blur
            portfolioItem.addEventListener('blur', () => {
                portfolioItem.classList.remove('keyboard-focus');
                // Only return to original state if not on mobile
                if (window.innerWidth > 576) {
                    const info = portfolioItem.querySelector('.portfolio-info');
                    if (info) {
                        info.style.transform = '';
                    }
                }
            });
        });
        
        // Setup lazy loading for images
        setupImagesLoading();
    }

    // Filter portfolio items with animation
    function filterPortfolioItems(filter) {
        const items = document.querySelectorAll('.portfolio-item');
        
        items.forEach(item => {
            const category = item.getAttribute('data-category');
            
            // Remove existing classes first
            item.classList.remove('active');
            item.style.display = 'none';
            
            if (filter === 'all' || filter === category) {
                // Adjust animation timing based on screen size
                const delay = window.innerWidth <= 768 ? 50 : 100;
                
                // Use setTimeout to create staggered animation effect
                setTimeout(() => {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('active');
                    }, 50);
                }, Array.from(items).indexOf(item) * delay);
            }
        });
    }
    
    // Adjust portfolio display based on screen size
    function adjustPortfolioForScreenSize() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const isMobile = window.innerWidth <= 576;
        const isTablet = window.innerWidth <= 992 && window.innerWidth > 576;
        const isDesktop = window.innerWidth > 992;
        const isUltrawide = window.innerWidth >= 1600;
        
        portfolioItems.forEach(item => {
            // For mobile, ensure info is always visible
            if (isMobile) {
                const infoBox = item.querySelector('.portfolio-info');
                if (infoBox) {
                    infoBox.style.transform = 'translateY(0)';
                    infoBox.style.opacity = '1';
                }
            }
            
            // Adjust height based on screen size
            if (window.innerWidth <= 375) {
                item.style.height = '200px';
            } else if (isMobile) {
                item.style.height = '220px';
            } else if (isTablet) {
                item.style.height = '260px';
            } else if (isUltrawide) {
                item.style.height = '350px';
            } else {
                item.style.height = '300px';
            }
            
            // Check if in landscape orientation on mobile
            if (window.innerHeight <= 500 && window.innerWidth > window.innerHeight) {
                item.style.height = '180px';
            }
        });
        
        // Adjust filter buttons for mobile
        const filterButtons = document.querySelectorAll('.filter-btn');
        if (isMobile) {
            filterButtons.forEach(btn => {
                btn.style.width = '100%';
                btn.style.maxWidth = '200px';
            });
        } else {
            filterButtons.forEach(btn => {
                btn.style.width = '';
                btn.style.maxWidth = '';
            });
        }
    }
    
    // Add touch-specific interactions
    function addTouchSupport(item) {
        // Use passive true for better performance where possible
        item.addEventListener('touchstart', function(e) {
            // Only prevent default on non-mobile views where we need to show/hide info
            if (window.innerWidth > 576) {
                e.preventDefault();
                
                const info = this.querySelector('.portfolio-info');
                
                // Toggle info visibility on touch
                if (info) {
                    if (info.style.transform === 'translateY(0px)') {
                        info.style.transform = 'translateY(100%)';
                    } else {
                        info.style.transform = 'translateY(0px)';
                    }
                }
            }
        }, {passive: window.innerWidth <= 576});
        
        // Add swipe support for portfolio items on mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        item.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        item.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe(item);
        }, {passive: true});
        
        function handleSwipe(itemElement) {
            const threshold = 50; // Minimum distance to be considered a swipe
            const filterButtons = document.querySelectorAll('.filter-btn');
            const activeButtonIndex = Array.from(filterButtons).findIndex(btn => btn.classList.contains('active'));
            
            if (touchEndX < touchStartX - threshold) {
                // Swipe left - go to next filter
                const nextIndex = Math.min(activeButtonIndex + 1, filterButtons.length - 1);
                filterButtons[nextIndex].click();
            } else if (touchEndX > touchStartX + threshold) {
                // Swipe right - go to previous filter
                const prevIndex = Math.max(activeButtonIndex - 1, 0);
                filterButtons[prevIndex].click();
            }
        }
    }
    
    // Improve image loading for portfolio items
    function setupImagesLoading() {
        const portfolioImages = document.querySelectorAll('.portfolio-item img');
        
        // Use Intersection Observer to load images only when they are about to enter the viewport
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const srcset = img.getAttribute('data-srcset');
                    const sizes = img.getAttribute('data-sizes');
                    
                    if (srcset) img.srcset = srcset;
                    if (sizes) img.sizes = sizes;
                    
                    // Mark as loaded when image is fully loaded
                    img.onload = () => {
                        img.classList.add('loaded');
                    };
                    
                    // Stop observing after handling
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px', // Start loading 200px before the image enters viewport
            threshold: 0.01
        });
        
        // Start observing each image
        portfolioImages.forEach(img => {
            // Save original srcset in data attribute and remove it to prevent early loading
            if (img.srcset) {
                img.setAttribute('data-srcset', img.srcset);
                img.removeAttribute('srcset');
            }
            
            if (img.sizes) {
                img.setAttribute('data-sizes', img.sizes);
                img.removeAttribute('sizes');
            }
            
            imgObserver.observe(img);
        });
    }
    
    // Helper function to detect touch devices
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }
    
    // Debounce function to limit the rate at which a function can fire
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
    
    // Setup keyboard navigation for the portfolio grid
    function setupKeyboardNavigation() {
        // Add arrow key navigation between portfolio items
        portfolioGrid.addEventListener('keydown', (e) => {
            if (!['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
            
            e.preventDefault();
            
            const items = Array.from(document.querySelectorAll('.portfolio-item:not([style*="display: none"])'));
            if (items.length === 0) return;
            
            const focusedElement = document.activeElement;
            const currentIndex = items.indexOf(focusedElement);
            
            // If no item is focused yet, focus the first one
            if (currentIndex === -1) {
                items[0].focus();
                return;
            }
            
            const columns = getColumnsCount();
            let nextIndex;
            
            switch (e.key) {
                case 'ArrowRight':
                    nextIndex = Math.min(currentIndex + 1, items.length - 1);
                    break;
                case 'ArrowLeft':
                    nextIndex = Math.max(currentIndex - 1, 0);
                    break;
                case 'ArrowDown':
                    nextIndex = Math.min(currentIndex + columns, items.length - 1);
                    break;
                case 'ArrowUp':
                    nextIndex = Math.max(currentIndex - columns, 0);
                    break;
            }
            
            items[nextIndex].focus();
        });
    }
    
    // Get the number of columns in the current grid layout
    function getColumnsCount() {
        const width = window.innerWidth;
        if (width <= 576) return 1;
        if (width <= 768) return 1;
        if (width <= 992) return 2;
        if (width <= 1200) return 2;
        if (width <= 1400) return 3;
        return 3;
    }
});

// Enhanced Testimonials Slider
document.addEventListener('DOMContentLoaded', () => {
    const testimonials = [
        {
            text: "India's Tech Winner delivered an exceptional mobile app that exceeded our expectations. Their team was professional and responsive throughout the entire project.",
            author: "Rajesh Kumar",
            position: "CEO, TechStart India",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
        },
        {
            text: "Outstanding web development service! They transformed our online presence and helped us reach new customers. We saw a 40% increase in engagement after the launch.",
            author: "Priya Sharma",
            position: "Marketing Director, GlobalTech",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
        },
        {
            text: "The IT solutions provided by India's Tech Winner streamlined our operations and increased efficiency by 40%. Their approach to cybersecurity has been particularly impressive.",
            author: "Amit Patel",
            position: "CTO, Innovation Labs",
            image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200"
        }
    ];

    const testimonialContainer = document.querySelector('.testimonials-slider');
    if (!testimonialContainer) return;

    let currentTestimonial = 0;
    let isAnimating = false;

    // Create testimonial dots navigation
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'testimonial-dots';
    
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => {
            if (index !== currentTestimonial && !isAnimating) {
                changeTestimonial(index);
            }
        });
        dotsContainer.appendChild(dot);
    });

    testimonialContainer.parentNode.appendChild(dotsContainer);

    // Initialize first testimonial
    updateTestimonial();

    // Function to update displayed testimonial
    function updateTestimonial() {
        const testimonial = testimonials[currentTestimonial];
        
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        
        testimonialCard.innerHTML = `
            <p>${testimonial.text}</p>
            <div class="testimonial-author">
                <img src="${testimonial.image}" alt="${testimonial.author}" width="50" height="50" style="border-radius: 50%; margin-bottom: 10px;">
                <h4>${testimonial.author}</h4>
                <p>${testimonial.position}</p>
            </div>
        `;

        // Clear and append new testimonial with animation
        testimonialContainer.innerHTML = '';
        testimonialContainer.appendChild(testimonialCard);
        
        // Update active dot
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonial);
        });
        
        // Animate in
        setTimeout(() => {
            testimonialCard.classList.add('active');
        }, 50);
    }

    // Function to change to a specific testimonial
    function changeTestimonial(newIndex) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Animate out current testimonial
        const currentCard = testimonialContainer.querySelector('.testimonial-card');
        currentCard.classList.remove('active');
        
        // After animation out, change to new testimonial
        setTimeout(() => {
            currentTestimonial = newIndex;
            updateTestimonial();
            isAnimating = false;
        }, 500);
    }

    // Auto-change testimonial every 6 seconds
    let intervalId = setInterval(() => {
        const nextIndex = (currentTestimonial + 1) % testimonials.length;
        changeTestimonial(nextIndex);
    }, 6000);

    // Pause auto-change on hover
    testimonialContainer.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
    });

    testimonialContainer.addEventListener('mouseleave', () => {
        intervalId = setInterval(() => {
            const nextIndex = (currentTestimonial + 1) % testimonials.length;
            changeTestimonial(nextIndex);
        }, 6000);
    });
});

// Enhanced Contact Form with Validation and Animation
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isValid = true;
        
        // Reset error states
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        
        // Validate with error animations
        if (name.length < 2) {
            const nameGroup = document.getElementById('name').parentNode;
            nameGroup.classList.add('error');
            showErrorMessage(nameGroup, 'Please enter a valid name');
            isValid = false;
        }
        
        if (!emailRegex.test(email)) {
            const emailGroup = document.getElementById('email').parentNode;
            emailGroup.classList.add('error');
            showErrorMessage(emailGroup, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (message.length < 10) {
            const messageGroup = document.getElementById('message').parentNode;
            messageGroup.classList.add('error');
            showErrorMessage(messageGroup, 'Please enter a message with at least 10 characters');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message with animation
            showSuccessMessage();
            contactForm.reset();
        }
    });
    
    // Function to show error message with animation
    function showErrorMessage(element, message) {
        // Remove any existing error message
        const existingError = element.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create and add new error message with animation
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.opacity = '0';
        errorMessage.style.transform = 'translateY(-10px)';
        errorMessage.style.transition = 'all 0.3s ease';
        
        element.appendChild(errorMessage);
        
        // Trigger animation
        setTimeout(() => {
            errorMessage.style.opacity = '1';
            errorMessage.style.transform = 'translateY(0)';
        }, 10);
    }
    
    // Function to show success message with animation
    function showSuccessMessage() {
        // Remove any existing success message
        const existingSuccess = document.querySelector('.success-message');
        if (existingSuccess) {
            existingSuccess.remove();
        }
        
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-icon">✓</div>
            <div class="success-text">
                <h3>Thank you for your message!</h3>
                <p>We will get back to you as soon as possible.</p>
            </div>
        `;
        
        // Style the success message
        successMessage.style.position = 'absolute';
        successMessage.style.top = '0';
        successMessage.style.left = '0';
        successMessage.style.width = '100%';
        successMessage.style.height = '100%';
        successMessage.style.background = 'rgba(255, 255, 255, 0.95)';
        successMessage.style.display = 'flex';
        successMessage.style.flexDirection = 'column';
        successMessage.style.alignItems = 'center';
        successMessage.style.justifyContent = 'center';
        successMessage.style.borderRadius = '20px';
        successMessage.style.transform = 'scale(0.9)';
        successMessage.style.opacity = '0';
        successMessage.style.transition = 'all 0.4s ease';
        
        // Style the icon
        const successIcon = successMessage.querySelector('.success-icon');
        successIcon.style.width = '70px';
        successIcon.style.height = '70px';
        successIcon.style.background = '#8B4513';
        successIcon.style.borderRadius = '50%';
        successIcon.style.display = 'flex';
        successIcon.style.alignItems = 'center';
        successIcon.style.justifyContent = 'center';
        successIcon.style.color = 'white';
        successIcon.style.fontSize = '2.5rem';
        successIcon.style.marginBottom = '1.5rem';
        
        // Add to form with relative positioning
        contactForm.style.position = 'relative';
        contactForm.appendChild(successMessage);
        
        // Trigger animation
        setTimeout(() => {
            successMessage.style.transform = 'scale(1)';
            successMessage.style.opacity = '1';
        }, 10);
        
        // Remove after 4 seconds
        setTimeout(() => {
            successMessage.style.transform = 'scale(1.1)';
            successMessage.style.opacity = '0';
            
            setTimeout(() => {
                successMessage.remove();
            }, 400);
        }, 4000);
    }
    
    // Add styles for form validation
    const style = document.createElement('style');
    style.textContent = `
        .form-group.error input,
        .form-group.error textarea {
            border-color: #B00020;
            box-shadow: 0 0 0 2px rgba(176, 0, 32, 0.1);
        }
        
        .error-message {
            color: #B00020;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            position: absolute;
        }
    `;
    document.head.appendChild(style);
});

// About Section Tabs
function initAboutTabs() {
    const tabButtons = document.querySelectorAll('.about-tabs .tab-btn');
    const tabPanels = document.querySelectorAll('.about-tabs .tab-panel');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the data-tab attribute value
            const tabId = button.getAttribute('data-tab');
            
            // Hide all tab panels
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Show the corresponding tab panel
            const activePanel = document.getElementById(`${tabId}-panel`);
            if (activePanel) {
                activePanel.classList.add('active');
            }
            
            // Add a subtle animation to the active panel
            if (activePanel) {
                activePanel.style.animation = 'none';
                // Trigger a reflow
                void activePanel.offsetWidth;
                activePanel.style.animation = 'fadeIn 0.5s ease forwards';
            }
        });
    });
}

// Add SVG gradient for circular progress
function addSVGGradient() {
    // Check if gradient already exists to avoid duplicates
    if (document.getElementById('gradient')) return;
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.setAttribute("style", "position: absolute;");
    
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradient.setAttribute("id", "gradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y2", "0%");
    
    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim());
    
    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim());
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    
    document.body.appendChild(svg);
    console.log("SVG gradient created for stats circles");
}

// Initialize all About section features
function initAboutSection() {
    console.log("Initializing About section...");
    try {
        initAboutTabs();
    } catch(e) {
        console.error("Error initializing about tabs:", e);
    }
    
    try {
        addSVGGradient();
    } catch(e) {
        console.error("Error adding SVG gradient:", e);
    }
    
    // Setup animated stats
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.about-stats-wrapper');
    
    if (!statsSection) {
        console.log("Stats section element not found, looking for alternative element");
        // Try alternative selectors
        const alternativeSection = document.querySelector('.stats-container') || 
                                  document.querySelector('.about-content') ||
                                  document.querySelector('#about');
        
        if (alternativeSection) {
            console.log("Found alternative stats container:", alternativeSection);
            setupStatsObserver(alternativeSection, stats);
        } else {
            console.error("No stats container found");
        }
    } else {
        console.log("Stats section found:", statsSection);
        setupStatsObserver(statsSection, stats);
    }
    
    console.log("About section initialization complete");
}

function setupStatsObserver(targetElement, stats) {
    if (!targetElement) {
        console.error("No target element provided for stats observer");
        return;
    }
    
    if (!stats || stats.length === 0) {
        console.log("No stat elements found to animate");
        // Try to find stats again
        stats = document.querySelectorAll('.stat-number');
        if (stats.length === 0) {
            console.error("Still no stat elements found after retry");
            return;
        }
    }
    
    console.log(`Setting up observer for ${stats.length} stat elements`);
    
    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // Approximately 60fps
            let current = 0;
            
            console.log(`Animating stat to ${target}`);
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(timer);
                    stat.textContent = target;
                } else {
                    stat.textContent = Math.round(current);
                }
            }, 16);
        });
    }
    
    // Animate circle progress elements
    const circles = document.querySelectorAll('.circle');
    
    function animateCircles() {
        console.log(`Animating ${circles.length} circles`);
        circles.forEach(circle => {
            // Get the percentage value from the data-count of the corresponding stat
            const statEl = circle.closest('.stat-card').querySelector('.stat-number');
            const percent = circle.getAttribute('stroke-dasharray').split(',')[0].trim();
            
            console.log(`Animating circle to ${percent}%`);
            
            // Apply the animation
            circle.style.strokeDasharray = `0, 100`;
            setTimeout(() => {
                circle.style.strokeDasharray = `${percent}, 100`;
                circle.style.transition = "stroke-dasharray 1.5s ease-out";
            }, 100);
        });
    }
    
    // Use Intersection Observer to trigger animations when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log("Stats section is now visible, triggering animations");
                animateStats();
                animateCircles();
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(targetElement);
    console.log("Stats observer set up successfully");
}

// Enhanced Service Cards Animation
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Staggered animation for service cards
    function animateServiceCards() {
        serviceCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('active');
            }, 100 * index);
        });
    }
    
    // Use Intersection Observer to trigger animations when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateServiceCards();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    const servicesSection = document.querySelector('.services');
    if (servicesSection) {
        observer.observe(servicesSection);
    }
    
    // Add hover interactions
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon i');
        const features = card.querySelector('.service-features');
        
        card.addEventListener('mouseenter', () => {
            // Animate icon
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            
            // Highlight features
            if (features) {
                features.style.background = 'linear-gradient(135deg, rgba(139, 69, 19, 0.08) 0%, rgba(255, 215, 0, 0.08) 100%)';
                
                // Stagger feature animations
                const featureItems = features.querySelectorAll('.feature');
                featureItems.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.style.transform = 'translateX(5px)';
                        feature.style.color = '#333';
                    }, 50 * index);
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset icon
            icon.style.transform = 'none';
            
            // Reset features
            if (features) {
                features.style.background = 'linear-gradient(135deg, rgba(139, 69, 19, 0.03) 0%, rgba(255, 215, 0, 0.03) 100%)';
                
                const featureItems = features.querySelectorAll('.feature');
                featureItems.forEach(feature => {
                    feature.style.transform = 'none';
                    feature.style.color = 'var(--light-text)';
                });
            }
        });
    });
}

// Initialize Testimonial Cards
function initTestimonialCards() {
    const cards = document.querySelectorAll('.testimonial-card');
    
    // Animate cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => observer.observe(card));

    // Add hover effects
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Initialize Contact Section
function initContactSection() {
    const infoCards = document.querySelectorAll('.info-card');
    const contactForm = document.getElementById('contact-form');
    const formWrapper = document.querySelector('.contact-form-wrapper');
    const infoWrapper = document.querySelector('.contact-info-wrapper');
    
    // Animate info cards when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === formWrapper || entry.target === infoWrapper) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, { threshold: 0.2 });
    
    // Set initial styles
    if (formWrapper && infoWrapper) {
        formWrapper.style.opacity = '0';
        formWrapper.style.transform = 'translateY(30px)';
        infoWrapper.style.opacity = '0';
        infoWrapper.style.transform = 'translateY(30px)';
        
        // Add transition
        formWrapper.style.transition = 'all 0.7s ease';
        infoWrapper.style.transition = 'all 0.7s ease';
        
        // Observe elements
        observer.observe(formWrapper);
        observer.observe(infoWrapper);
    }
    
    // Staggered animation for info cards
    if (infoCards.length) {
        infoCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 300 + (index * 150));
        });
    }
    
    // Form validation and submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const formInputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
            
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    highlightField(input, true);
                } else {
                    highlightField(input, false);
                }
                
                // Email validation
                if (input.type === 'email' && input.value) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value)) {
                        valid = false;
                        highlightField(input, true);
                    }
                }
            });
            
            if (valid) {
                // Here you would normally send the form data to a server
                // For now, we'll just show a success message
                showFormMessage(true);
                contactForm.reset();
            } else {
                showFormMessage(false);
            }
        });
        
        // Add input listeners to clear errors on typing
        contactForm.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', function() {
                highlightField(this, false);
            });
        });
    }
    
    // Helper function to highlight invalid fields
    function highlightField(field, isError) {
        const container = field.closest('.input-container');
        if (container) {
            if (isError) {
                container.style.borderColor = '#ff3860';
                container.style.boxShadow = '0 0 0 2px rgba(255, 56, 96, 0.2)';
            } else {
                container.style.borderColor = '';
                container.style.boxShadow = '';
            }
        }
    }
    
    // Helper function to show form submission messages
    function showFormMessage(isSuccess) {
        // Remove any existing message
        const oldMessage = document.querySelector('.form-message');
        if (oldMessage) {
            oldMessage.remove();
        }
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = 'form-message';
        messageEl.style.padding = '1rem';
        messageEl.style.marginTop = '1rem';
        messageEl.style.borderRadius = '10px';
        messageEl.style.animation = 'fadeIn 0.5s forwards';
        
        if (isSuccess) {
            messageEl.textContent = 'Thank you! Your message has been sent successfully.';
            messageEl.style.backgroundColor = 'rgba(72, 187, 120, 0.1)';
            messageEl.style.color = '#38a169';
        } else {
            messageEl.textContent = 'Please fill in all required fields correctly.';
            messageEl.style.backgroundColor = 'rgba(255, 56, 96, 0.1)';
            messageEl.style.color = '#ff3860';
        }
        
        // Add message to form
        contactForm.appendChild(messageEl);
        
        // Remove message after 5 seconds if it's a success
        if (isSuccess) {
            setTimeout(() => {
                messageEl.style.animation = 'fadeOut 0.5s forwards';
                setTimeout(() => {
                    messageEl.remove();
                }, 500);
            }, 5000);
        }
    }
}

// Footer Animations
function initFooterAnimations() {
    // Animate footer columns and elements on scroll using Intersection Observer
    const footerElements = [
        '.footer-brand',
        '.footer-links',
        '.footer-newsletter',
        '.footer-middle .badges',
        '.footer-bottom'
    ];

    // Set initial styles
    footerElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    });

    // Use Intersection Observer to animate elements when they come into view
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a slight delay before starting animation
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                // If it's the links section, add staggered animation to items
                if (entry.target.classList.contains('footer-links')) {
                    const columns = entry.target.querySelectorAll('.footer-column');
                    columns.forEach((column, index) => {
                        setTimeout(() => {
                            column.style.opacity = '1';
                            column.style.transform = 'translateY(0)';
                        }, 150 * (index + 1));
                    });
                }
                
                // If it's the badges section, add staggered animation to badges
                if (entry.target.classList.contains('badges')) {
                    const badges = entry.target.querySelectorAll('.badge');
                    badges.forEach((badge, index) => {
                        setTimeout(() => {
                            badge.style.opacity = '1';
                            badge.style.transform = 'translateY(0)';
                            badge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        }, 150 * (index + 1));
                    });
                }
                
                // Unobserve once animation is done
                footerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe all footer elements
    footerElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => footerObserver.observe(el));
    });

    // Back to top button functionality
    const backToTopBtn = document.querySelector('.back-to-top a');
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });

        // Smooth scroll to top on click
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Newsletter form functionality
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.validity.valid) {
                // Create success message element if it doesn't exist
                let successMsg = newsletterForm.querySelector('.newsletter-success');
                if (!successMsg) {
                    successMsg = document.createElement('div');
                    successMsg.className = 'newsletter-success';
                    successMsg.style.color = '#2ecc71';
                    successMsg.style.marginTop = '10px';
                    successMsg.style.fontSize = '0.9rem';
                    successMsg.style.fontWeight = '500';
                    newsletterForm.appendChild(successMsg);
                }
                
                // Show success message
                successMsg.textContent = 'Thank you! You have been subscribed successfully.';
                successMsg.style.opacity = '1';
                
                // Clear input
                emailInput.value = '';
                
                // Hide message after a few seconds
                setTimeout(() => {
                    successMsg.style.opacity = '0';
                    setTimeout(() => {
                        successMsg.textContent = '';
                    }, 300);
                }, 3000);
            }
        });
    }
}

// Add more missing function stubs to avoid errors
function initPortfolioFilters() {
    console.log("Portfolio filters initialized");
    // The portfolio filter functionality is already handled in the DOMContentLoaded event above
}

function initBlogMasonry() {
    console.log("Blog masonry initialized");
    // Implementation would go here if there was a blog section with masonry layout
}

function initScrollToTop() {
    console.log("Scroll to top initialized");
    // This functionality is already handled in the initFooterAnimations function
}

function initContactForm() {
    console.log("Contact form initialized");
    // This functionality is already handled in the contactForm event listener above
}

// Add more missing function stubs to avoid errors
function initHeaderAnimations() {
    console.log("Header animations initialized");
    // Header animations are already handled in the scroll event listener
    
    // Re-implement the header scroll functionality that was removed
    const header = document.querySelector('.header');
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let isHeaderVisible = true;
    
    // Handle scroll events
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add or remove scrolled class
        if (scrollTop > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show header based on scroll direction (only when scrolled down enough)
        if (scrollTop > 150) {
            if (scrollTop > lastScrollTop && isHeaderVisible) {
                // Scrolling down, hide header
                header.style.transform = 'translateY(-100%)';
                isHeaderVisible = false;
            } else if (scrollTop < lastScrollTop && !isHeaderVisible) {
                // Scrolling up, show header
                header.style.transform = 'translateY(0)';
                isHeaderVisible = true;
            }
        } else {
            // At the top, always show header
            header.style.transform = 'translateY(0)';
            isHeaderVisible = true;
        }
        
        lastScrollTop = scrollTop;
    });
}

function initTeamAnimations() {
    console.log("Team animations initialized");
    // Implementation would go here for team section animations
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded - Initializing all components");
    
    // Initialize all components
    initAboutSection();
    initPortfolioFilters();
    initBlogMasonry();
    initScrollToTop();
    initContactForm();
    initHeaderAnimations();
    initTeamAnimations();
    initFooterAnimations();
    
    // Log initialization complete
    console.log("All components initialized");
}); 