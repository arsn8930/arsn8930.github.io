var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

const copyLink1 = document.getElementById('copyLink1');
const message = document.getElementById('message');

//This copies the dropdown text for the contact menu
// Check if the current page is not the gallery page
if (!window.location.pathname.includes('gallery.html')) {
    // Only add the event listeners if we're not on the gallery page
    const copyPhone = document.getElementById('copyPhone');
    const copyEmail = document.getElementById('copyEmail');

    if (copyPhone) {
        copyPhone.addEventListener('click', copyText);
    }

    if (copyEmail) {
        copyEmail.addEventListener('click', copyText);
    }
} else {
    // Log or alert if the code is running on the gallery page
    console.log("Copy text functionality is disabled on the gallery page.");
}

// Function to copy the text (unchanged)
function copyText(event) {
    event.preventDefault();  // Prevent the default behavior (navigation)

    const link = event.target;  // Get the clicked link
    const textToCopy = link.textContent || link.innerText;  // Get the text content
    // Create a temporary input element to copy the text
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = textToCopy;  // Set the value to the link's text
    tempInput.select();  // Select the text in the input

    try {
        // Try to copy the text to the clipboard
        document.execCommand('copy'); //not sure why this is crossed out??****

        //this will enable the message
        dropdownMessage.textContent = `${textToCopy} copied to clipboard!`;
        dropdownMessage.style.backgroundColor = '#4CAF50';  // Green for success
        dropdownMessage.style.display = 'block';  // Make it visible

        // Hide the message after 3 seconds
        setTimeout(() => {
        dropdownMessage.style.display = 'none';
        }, 3000);

    }catch (err) {
        // Show error dropdown message
        const dropdownMessage = document.getElementById('dropdownMessage');
        dropdownMessage.textContent = 'Failed to copy the text.';
        dropdownMessage.style.backgroundColor = '#f44336';  // Red for error
        dropdownMessage.style.display = 'block';  // Make it visible

        // Hide the message after 3 seconds
        setTimeout(() => {
            dropdownMessage.style.display = 'none';
        }, 3000);
    }
    
    // Remove the temporary input element after copying
    document.body.removeChild(tempInput);
}
// Fetch gallery data and display it

// Check if the current page is the gallery page before fetching the data
if (window.location.pathname.includes('gallery.html')) {
    // Only fetch gallery data if we are on the gallery page
    fetchGalleryData();
} else {
    console.log("Not on the gallery page, skipping JSON fetch.");
}

function fetchGalleryData() {
    fetch('portfolio.json')
        .then(response => {
            return response.json();
        })
        .then(portfolio => {
            console.log(portfolio);  // Logs the entire portfolio object to the console
            parseData(portfolio);    // Call the function 
        })
        .catch(error => {
            console.error("Error fetching portfolio data:", error);
            alert("Couldn't fetch the portfolio. Please try again.");
            throw error;
        });
}

let isSortedAsc = true; // Track sorting order (ascending or descending)

function parseData(portfolio) {
    const gallerySection = document.getElementById('gallerycontainer');
    const buttonsContainer = document.getElementById('gallery-buttons');

    if (!portfolio || !portfolio.galleries || !portfolio.galleries.length) {
        console.error('Portfolio JSON missing or malformed');
        return;
    }

    const galleryObj = portfolio.galleries[0];

    // Collect projects by checking keys: title, title2, title3, ...
    const suffixes = ['', '2', '3', '4', '5', '6', '7']; // extend if needed
    const projects = [];

    suffixes.forEach(suf => {
        const tKey = 'title' + suf;
        const imgsKey = 'images' + suf;
        const descKey = 'description' + suf;
        const dateKey = 'date' + suf;

        if (galleryObj[tKey]) {
            projects.push({
                title: galleryObj[tKey],
                date: galleryObj[dateKey] || '',
                images: galleryObj[imgsKey] || [],
                description: (galleryObj[descKey] && galleryObj[descKey][0] && galleryObj[descKey][0].p) ? galleryObj[descKey][0].p : ''
            });
        }
    });

    // Hide gallery content until a button is clicked
    if (gallerySection) {
        gallerySection.classList.remove('visible');
        gallerySection.innerHTML = ''; // ensure empty
    }

    // Build filter buttons dynamically (replace any existing content)
    if (buttonsContainer) {
        buttonsContainer.innerHTML = ''; // clear old buttons
        projects.forEach((proj, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'gallery-filter-btn';
            btn.textContent = proj.title;
            btn.addEventListener('click', () => {
                // mark active button
                buttonsContainer.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // load and show selected project
                loadGallery(proj, gallerySection);
            });
            buttonsContainer.appendChild(btn);
        });
    } else {
        console.warn('#gallery-buttons not found — buttons will not be created.');
    }

    // Do NOT auto-load any gallery — user must click a button
}

// Function to load the gallery in a masonry layout (accepts a project object)
function loadGallery(project, gallerySection) {
    if (!gallerySection) {
        console.error('Gallery container not found');
        return;
    }

    // Make gallery visible
    gallerySection.classList.add('visible');

    // Clear existing gallery content
    gallerySection.innerHTML = '';

    // Optional title (uncomment if you want to show)
    // if (project.title) {
    //     const titleEl = document.createElement('h3');
    //     titleEl.textContent = project.title;
    //     gallerySection.appendChild(titleEl);
    // }

    // Description
    if (project.description) {
        const descEl = document.createElement('p');
        descEl.textContent = project.description;
        gallerySection.appendChild(descEl);
    }

    // Create masonry container
    const masonry = document.createElement('div');
    masonry.className = 'gallery-masonry';

    // Add images (project.images is expected to be an array of {src, alt})
    project.images.forEach((imgObj) => {
        const item = document.createElement('div');
        item.className = 'gallery-masonry-item';

        const img = document.createElement('img');
        img.src = imgObj.src;
        img.alt = imgObj.alt || '';

        item.appendChild(img);
        masonry.appendChild(item);
    });

    gallerySection.appendChild(masonry);
}

// Back to Top Button functionality
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    // Show button when scrolled down
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    });

    // Scroll to top on click
    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Hide initially
    btn.style.display = 'none';
});

// Contact form AJAX submission and success message
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const successMsg = document.getElementById('success-message');
    if (contactForm && successMsg) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    contactForm.reset();
                    successMsg.style.display = 'block';
                    successMsg.textContent = 'You successfully submitted the contact form!';
                } else {
                    successMsg.style.display = 'block';
                    successMsg.textContent = 'There was a problem sending your message.';
                }
            })
            .catch(() => {
                successMsg.style.display = 'block';
                successMsg.textContent = 'There was a problem sending your message.';
            });
        });
    }
});

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-menu');
    const navUl = document.querySelector('nav ul');

    if (hamburger && navUl) {
        // Ensure menu is collapsed on load
        navUl.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');

        hamburger.addEventListener('click', function(e) {
            const isShown = navUl.classList.toggle('show');
            hamburger.setAttribute('aria-expanded', String(isShown));
            e.stopPropagation();
        });

        // Hide menu when a link is clicked (for better UX)
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navUl.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close when clicking outside the nav
        document.addEventListener('click', (e) => {
            if (!navUl.contains(e.target) && !hamburger.contains(e.target)) {
                navUl.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                navUl.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });

        // On resize, collapse menu if switching to larger viewport
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navUl.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// Testimonials slider functionality (replaced to generate dots to match testimonial count)
const testimonials = [
    {
        text: "Ari is professional, consistent, and has an incredible ability to capture genuine emotion and deliver stunning photos fast. He is also extremely respectful of peoples comfortability with having their photos taken at events, and always works with the flow of programs.",
        author: "— Shira Finke."
    },
    {
        text: "Ari knew exactly what he was doing when it came to posing and lighting. Our pictures came out incredible!",
        author: "— Rosie Benenson."
    },
    {
        text: "Great quality of photos! Ari was very professional and easy to work with. He made sure to capture all the important moments and people at my party. Highly recommend!",
        author: "— Haven Harris"
    }
];

let index = 0;
const textEl = document.getElementById("testimonial-text");
const authorEl = document.getElementById("testimonial-author");
const testimonialBox = document.querySelector(".testimonial");
const dotsContainer = document.querySelector(".testimonial-dots");

// Build dot controls to match number of testimonials
let dots = [];
if (dotsContainer) {
    dotsContainer.innerHTML = ''; // clear any existing
    testimonials.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
        dotsContainer.appendChild(dot);
    });
    dots = Array.from(dotsContainer.querySelectorAll('.dot'));
}

// Show a testimonial by index
function showTestimonial(i) {
    if (!testimonialBox) return;
    testimonialBox.classList.remove("show");

    setTimeout(() => {
        if (textEl) textEl.textContent = testimonials[i].text || '';
        if (authorEl) authorEl.textContent = testimonials[i].author || '';

        testimonialBox.classList.add("show");

        if (dots.length) {
            dots.forEach((dot, idx) => dot.classList.toggle("active", idx === i));
        }
    }, 300);
}

function nextTestimonial() {
    index = (index + 1) % testimonials.length;
    showTestimonial(index);
}

// Wire up dot clicks (if dots exist)
if (dots.length) {
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            index = i;
            showTestimonial(index);
        });
    });
}

// Initialize slider (only if DOM elements exist)
if (testimonials.length) {
    showTestimonial(index);
    if (testimonials.length > 1) {
        setInterval(nextTestimonial, 8000);
    }
}
