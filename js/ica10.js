document.addEventListener('DOMContentLoaded', function() {

    //reference to the html elements
    const heading = document.getElementById('mainHeading');
    const colorBtn = document.getElementById('colorBtn');
    const fontBtn = document.getElementById('fontBtn');

    //Array of colors and fonts
    const colors = ['red', 'blue', 'green', 'purple', 'orange'];
    const fonts = ['Arial', 'Playball', 'Helvetica', 'Times New Roman', 'Courier'];

    //Changing the color
    function changeColor() {
        const randomColor = colors[Math.floor(Math.random() * colors.length)]; //random color
        heading.style.color = randomColor; //Applying the color
    }

    //Changing the heading
    function changeFont() {
        const randomFont = fonts[Math.floor(Math.random() * fonts.length)]; //random selection
        heading.style.fontFamily = randomFont; //applying
    }

    //event listener for click
    colorBtn.addEventListener('click', changeColor);
    fontBtn.addEventListener('click', changeFont);
});