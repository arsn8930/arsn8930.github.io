const thumbBar = document.querySelector('.thumb-bar');
const displayedImg = document.querySelector('.displayed-img');
const btn = document.querySelector('.dark');
const overlay = document.querySelector('.overlay');

// Array of image filenames
const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

// Object with alternative text for each image
const altTexts = {
  'pic1.jpg': 'My friend Luke',
  'pic2.jpg': 'My friend Anush',
  'pic3.jpg': 'My friend Lennox',
  'pic4.jpg': 'My friend Grace',
  'pic5.jpg': 'Me as a viking'
};

// Loop through the images
images.forEach(image => {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `img${image}`);
  newImage.setAttribute('alt', altTexts[image]);
  thumbBar.appendChild(newImage);
  
  // Add click event listener to each thumbnail
  newImage.addEventListener('click', e => {
    displayedImg.src = e.target.src;
    displayedImg.alt = e.target.alt;
  });
});

// Darken/Lighten button
btn.addEventListener('click', () => {
  const currentClass = btn.getAttribute('class');
  if (currentClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
});