const MAX_GUESSES = 10;
var characters = "abcdefghijklmnopqrstuvwxyz";
var correctAnswerSound = document.createElement("audio");
correctAnswerSound.setAttribute("src", "assets/Correct-answer.mp3");

// When the window first loads, display blanks for the correct word
window.onload = function () {
    game.resetGame();
}

document.onkeyup = function (event) {
    var letterGuessed = event.key;

    // If key pressed is a letter
    if (characters.includes(letterGuessed)) {

        // If letter guessed is not in the answer
        if (!game.correctWord.color.includes(letterGuessed)) {

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

    // If user completes the word, increment wins, reset game
    if (game.correctGuesses === game.correctWord.color) {
        game.wins++;
        game.resetGame();
        correctAnswerSound.play();
    }
}

// Displays updated stats on the page
function printStats(keyPressed) {
    // Displays blanks for correct word
    var wordText = document.getElementById("word");
    wordText.innerHTML = game.formatCorrectGuesses(game.correctGuesses);

    // Displays wins
    var winsText = document.getElementById("wins");
    winsText.innerHTML = "Wins: " + game.wins;

    // Displays losses
    var lossesText = document.getElementById("losses");
    lossesText.innerHTML = "Losses: " + game.losses;

    // Displays guesses left
    var guessesLeftText = document.getElementById("guesses-left");
    guessesLeftText.innerHTML = "Guesses left: " + game.guessesLeft;

    // Displays guesses so far
    var guessesSoFarText = document.getElementById("guesses-so-far");
    guessesSoFarText.innerHTML = "Your guesses so far: " + game.lettersGuessed;

}

var game = {
    // Values that need to be stored in game:
    // wins, losses, guessesLeft, lettersGuessed, correctGuesses
    // wordBank, correctWord
    wins: 0,
    losses: 0,
    guessesLeft: MAX_GUESSES,
    lettersGuessed: [],
    correctGuesses: "",
    correctWord: "", 
    wordBank:[
        {color: "turquoise", hex: "#8cded1"},
        {color: "chartreuse", hex: "#DFFF00"},
        {color: "scarlet", hex: "#FF2400"},
        {color: "magenta", hex: "#ff00ff"},
        {color: "sepia", hex: "#704214"},
        {color: "amber", hex: "#ffbf00"},
        {color: "mahogany", hex: "#c04000"},
        {color: "lavender", hex: "#e6e6fa"},
        {color: "mulberry", hex: "#c54b8c"},
        {color: "cerulean", hex: "#007ba7"},
        {color: "sapphire", hex: "#0f52ba"},
        {color: "ebony", hex: "#282C34"},
        {color: "indigo", hex: "#4B0082"},
        {color: "obsidian", hex: "#000000"},
        {color: "daffodil", hex: "#ffff31"},
        {color: "tangerine", hex: "#f28500"},
        {color: "rouge", hex: "#a94064"},
        {color: "mauve", hex: "#b784a7"},
        {color: "periwinkle", hex: "#CCCCFF"},
        {color: "amethyst", hex: "#9966cc"},
        {color: "eggplant", hex: "#614051"},
        {color: "cobalt", hex: "#0047ab"},
        {color: "pewter", hex: "#8e9294"}
    ],

    //Retrieved from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    chooseRandomWord: function () {
        var result = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
        return result;
    },

    // Resets game stats to start a new game
    resetGame: function () {
        this.guessesLeft = MAX_GUESSES;
        this.lettersGuessed = [];
        this.correctWord = this.chooseRandomWord();
        this.correctGuesses = this.getWordBlanks(this.correctWord.color);

        // Changes color of card message to color of correct word (as a hint for the user)
        document.getElementById("message").style.color = this.correctWord.hex;
        printStats();
    },

    // Returns string of blanks the length of the correctWord
    getWordBlanks: function () {
        var x = "";
        for (i = 0; i < this.correctWord.color.length; i++) {
            x += "_";
        }
        return x;
    },

    // Fills in the corresponding blanks with the letter entered (x)
    fillInBlanks: function (x) {
        for (i = 0; i < this.correctWord.color.length; i++) {
            if (x === this.correctWord.color[i]) { // If word contains letter, fill it in
                this.correctGuesses = this.correctGuesses.substring(0, i) + x + this.correctGuesses.substring(i + 1)
            }
        }
    },

    // Formats string of blanks with spaces in between
    formatCorrectGuesses: function () {
        var x = "";
        for (i = 0; i < this.correctGuesses.length; i++) {
            x += this.correctGuesses[i] + " ";
        }
        return x;
    }
}