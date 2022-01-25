/**
 * @method getLetterMatchCount
 * @param {string} Matched word.
 * @param {string} Secret word.
 * @returns {number} - Number of letters matched between guesses word and secret word.
 */
export function getLetterMatchCount(guessWord: string, secretWord: string) {
  const secretLetters = secretWord.split("");
  const guessedLetterSet = new Set(guessWord);
  
  return secretLetters.filter((char) => guessedLetterSet.has(char)).length;
}
