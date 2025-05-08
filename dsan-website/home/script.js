// document.addEventListener("DOMContentLoaded", function () {
//     const aboutContent = document.querySelector(".about-content");

//     const observer = new IntersectionObserver(
//         (entries) => {
//             entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                     entry.target.classList.add("visible");
//                 }
//             });
//         },
//         { threshold: 0.3 } // Adjusts when animation triggers
//     );

//     observer.observe(aboutContent);
// });

// document.addEventListener("DOMContentLoaded", function () {
//     const timelineItems = document.querySelectorAll(".timeline-item");
//     const timelineLine = document.querySelector(".timeline-line");

//     function handleScroll() {
//         const scrollPos = window.scrollY + window.innerHeight * 0.8;
//         const firstItem = timelineItems[0];
//         const lastItem = timelineItems[timelineItems.length - 1];

//         const firstItemTop = firstItem.offsetTop;
//         const lastItemBottom = lastItem.offsetTop + lastItem.clientHeight;

//         // Calculate the new height based on scroll position
//         let timelineHeight = Math.min(scrollPos - firstItemTop, lastItemBottom - firstItemTop) + lastItem.clientHeight;
//         timelineHeight = Math.max(0, timelineHeight); // Ensure it doesn't go negative

//         // Update the height of the timeline
//         timelineLine.style.height = `${timelineHeight}px`;

//         // **Dynamically update the gradient based on scroll progress**
//         let progress = timelineHeight / (lastItemBottom - firstItemTop);
//         timelineLine.style.background = `linear-gradient(to bottom, #9b4819 ${progress * 100}%, rgba(155, 72, 25, 0) 0%)`;

//         // **Reveal timeline items progressively**
//         timelineItems.forEach(item => {
//             if (item.offsetTop < scrollPos) {
//                 item.classList.add("visible");
//             } else {
//                 item.classList.remove("visible"); // Hide if scrolling back up
//             }
//         });
//     }

//     window.addEventListener("scroll", handleScroll);
//     handleScroll(); // Run once on page load
// });


document.addEventListener("DOMContentLoaded", function () {
    // About section animation
    const aboutContent = document.querySelector(".about-content");
    if (aboutContent) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.3 }
        );
        observer.observe(aboutContent);
    }

    // Timeline animation
    const timelineItems = document.querySelectorAll(".timeline-item");
    const timelineLine = document.querySelector(".timeline-line");
    
    if (timelineItems.length > 0 && timelineLine) {
        // First, set the full height of the timeline immediately
        function initTimeline() {
            const firstItem = timelineItems[0];
            const lastItem = timelineItems[timelineItems.length - 1];
            const firstItemTop = firstItem.getBoundingClientRect().top + window.pageYOffset;
            const lastItemBottom = lastItem.getBoundingClientRect().top + window.pageYOffset + lastItem.offsetHeight;
            const totalDistance = lastItemBottom - firstItemTop;
            
            // Set the full height of the line to the total distance
            timelineLine.style.height = `${totalDistance}px`;
            
            // Initialize with empty fill
            timelineLine.style.background = `linear-gradient(to bottom, 
                #9b4819 0%, 
                rgba(155, 72, 25, 0.3) 0%, 
                rgba(155, 72, 25, 0.3) 100%)`;
        }
        
        function handleScroll() {
            // Get current scroll position with offset
            const scrollPos = window.scrollY + window.innerHeight * 0.7;
            
            // Get timeline bounds
            const firstItem = timelineItems[0];
            const lastItem = timelineItems[timelineItems.length - 1];
            const firstItemTop = firstItem.getBoundingClientRect().top + window.pageYOffset;
            const lastItemBottom = lastItem.getBoundingClientRect().top + window.pageYOffset + lastItem.offsetHeight;
            const timelineStart = firstItemTop;
            const timelineEnd = lastItemBottom;
            const totalDistance = timelineEnd - timelineStart + lastItem.offsetHeight + 50; // Add some extra space for the last item
            
            // Calculate how far we've scrolled through the timeline
            const scrolledDistance = Math.max(0, Math.min(scrollPos - timelineStart, totalDistance));
            const scrollPercentage = (scrolledDistance / totalDistance) * 100;
            
            // Update the fill gradient - now we fill over the light background
            timelineLine.style.background = `linear-gradient(to bottom, 
                #9b4819 ${scrollPercentage}%, 
                rgba(155, 72, 25, 0.3) ${scrollPercentage}%, 
                rgba(155, 72, 25, 0.3) 100%)`;
            
            // Update visibility of timeline items
            timelineItems.forEach(item => {
                const itemTop = item.getBoundingClientRect().top + window.pageYOffset;
                if (scrollPos > itemTop) {
                    item.classList.add("visible");
                } else {
                    item.classList.remove("visible");
                }
            });
        }
        
        // Initialize timeline on load
        setTimeout(initTimeline, 100);
        
        // Add scroll event listener
        window.addEventListener("scroll", handleScroll);
        
        // Initial call to set up the scroll positions
        setTimeout(handleScroll, 200);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Navigation toggle functionality
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a link (for mobile)
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Highlight active section in navigation
    function updateActiveLink() {
        const scrollPosition = window.scrollY;
        
        // Define sections and their corresponding nav links
        const sections = [
            { id: 'about', element: document.querySelector('.about-me') },
            { id: 'projects', element: document.querySelector('.timeline') },
            { id: 'contact', element: document.querySelector('.timeline:last-of-type') }
        ];
        
        // Find the current section
        let currentSection = 'home';
        sections.forEach(section => {
            if (section.element) {
                const sectionTop = section.element.offsetTop - 100;
                if (scrollPosition >= sectionTop) {
                    currentSection = section.id;
                }
            }
        });
        
        // Update active link
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection || 
                (link.getAttribute('href') === '#' && currentSection === 'home')) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
});