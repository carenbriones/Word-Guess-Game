# Word-Guess-Game
Game of hangman created using HTML, CSS, and Javascript

### Gameplay
A series of blanks is displayed on the screen, and each blank represents one letter in a randomly selected word from a word bank. The user has to guess the selected word, one letter at a time. If the user guesses a letter that is present in the word, the corresponding blank(s) will be filled in. If the user guesses a letter that isn't in the word, the user's number of guesses left will be decreased by 1. The game is over when the user either completes the word, which will increase their number of wins by 1, or they run out of guesses, will which decrease their number of losses by 1.

* Note: Pressing the same key more than once only counts as one guess.

* game.js was created without the use of objects, and game2.js was created with the game as an object. game2.js is the file linked to index.html