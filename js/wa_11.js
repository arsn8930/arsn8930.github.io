document.addEventListener('DOMContentLoaded', () => {
  const thumbBar = document.querySelector('.thumb-bar');
  const displayedImg = document.querySelector('.displayed-img');
  const btn = document.querySelector('.dark');
  const overlay = document.querySelector('.overlay');

  // Array of image filenames
  const images = ['../img/pic1.jpg', '../img/pic2.jpg', '../img/pic3.jpg', '../img/pic4.jpg', '../img/pic5.jpg'];

  // Object with alternative text for each image
  const altTexts = {
    '../img/pic1.jpg': 'My friend Luke',
    '../img/pic2.jpg': 'My friend Anush',
    '../img/pic3.jpg': 'My friend Lennox',
    '../img/pic4.jpg': 'My friend Grace',
    '../img/pic5.jpg': 'Me as a viking'
  };

  // Loop through the images
  images.forEach(image => {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `${image}`);
    newImage.setAttribute('alt', altTexts[image]);
    thumbBar.appendChild(newImage);
    
    // Add click event listener to each thumbnail
    newImage.addEventListener('click', e => {
      displayedImg.src = e.target.src;
      displayedImg.alt = e.target.alt;
    });
  });

  // Darken/Lighten button
  btn.onclick = function() {
    const currentClass = btn.getAttribute('class');
    
    if (currentClass === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Darken effect
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)'; // Remove darken effect
    }
  };
});