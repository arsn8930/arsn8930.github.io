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

    // Store all gallery data for easy reference
    const projects = {
        comedy: portfolio.galleries[0].title3,
        starWars: portfolio.galleries[0].title2,
        firstProject: portfolio.galleries[0].title,
        event1: portfolio.galleries[0].title4,
        event2: portfolio.galleries[0].title5,
        engagement1: portfolio.galleries[0].title6,
    };

    const images = {
        comedy: portfolio.galleries[0].images3,
        starWars: portfolio.galleries[0].images2,
        firstProject: portfolio.galleries[0].images,
        event1: portfolio.galleries[0].images4,
        event2: portfolio.galleries[0].images5,
        engagement1: portfolio.galleries[0].images6,
    };

    const descriptions = {
        comedy: portfolio.galleries[0].description3,
        starWars: portfolio.galleries[0].description2,
        firstProject: portfolio.galleries[0].description,
        event1: portfolio.galleries[0].description4,
        event2: portfolio.galleries[0].description5,
        engagement1: portfolio.galleries[0].description6,
    };

    // Add event listeners for the project buttons
    document.getElementById('mostRecentBtn').addEventListener('click', () => {
        loadGallery('comedy', projects, images, descriptions, gallerySection);
    });

    document.getElementById('lowLightBtn').addEventListener('click', () => {
        loadGallery('starWars', projects, images, descriptions, gallerySection);
    });

    document.getElementById('portraitBtn').addEventListener('click', () => {
        loadGallery('firstProject', projects, images, descriptions, gallerySection);
    });

    document.getElementById('Event1Btn').addEventListener('click', () => {
        loadGallery('event1', projects, images, descriptions, gallerySection);
    });

    document.getElementById('Event2Btn').addEventListener('click', () => {
        loadGallery('event2', projects, images, descriptions, gallerySection);
    });

    document.getElementById('Engagement1Btn').addEventListener('click', () => {
        loadGallery('engagement1', projects, images, descriptions, gallerySection);
    });
}

// Function to load the gallery in a masonry layout
function loadGallery(projectType, projects, images, descriptions, gallerySection) {
    // Clear existing gallery content
    gallerySection.innerHTML = '';

    // Set the title of the project
    const title = document.createElement('h3');
    title.textContent = projects[projectType];
    gallerySection.appendChild(title);

    // Add project description
    const description = document.createElement('p');
    description.textContent = descriptions[projectType][0].p;
    gallerySection.appendChild(description);

    // Create the masonry container
    const masonry = document.createElement('div');
    masonry.className = 'gallery-masonry';

    // Loop through the images and create masonry items
    images[projectType].forEach((image) => {
        const item = document.createElement('div');
        item.className = 'gallery-masonry-item';

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt || '';

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
        hamburger.addEventListener('click', function() {
            navUl.classList.toggle('show');
        });

        // Optional: Hide menu when a link is clicked (for better UX)
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navUl.classList.remove('show');
            });
        });
    }
});