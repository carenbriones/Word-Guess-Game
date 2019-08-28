// var listener = new window.keypress.Listener();

var wins = 0;
var losses = 0;
const maxGuesses = 10;
var guessesLeft = maxGuesses;
var lettersGuessed = [];

var keyPressed = KeyboardEvent;
var wordBank = ["hello", "goodbye", "adios", "hola"];
var characters = "abcdefghijklmnopqrstuvwxyz";
var correctWord = chooseRandomWord();
var correctGuesses;

document.addEventListener('keypress', guessLetter);

function guessLetter(keyPressed) {
    var letterGuessed = keyPressed.key;
    console.log(correctWord);

    // Only runs if a letter key is pressed
    if (characters.includes(letterGuessed)) {
        // If letter guessed is not in the answer
        if (!correctWord.includes(letterGuessed)) {

            // If letter has not been guessed already
            if (lettersGuessed.indexOf(letterGuessed) === -1) {
                lettersGuessed.push(letterGuessed);
                guessesLeft--;

                // If there are no guesses left, user loses
                if (guessesLeft === 0) {
                    resetGame();
                    losses++;
                }
            }
        } else { // If user guesses correct letter, fill in appropriate blanks
            // console.log("correct");
            fillInBlanks(letterGuessed, correctWord);
        }
        printStats();
    }
    if (correctGuesses === correctWord){ // If user completes the word, increment wins, reset game
        wins++;
        resetGame();
        correctGuesses = getWordBlanks(correctWord);
        printStats();
    }
}

function printStats() {

    var wordText = document.getElementById("word");
    var letter = keyPressed.key;

    // console.log(correctGuesses);
    wordText.innerHTML = formatCorrectGuesses(correctGuesses);

    var winsText = document.getElementById("wins");
    winsText.innerHTML = "Wins: " + wins;

    var lossesText = document.getElementById("losses");
    lossesText.innerHTML = "Losses: " + losses;

    var guessesLeftText = document.getElementById("guesses-left");
    guessesLeftText.innerHTML = "Guesses left: " + guessesLeft;

    var guessesSoFarText = document.getElementById("guesses-so-far");
    guessesSoFarText.innerHTML = "Your guesses so far: " + lettersGuessed;

}

//Retrieved from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function chooseRandomWord() {
    var result = wordBank[Math.floor(Math.random() * wordBank.length)];
    return result;
}

function resetGame() {
    guessesLeft = maxGuesses;
    lettersGuessed = [];
    correctWord = chooseRandomWord();
}

function getWordBlanks(word) {
    var x = "";
    for (i = 0; i < word.length; i++) {
        x += "_";
    }
    return x;
}

function fillInBlanks(x, word){
    for (i = 0; i < word.length; i++){
        if (x === word[i]){ // If word contains letter, fill it in
            console.log("correct");
            // correctGuesses[i] = x;
            correctGuesses = correctGuesses.substring(0, i) + x + correctGuesses.substring(i + 1)
        }
    }
}

function formatCorrectGuesses(correctGuesses){
    var x = "";
    for (i = 0; i < correctGuesses.length; i++) {
        x += correctGuesses[i] + " ";
    }
    return x;
}

// Adds blanks to page after loading
window.onload = function () {
    correctGuesses = getWordBlanks(correctWord);

    var wordText = document.getElementById("word");
    wordText.innerHTML = formatCorrectGuesses(correctGuesses);    
};

