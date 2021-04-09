/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

/* The Phrase class handles the creation of phrases, 
 * checks for & shows matching letters */
  class Phrase {
      constructor(phrase){
        this.phrase = phrase.toLowerCase();
      }

      // Adds letter placeholders to the display when game starts
      addPhraseToDisplay(){
        const phraseSection = document.getElementById('phrase');
        const phraseArr = this.phrase.split(' ');
        // Creates a list of letters, with spaces between each word
        let html = `<ul>`;
        phraseArr.forEach( word => {
            for (let i = 0; i < word.length; i += 1){
                html += 
                `<li class="hide letter ${word.charAt(i)}">${word.charAt(i)}</li>`;
            }
            if (phraseArr.indexOf(word) != phraseArr.length-1){
                html +=`<li class="space"> </li>`;
            }
        });
        html+= `</ul>`;
        phraseSection.innerHTML = html;
      }

      // Checks whether the letter selected by the player matches a letter in the phrase
      checkLetter(letter){
        return this.phrase.includes(letter);
      }
      
      // Reveals the letter(s) on the board that matches the player's selection
      showMatchedLetter(letter){
        const matchingLetters = Array.from(document.getElementsByClassName(letter));
        matchingLetters.forEach(match => {
            match.classList.remove('hide');
            match.classList.add('show');
        });
      }
  }