
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
// let slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//     showSlides(slideIndex += n);
// }

// // Thumbnail image controls
// function currentSlide(n) {
//     showSlides(slideIndex = n);
// }

// function showSlides(n) {
//     let i;
//     let slides = document.getElementsByClassName("mySlides");
//     let dots = document.getElementsByClassName("demo");
//     let captionText = document.getElementById("caption");
//     if (n > slides.length) {slideIndex = 1}
//     if (n < 1) {slideIndex = slides.length}
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
//     for (i = 0; i < dots.length; i++) {
//         dots[i].className = dots[i].className.replace(" active", "");
//     }
//     slides[slideIndex-1].style.display = "block";
//     dots[slideIndex-1].className += " active";
//     captionText.innerHTML = dots[slideIndex-1].alt;
// }

// Fetch gallery data and display it
fetch('Personal-Portfolio/portfolio.json')
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
    });

function parseData(portfolio) {
    // Find the gallery section in the HTML
    const gallerySection = document.getElementById('gallery');
    
    // Check if the portfolio object contains the expected structure
    if (!portfolio || !portfolio.galleries) {
        console.error('No galleries data found in portfolio.');
        return;
    }

    // Find the gallery named 'The First Project' (or match based on title if needed)
    const gallery = portfolio.galleries.find(gallery => gallery.title === 'The First Project');
    
    if (!gallery) {
        console.error('Gallery "The First Project" not found.');
        return;
    }

    // Create the gallery title dynamically
    gallerySection.innerHTML = `<h2>${gallery.title}</h2>`;  // Set the gallery title

    // Create the container for the slides
    const slideContainer = document.createElement('div');
    slideContainer.classList.add('gallery-container');

    // Loop through the images and create slides for each
    gallery.images.forEach((image, index) => {
        // Create a div for each slide
        const slide = document.createElement('div');
        slide.classList.add('mySlides');

        // Add the number text (e.g., 1 / 8)
        const numberText = document.createElement('div');
        numberText.classList.add('numbertext');
        numberText.innerText = `${index + 1} / ${gallery.images.length}`;
        slide.appendChild(numberText);

        // Create the image element
        const img = document.createElement('img');
        img.src = image.src; // Assuming 'src' is the path to the image
        img.alt = image.alt || ''; // Fallback to empty alt text if none exists
        img.style.width = '100%';
        slide.appendChild(img);

        // Append the slide to the container
        slideContainer.appendChild(slide);
    });

    // Append the slide container to the gallery section
    gallerySection.appendChild(slideContainer);

    // Add navigation buttons (prev/next)
    addNavigationButtons(gallerySection);

    // Initialize the slides (use the previously created function)
    initializeSlides();
}

// Initialize the slides and slider logic
let slideIndex = 1;

function initializeSlides() {
    showSlides(slideIndex);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Show the current slide
    slides[slideIndex - 1].style.display = "block";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Create prev/next buttons
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

// Call the fetchGalleryData function to load the gallery when the page is ready
fetchGalleryData();
