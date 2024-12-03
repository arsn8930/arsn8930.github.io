
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
        document.execCommand('copy');
        document.getElementById('message').textContent = `${textToCopy} copied to clipboard!`;  // Show success message
    } catch (err) {
        document.getElementById('message').textContent = 'Failed to copy the link.';  // Show error message
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

function fetchGalleryData(){
fetch('portfolio.json')
    .then(response => {
        return response.json();
    })
    .then(portfolio => {
        console.log(portfolio);  // Logs the entire portfolio object to the console
        parseData(portfolio);    // Call the function to handle the data
    })
    .catch(error => {
        console.error("Error fetching portfolio data:", error);
        alert("Couldn't fetch the portfolio. Please try again.");
        throw error;
    });
}

// Handle gallery data
function parseData(portfolio) {
    const gallerySection = document.getElementById('galleryContent');

    // Store all gallery data for easy reference
    const projects = {
        comedy: portfolio.galleries[0].title3,
        starWars: portfolio.galleries[0].title2,
        firstProject: portfolio.galleries[0].title,
    };

    const images = {
        comedy: portfolio.galleries[0].images3,
        starWars: portfolio.galleries[0].images2,
        firstProject: portfolio.galleries[0].images,
    };

    const descriptions = {
        comedy: portfolio.galleries[0].description3,
        starWars: portfolio.galleries[0].description2,
        firstProject: portfolio.galleries[0].description,
    };

    // Add event listeners for the buttons
    document.getElementById('mostRecentBtn').addEventListener('click', () => {
        loadGallery('comedy', projects, images, descriptions, gallerySection);
    });

    document.getElementById('lowLightBtn').addEventListener('click', () => {
        loadGallery('starWars', projects, images, descriptions, gallerySection);
    });

    document.getElementById('portraitBtn').addEventListener('click', () => {
        loadGallery('firstProject', projects, images, descriptions, gallerySection);
    });
}

// Function to load the gallery based on the selected project
function loadGallery(projectType, projects, images, descriptions, gallerySection) {
    // Clear existing gallery content
    gallerySection.innerHTML = '';

    // Set the title of the project
    const title = document.createElement('h3');
    title.textContent = projects[projectType];
    gallerySection.appendChild(title);

    // Add project description (optional)
    const description = document.createElement('p');
    description.textContent = descriptions[projectType][0].p;
    gallerySection.appendChild(description);

    // Create the container for the slides
    const slideContainer = document.createElement('div');
    slideContainer.classList.add('gallerycontainer');

    // Loop through the images and create slides for each
    images[projectType].forEach((image, index) => {
        const slide = document.createElement('div');
        slide.classList.add('mySlides');

        // Add the number text (e.g., 1 / 8)
        const numberText = document.createElement('div');
        numberText.classList.add('numbertext');
        numberText.innerText = `${index + 1} / ${images[projectType].length}`;
        slide.appendChild(numberText);

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt || '';
        slide.appendChild(img);

        slideContainer.appendChild(slide);
    });

    gallerySection.appendChild(slideContainer);

    // Add navigation buttons (previous/next)
    addNavigationButtons(gallerySection);

    // Initialize slides
    initializeSlides();
}

// Initialize the slides for the gallery
let slideIndex = 1;
function initializeSlides() {
    showSlides(slideIndex);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Create prev/next buttons for slide navigation
function addNavigationButtons(gallerySection) {
    const prevButton = document.createElement('a');
    prevButton.classList.add('prev');
    prevButton.innerHTML = '&#10094;';
    prevButton.onclick = () => plusSlides(-1);
    gallerySection.appendChild(prevButton);

    const nextButton = document.createElement('a');
    nextButton.classList.add('next');
    nextButton.innerHTML = '&#10095;';
    nextButton.onclick = () => plusSlides(1);
    gallerySection.appendChild(nextButton);
}