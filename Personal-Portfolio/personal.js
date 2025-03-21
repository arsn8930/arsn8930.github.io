
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

//Gallery loading 
fetch('portfolio.json')
  .then(response => response.json()) // Parse JSON data
  .then(data => renderGallery(data.imageData)) // Pass imageData to the render function
  .catch(error => console.error('Error loading JSON:', error));

// Function to group images by shoot (alt)
function groupImagesByShoot(imageData) {
  return imageData.reduce((acc, image) => {
    if (!acc[image.alt]) {
      acc[image.alt] = [];
    }
    acc[image.alt].push(image);
    return acc;
  }, {});
}

// Function to render gallery
function renderGallery(imageData) {
  const galleryContainer = document.getElementById('gallery');
  
  // Group images by shoot (alt)
  const groupedImages = groupImagesByShoot(imageData);

  // Loop through grouped images and create elements for each shoot
  Object.keys(groupedImages).forEach(shoot => {
    // Create a section for each shoot
    const shootSection = document.createElement('div');
    shootSection.classList.add('shoot-section');
    
    // Add shoot title
    const shootTitle = document.createElement('h2');
    shootTitle.textContent = shoot;
    shootSection.appendChild(shootTitle);

    // Loop through images in this shoot
    groupedImages[shoot].forEach(image => {
      const galleryItem = document.createElement('div');
      galleryItem.classList.add('gallery-item');

      // Create the image element
      const imageElement = document.createElement('img');
      imageElement.src = image.src;
      imageElement.alt = image.alt; // Add alt text
      galleryItem.appendChild(imageElement);

      // Append the gallery item to the shoot section
      shootSection.appendChild(galleryItem);
    });

    // Append the shoot section to the gallery container
    galleryContainer.appendChild(shootSection);
  });
}
