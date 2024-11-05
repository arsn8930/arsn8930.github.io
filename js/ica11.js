  //fortune
  function tellFortune(children, partner, location, job) {
    const fortune = `You will be a ${job} in ${location}, and married to ${partner} with ${children} kids.`;
    document.getElementById("fortune").innerHTML += `<p>${fortune}</p>`;
}

//called 3 times
tellFortune(2, "Bianca", "Seattle", "developer");
tellFortune(3, "Corderoy", "Los Angeles", "teacher");
tellFortune(1, "Sam", "Chicago", "doctor");

//dog age
function calculateDogAge(dogAge) {
    const dogYears = dogAge * 7;
    const result = `Your dog is ${dogYears} years old in dog years!`;
    document.getElementById("dogAge").innerHTML += `<p>${result}</p>`;
}

//called three times
calculateDogAge(3);
calculateDogAge(2);
calculateDogAge(7);

//Reverse
function reverseNumber(x) {
    const reversed = x.toString().split('').reverse().join('');
    document.getElementById("reverseNumber").innerHTML += `<p>Reversed number: ${reversed}</p>`;
}

//called twice
reverseNumber(32243);
reverseNumber(12345);

//Alphabetical order
function alphabeticalOrder(str) {
    const sortedStr = str.split('').sort().join('');
    document.getElementById("alphabeticalOrder").innerHTML += `<p>Alphabetical order: ${sortedStr}</p>`;
}

//called twice
alphabeticalOrder("formula one driver");
alphabeticalOrder("javascript");

//Capitalize first letter
function capitalizeWords(str) {
    const capitalized = str.replace(/\b\w/g, function(match) {
        return match.toUpperCase();
    });
    document.getElementById("capitalizeWords").innerHTML += `<p>Capitalized words: ${capitalized}</p>`;
}

//called twice
capitalizeWords("I can't really code well");
capitalizeWords("How does the dog talk in family guy, do people ever acknowledge it?");