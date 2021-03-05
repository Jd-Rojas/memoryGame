const gameContainer = document.getElementById("game");
let firtsCard = null;
let secondCard = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {

    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  if (noClicking) return;

  // verifies if the current target posses a class of "flipped or no"
  if (e.target.classList.contains("flipped")) return;

  // Set currentCard to be the div that was just got an event trigged 
  let currentCard = e.target;

  // change card background color
  currentCard.style.backgroundColor = currentCard.classList[0];

  // initialize the selected card and add it the class of "flipped" to it 
  if (!firtsCard || !secondCard) {
    currentCard.classList.add("flipped");
    firtsCard = firtsCard || currentCard;
    secondCard = currentCard === firtsCard ? null : currentCard;
  }

  // verified that both the first and second cards had been initialzie
  if (firtsCard && secondCard) {
    noClicking = true;
    
    // debugger
    let firtsPick = firtsCard.className;
    let secondPick = secondCard.className;

// If the cards match they would be safe and remove the events so they won't go back to their original stay
    if (firtsPick === secondPick) {
      cardsFlipped += 2;
      firtsCard.removeEventListener("click", handleCardClick);
      secondCard.removeEventListener("click", handleCardClick);
      firtsCard = null;
      secondCard = null;
      noClicking = false;

      // set timer so the cards will go back to their original state if they dont match
    } else {
      setTimeout(function() {
        firtsCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        firtsCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firtsCard = null;
        secondCard = null;
        noClicking = false;
      },800);
    }
  }

// Validate if all the cards had being flipped and if they are send an alarm and refresh the page
  if (cardsFlipped === COLORS.length) alert("game over!");
}

// when the DOM loads
createDivsForColors(shuffledColors);{ 

}

