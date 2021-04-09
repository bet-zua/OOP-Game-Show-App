/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

/* The Game class starts and ends the game, 
 * handles user interactions, selects a random phrase, checks for winning, 
 * and removes lives from the scoreboard.*/
 class Game {
     constructor(){
        this.missed = 0;
        this.phrases = [
            new Phrase('Head in the clouds'),
            new Phrase ('Out of the blue'),
            new Phrase('Piece of cake'),
            new Phrase('Cool as a cucumber'),
            new Phrase('Hold your horses')];
        this.activePhrase = null;
        this.endGame = false;
     }

    // Hides the screen overlay, selects a phrase, and displays it
     startGame(){
         const overlay = document.getElementById('overlay');
         overlay.style.display = 'none';

         this.activePhrase = this.getRandomPhrase();
         this.activePhrase.addPhraseToDisplay();

        // Cleans up overlay from possible previous game
         overlay.classList.remove('win');
         overlay.classList.remove('lose');
     }

     getRandomPhrase(){
         const randomNumber = Math.floor(Math.random() * 5);
         const newPhrase = this.phrases[randomNumber];
         return newPhrase;
     }

    /* Disables selected letter, changes it's button color and either
     * reveals matching letter(s) or removes a life. */
     handleInteraction(keyClicked){
        // Avoids logging intections after game ends
        if(this.endGame){return false;}

        // Disables selected letter's onscreen button
        keyClicked.disabled = true;
        const selectedLetter = keyClicked.textContent;

        // Handles correct & incorrect guess
        if(this.activePhrase.checkLetter(selectedLetter)){
            keyClicked.classList.add('chosen');
            this.activePhrase.showMatchedLetter(selectedLetter);
            if (this.checkForWin()){
                this.gameOver();
            }
        } else { 
            keyClicked.classList.add('wrong');
            this.removeLife();
        }
     }

     removeLife(){
         const hearts = Array.from(document.getElementsByClassName('tries'));
         const heart = hearts[this.missed].firstElementChild;
         heart.src = 'images/lostHeart.png';

         this.missed += 1;
         if (this.missed >= 5){
             this.gameOver();
         }

     }

     // Checks if all the letters in the active phrase has been revealed
     checkForWin(){
         let youWin = true;
         const lettersInPhrase = Array.from(document.getElementsByClassName('letter'));
         lettersInPhrase.forEach(letter => {
            if(letter.classList.contains('hide')){
                 youWin = false;
            }
         });
         return youWin;
     }

     // Displays game-over screen with a win/loss message and resets the gameboard
     gameOver(){
        // Shows overlay and displays a message
        const overlay = document.getElementById('overlay');
        overlay.style.display = '';
        const endMessage = document.getElementById('game-over-message');
        if(this.checkForWin()){
            endMessage.innerHTML = '🎉 You won! Well done! 🎉';
            overlay.classList.remove('start');
            overlay.classList.add('win');
        } else {
            endMessage.innerHTML = '🥥  Consolation coconut. Try again! 🥥';
            overlay.classList.remove('start');
            overlay.classList.add('lose');
        }

        // Resets  the gameboard
        const phraseSection = document.getElementById('phrase');
        phraseSection.innerHTML = '<ul></ul>';
        const keys = Array.from(document.getElementsByClassName('key'));
        keys.forEach(key => {
            key.disabled = false;
            key.classList.remove('wrong');
            key.classList.remove('chosen');
        });
        const hearts = Array.from(document.getElementsByClassName('tries'));
        hearts.forEach(heart => {
            heart.firstElementChild.src = 'images/liveHeart.png';
        });
        this.endGame=true;
     }
 }