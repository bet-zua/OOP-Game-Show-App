/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

/* This program creates a new instance of the Game class and 
 * adds event listeners for the start button, onscreen keyboard buttons,
 * and keyboard presses */

let game;
// Creates a new Game object when start button is clicked
const startButton = document.getElementById('btn__reset');
startButton.addEventListener('click', (e)=>{
    game = new Game();
    game.startGame();
});
// Handles onscreen keyboard button clicks
const keys = document.getElementById('qwerty');
keys.addEventListener('click', (e) => {
    if(e.target.tagName == 'BUTTON'){
        game.handleInteraction(e.target);
 }
});

/* Extra Credit: 
Lets players use their physical keyboard to enter guesses */
document.addEventListener('keydown', (e) => {
    const letter = e.key.toLowerCase();
    if (letter.match(/[a-z]/i) ){
        // code adapted from https://stackoverflow.com/a/42907920
        for (const button of document.getElementsByClassName('key')){
            if(button.innerHTML === letter){
                game.handleInteraction(button);
            }
        }
    }
});