var MAX_GUESSES = 10;
var characters = "abcdefghijklmnopqrstuvwxyz";

var game = {
    // Values that need to be stored in game:
        // wins, losses, guessesLeft, lettersGuessed, correctGuesses
        // wordBank, correctWord
    wins: 0,
    losses: 0,
    guessesLeft: MAX_GUESSES,
    lettersGuessed: [],
    correctGuesses: "",
    wordBank: ["turquoise", "chartreuse", "scarlet", "magenta", "ivory", "sepia", "amber", "mahogany", "fuchsia", "lavender", "mulberry", "cerulean", "sapphire", "ebony", "indigo", "obsidian",],
    correctWord: "",

    //Retrieved from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    chooseRandomWord: function () {
        var result = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
        return result;
    },

    resetGame: function () {
        this.guessesLeft = MAX_GUESSES;
        this.lettersGuessed = [];
        this.correctWord = this.chooseRandomWord();
        this.correctGuesses = this.getWordBlanks(this.correctWord);
        printStats();
    },

    getWordBlanks: function () {
        var x = "";
        for (i = 0; i < this.correctWord.length; i++) {
            x += "_";
        }
        return x;
    },

    fillInBlanks: function (x) {
        for (i = 0; i < this.correctWord.length; i++) {
            if (x === this.correctWord[i]) { // If word contains letter, fill it in
                this.correctGuesses = this.correctGuesses.substring(0, i) + x + this.correctGuesses.substring(i + 1)
            }
        }
    },

    formatCorrectGuesses: function () {
        var x = "";
        for (i = 0; i < this.correctGuesses.length; i++) {
            x += this.correctGuesses[i] + " ";
        }
        return x;
    }
}

window.onload = function () {
    game.correctWord = game.chooseRandomWord();
    game.correctGuesses = game.getWordBlanks(game.correctWord);
    console.log(game.correctGuesses);

    var wordText = document.getElementById("word");
    wordText.innerHTML = game.formatCorrectGuesses(game.correctGuesses);
}

document.onkeyup = function(event){
    var letterGuessed = event.key;

    // If key pressed is a letter
    if (characters.includes(letterGuessed)) {
        // If letter guessed is not in the answer
        if (!game.correctWord.includes(letterGuessed)) {
            // If letter has not been guessed already
            if (game.lettersGuessed.indexOf(letterGuessed) === -1) {
                game.lettersGuessed.push(letterGuessed);
                game.guessesLeft--;
                // If there are no guesses left, user loses
                if (game.guessesLeft === 0) {
                    game.resetGame();
                    game.losses++;
                }
            }
        } else { // If user guesses correct letter, fill in appropriate blanks
            console.log("correct");
            game.fillInBlanks(letterGuessed);
        }
        printStats(letterGuessed);
    }
    if (game.correctGuesses === game.correctWord) { // If user completes the word, increment wins, reset game
        game.wins++;
        game.resetGame();
    }
}

function printStats(keyPressed) {

    var wordText = document.getElementById("word");

    wordText.innerHTML = game.formatCorrectGuesses(game.correctGuesses);

    var winsText = document.getElementById("wins");
    winsText.innerHTML = "Wins: " + game.wins;

    var lossesText = document.getElementById("losses");
    lossesText.innerHTML = "Losses: " + game.losses;

    var guessesLeftText = document.getElementById("guesses-left");
    guessesLeftText.innerHTML = "Guesses left: " + game.guessesLeft;

    var guessesSoFarText = document.getElementById("guesses-so-far");
    guessesSoFarText.innerHTML = "Your guesses so far: " + game.lettersGuessed;

}