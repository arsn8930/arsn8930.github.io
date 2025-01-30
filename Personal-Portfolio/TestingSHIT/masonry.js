// Fetch the JSON data
fetch('masonry.json')
  .then(response => response.json()) // Parse JSON data
  .then(data => renderGallery(data.imageData)) // Pass imageData to the render function
  .catch(error => console.error('Error loading JSON:', error));

// Function to render gallery
function renderGallery(imageData) {
  const galleryContainer = document.getElementById('gallery');

  // Loop through image data and create elements for the gallery
  imageData.forEach(image => {
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');

    // Create the image element
    const imageElement = document.createElement('img');
    imageElement.src = image.src;
    imageElement.alt = image.alt; // Add alt text
    galleryItem.appendChild(imageElement);

    // Create a title element (using the alt text)
    const titleElement = document.createElement('h3');
    titleElement.textContent = image.alt;
    galleryItem.appendChild(titleElement);

    // Append the gallery item to the gallery container
    galleryContainer.appendChild(galleryItem);
  });
}
