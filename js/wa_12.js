// Fetches a random comic between comic 1 and 3000
const button = document.getElementById('load-comic-btn');

//button 
button.addEventListener('click', getRandomComic);

function getRandomComic() {
    const randomComicNumber = Math.floor(Math.random() * 3000) + 1;
    const apiEndpoint = `https://corsproxy.io/?https://xkcd.com/${randomComicNumber}/info.0.json`;

    //fetching api
    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch comic data!");
            }
            return response.json();
        })
        .then(data => {
            //Dom stuff
            updateComicDisplay(data);
        })
        .catch(error => {
            console.error("Error fetching comic:", error);
            alert("Couldn't fetch the comic. Please try again.");
        });
}

function updateComicDisplay(data) {
    //Title updateer
    const comicTitle = document.getElementById('comic-title');
    comicTitle.textContent = data.title;

    //Image updater
    const comicImage = document.getElementById('comic-image');
    comicImage.src = data.img;
    comicImage.alt = data.alt;

    //date updater
    const comicDate = document.getElementById('comic-date');
    comicDate.textContent = `Published on: ${data.date}`;
}
