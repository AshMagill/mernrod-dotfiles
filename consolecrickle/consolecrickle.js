const fs = require("fs");
const readline = require("readline");

// this is the dictionary file path
const dictionaryFilePath = "./Collins Scrabble Words (2019).txt";

// Boats required are set here
const boatsRequired = 1;

// Define the scoring system
// each letter has a point it is worth, this is used to calculate the overall word score
const scoringSystem = {
  A: 1,
  E: 1,
  I: 1,
  O: 1,
  U: 1,
  L: 1,
  N: 1,
  S: 1,
  T: 1,
  R: 1,
  D: 2,
  G: 2,
  B: 3,
  C: 3,
  M: 3,
  P: 3,
  F: 4,
  H: 4,
  V: 4,
  W: 4,
  Y: 4,
  K: 5,
  J: 8,
  X: 8,
  Q: 10,
  Z: 10,
  blank: 0, // Blank Tiles
};

//initialise the rack, bottomRow and topRow to empty, (* means empty)
let rack = ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*"];

let bottomRow = ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*"];

let topRow = ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*"];

// initialise words found, the word, and score
let score = 0;

let wordsFound = 0;

let word = "";

// initialise minutes played (not set up properly yet)

let minutesPlayed = 0;

// Define the letters and their probabilities
// think if it like a bag of scrabble tiles, the more common letters have more tiles in the bag
// the parameter is how many letters you want to draw from the bag
function rackReplace(numLetters) {
  const letters = [
    { letter: "A", probability: 9 },
    { letter: "B", probability: 2 },
    { letter: "C", probability: 2 },
    { letter: "D", probability: 4 },
    { letter: "E", probability: 12 },
    { letter: "F", probability: 2 },
    { letter: "G", probability: 3 },
    { letter: "H", probability: 2 },
    { letter: "I", probability: 9 },
    { letter: "J", probability: 1 },
    { letter: "K", probability: 1 },
    { letter: "L", probability: 4 },
    { letter: "M", probability: 2 },
    { letter: "N", probability: 6 },
    { letter: "O", probability: 8 },
    { letter: "P", probability: 2 },
    { letter: "Q", probability: 1 },
    { letter: "R", probability: 6 },
    { letter: "S", probability: 4 },
    { letter: "T", probability: 6 },
    { letter: "U", probability: 4 },
    { letter: "V", probability: 2 },
    { letter: "W", probability: 2 },
    { letter: "X", probability: 1 },
    { letter: "Y", probability: 2 },
    { letter: "Z", probability: 1 },
  ];

  // Calculate the total probability (sum of all probabilities)
  const totalProbability = letters.reduce(
    (total, letter) => total + letter.probability,
    0
  );

  // Draw the specified number of letters
  const drawnLetters = [];
  for (let i = 0; i < numLetters; i++) {
    // Generate a random number between 1 and the total probability
    const randomNumber = Math.floor(Math.random() * totalProbability) + 1;

    // Find the letter based on the random number and probability distribution
    let cumulativeProbability = 0;
    for (const letter of letters) {
      cumulativeProbability += letter.probability;
      if (randomNumber <= cumulativeProbability) {
        drawnLetters.push(letter.letter);
        break;
      }
    }
  }

  return drawnLetters;
}

// if a word is cancelled, the letters are returned to the rack, and the bottomRow is cleared
function cancelWord(bottomRow, rack) {
  // Iterate backwards through bottomRow to avoid indexing issues after splice
  for (let i = bottomRow.length - 1; i >= 0; i--) {
    if (bottomRow[i] !== "*") {
      // Move the element from bottomRow to rack
      rack.push(bottomRow[i]);
      // Remove the element from bottomRow
      bottomRow.splice(i, 1);
    }
  }
  // Clear the array and fill with "*"
  bottomRow.length = 0;
  for (let i = 0; i < 10; i++) {
    bottomRow.push("*");
  }
}

// this function converts the bottomRow array to a string, and removes the * characters
function processBottomRow(bottomRow) {
  let firstLetterIndex = bottomRow.findIndex((element) => element !== "*");
  let lastLetterIndex = bottomRow.lastIndexOf(
    bottomRow.find((element) => element !== "*")
  );

  // Check if there's a "*" between the first and last letters.
  for (let i = firstLetterIndex; i <= lastLetterIndex; i++) {
    if (bottomRow[i] === "*") {
      console.log(
        "There are '*' characters between letters. Not converting to string."
      );
      return;
    }
  }

  // Convert the array to a string if there are no "*" between the letters.
  let bottomRowString = bottomRow.join("");
  console.log("Converted Array to String:", bottomRowString);
  // Remove all "*" characters
  bottomRowString = bottomRowString.replace(/\*/g, "");
  return bottomRowString;
}

// this function checks for boats (matching letters in the topRow and bottomRow)
function countMatchingLetters(array1, array2) {
  let count = 0;

  // Check if both arrays are of the same length
  if (array1.length !== array2.length) {
    console.log("Arrays are of different lengths.");
    return 0;
  }

  // Iterate through the arrays and count matches
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] === array2[i] && array1[i] !== "*") {
      count++;
    }
  }

  return count;
}

// Check if the character at the specified position is not an asterisk (stop players putting letters where there are letters already)
function hasCharacterAtPosition(bottomRow, position) {
  if (bottomRow[position] !== "*") {
    return true;
  } else return false;
}

// moves the letter from the rack to the bottomRow
function addToBottomRow(rackLetter, bottomRowPosition) {
  bottomRow[bottomRowPosition] = rack.splice(rackLetter, 1)[0];
}

// checks if the word is in the dictionary
function isWordInDictionary(word) {
  if (word.includes(" ")) {
    return false;
  }
  const dictionaryText = fs.readFileSync(dictionaryFilePath, "utf8");
  const isWordInText = dictionaryText.includes(word.toUpperCase());
  return isWordInText;
}

// calculates the score of the word (not working properly yet)
function calculateScore(word) {
  let score = 0;
  for (const letter of word) {
    score += scoringSystem[letter.toUpperCase()] || scoringSystem["blank"];
  }
  return score;
}

// adds the word to the wordsFound array, (not working properly yet)
const wordAdded = () => {
  wordsFound++;
  score += calculateScore(word);
  console.log("");
  console.log(`Current Score: ${score}`);
  console.log("");

  //Replace the used letters in the rack
  rack = rack.filter((letter) => !word.includes(letter));
  const newLetters = rackReplace(3, rack);
  rack = rack.concat(newLetters);

  //Move bottomRow to topRow
  topRow = [...bottomRow];
  bottomRow = new Array(10).fill("0");

  if (wordsFound >= 10) {
    clearInterval(gameInterval);
    console.log("Congratulations! You've completed the game.");
    console.log(`Final Score: ${score}`);
    rl.close();
  } else {
    return;
  }
};

function playCrickleGame() {
  // this populates the rack with 7 letters if the rack is empty (at the start of the game)
  if ((rack = ["*", "*", "*", "*", "*", "*", "*"])) {
    rack = rackReplace(7);
  }

  // this sets up the readline interface ( the console input and output)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // this sets up the game interval (not working properly yet)
  const gameInterval = setInterval(() => {
    minutesPlayed++;
    score -= 10;
  }, 60000);

  // WARNING!!!!!!
  // DONT GET CONFUSED BY THE BOTTOM CODE!!
  // I tried to keep the important stuff (for the app) at the top, and the stuff below this point is mostly for the terminal user interface

  // I imagine that instead of all these horrific if else statememnts, we will be using state, its all hideous, it doesnt matter, dont judge.

  const getNextLetter = () => {
    console.log(`Your rack:      ${rack.join("    ")}`);
    console.log(`Rack index:     0    1    2    3    4    5    6 `);
    console.log("");
    console.log(`Your Score: ${score}`);
    console.log("");
    console.log(`Top row:     ${topRow}`);
    console.log(`Bottom row:  ${bottomRow}`);
    console.log(`Row index:   0,1,2,3,4,5,6,7,8,9`);
    console.log("");
    console.log("'quit' to exit");
    console.log("");
    console.log("'refresh' to refresh the rack (and loose 10 points)");
    console.log("");
    console.log("'submit' to submit the word");
    console.log("");
    console.log("'cancel' to cancel the word");
    console.log("");
    rl.question(
      "Enter a word into the bottom rack by entering the number of the rack letter, followed by the number of the bottomRow where you wish to place it, then press enter: ",

      (letterToAdd) => {
        if (letterToAdd.toLowerCase() === "quit") {
          clearInterval(gameInterval);
          console.log("");
          console.log("Game Over!");
          console.log("");
          console.log(`Final Score: ${score}`);
          console.log("");
          rl.close();
          return;
        }

        if (letterToAdd.toLowerCase() === "refresh") {
          rack = ["0", "0", "0", "0", "0", "0", "0"];
          score = score - 10;
          rackReplace(7);
          console.clear();
          console.log("");
          console.log("You frefreshed your rack and lost 10 points.");
          console.log("");
          getNextLetter();
          return;
        }

        if (letterToAdd.toLowerCase() === "cancel") {
          cancelWord(bottomRow, rack);
          console.clear();
          console.log("");
          console.log("Word cancelled.");
          console.log("");
          getNextLetter();
          return;
        }

        if (
          letterToAdd.toLowerCase() === "submit" &&
          !isWordInDictionary(processBottomRow(bottomRow))
        ) {
          console.clear();
          console.log("");
          console.log(processBottomRow(bottomRow)); // Remove this line
          console.log("Word not found in the dictionary. Try again.");
          console.log("");
          getNextLetter();
          return;
        }

        if (
          letterToAdd.toLowerCase() === "submit" &&
          countMatchingLetters(bottomRow, topRow) <= boatsRequired &&
          topRow.some((element) => element !== "*")
        ) {
          console.clear();
          console.log("");
          console.log("You need more boats!");
          console.log("");
          getNextLetter();
          return;
        }

        if (letterToAdd.toLowerCase() === "submit") {
          console.clear();
          console.log("");
          console.log("Nice Work. Lets go again!");
          console.log("");
          wordAdded();
          getNextLetter();
          return;
        }

        if (
          !letterToAdd ||
          letterToAdd.length > 2 ||
          letterToAdd.includes(" ")
        ) {
          console.clear();
          console.log("");
          console.log("Too many numbers. Try again.");
          console.log("");
          getNextLetter();
          return;
        }

        if (
          !letterToAdd ||
          letterToAdd.length > 2 ||
          letterToAdd.includes(" ")
        ) {
          console.clear();
          console.log("");
          console.log("Not enough numbers. Try again.");
          console.log("");
          getNextLetter();
          return;
        }

        if (letterToAdd.length == 2) {
          let [firstDigit, secondDigit] = String(letterToAdd)
            .split("")
            .map(Number);
          if (hasCharacterAtPosition(bottomRow, secondDigit)) {
            console.clear();
            console.log("");
            console.log("There is already a character at this position!");
            console.log("");
            getNextLetter();
            return;
          }

          addToBottomRow(firstDigit, secondDigit);
          console.log("");
          console.clear();
          console.log("");
          console.log("Letter entered in bottom row, rack updated.");
          console.log("");
          getNextLetter();
          return;
        }

        if (letterToAdd.length == 2) {
          const [firstDigit, secondDigit] = String(letterToAdd)
            .split("")
            .map(Number);
          addToBottomRow(firstDigit, secondDigit);
          console.log("");
          console.clear();
          console.log("");
          console.log("Letter entered in bottom row, rack updated.");
          console.log("");
          getNextLetter();
          return;
        }
        console.clear();
        getNextLetter();
      }
    );
  };
  console.clear();
  getNextLetter();
}

// Start the Crickle game
playCrickleGame();
