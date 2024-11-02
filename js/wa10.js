// 1. COMPLETE VARIABLE AND FUNCTION DEFINITIONS

const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

// 2. RAW TEXT STRINGS

const storyText = 'On a quest to destroy the One Ring, :insertx: journeyed through :inserty:. Suddenly, he encountered :insertz:! With great courage, our hero managed to overcome this challenge and continue on their perilous journey.';

const insertX = ['Frodo Baggins', 'Aragorn the Ranger', 'Gandalf the grey'];
const insertY = ['the mines of Moria', 'the forests of Lothlorien', 'the plains of Rohan'];
const insertZ = ['a fearsome Balrog', 'a horde of Uruk-hai', 'Gollum'];

// 3. EVENT LISTENER AND PARTIAL FUNCTION DEFINITION

randomize.addEventListener('click', result);

function result() {
  let newStory = storyText;

  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  newStory = newStory.replaceAll(':insertx:', xItem);
  newStory = newStory.replace(':inserty:', yItem);
  newStory = newStory.replace(':insertz:', zItem);

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace('our hero', name);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}