// This is my API
const jokeApiEndpoint = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=singleLinks"; 

// defning button
const button = document.getElementById('fetch_stuff_btn')

// defining endpoint
let apiEndpoint = jokeApiEndpoint; 

// event listener
document.getElementById('fetch_stuff_btn').addEventListener('click', getQuote);

// function to get the quote and check the log
function getQuote(){
    console.log("Button was clicked, fecthing the stuff...")

    // fetching
    fetch(apiEndpoint)
        .then(response =>{
            if(!response.ok) {
                // errors
                throw new Error("I have failed!!!! Data not fetched!!!") 
            }
            return response.json();
        })
        .then(data => {
            if (apiEndpoint === jokeApiEndpoint){
                if (data.type === 'single'){
                    displayRes(data.joke);
                }
                else {
                    displayRes(`${data.setup} - ${data.delivery}`);
                }
            }
        })
        // error for anything
        .catch(error => {
            console.error("Error:", error)
            alert("Ooops! you fucked up. Try again...or don't")
        })
}

// actually displaying stuff
function displayRes(quote) {
    const quoteDisplay = document.getElementById('quote_display');
    quoteDisplay.textContent = quote;
}