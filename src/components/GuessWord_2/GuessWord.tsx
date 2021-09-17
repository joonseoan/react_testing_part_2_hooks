import React, { FC, Key } from 'react';
import PropTypes from 'prop-types';

interface GuessedWord {
  guessedWord: string,
  letterMatchCount: number,
}

interface GuessedWordsProps {
  guessedWords?: GuessedWord [];
}

// any: just for testing. (In reality, typescript should not use propTypes.)
const GuessedWords: FC<GuessedWordsProps | any> = ({ guessedWords = [] }) => {
  let contents: JSX.Element;

    if (!guessedWords.length) {
      contents = (
        <span data-test="guess-instructions">
          Try to guess the correct word!
        </span>
      )
    } else {
      const guessedWordsRows = guessedWords.map((word: GuessedWord , index: Key) => {
        return (
          <tr data-test="guessed-word" key={index}>
            <td>{word.guessedWord}</td>
            <td>{word.letterMatchCount}</td>
          </tr>
        );
      });
  
      contents = (
        <div data-test="guessed-words">
          <h3>Guessed Words</h3>
          <table className="table table-sm">
            <thead className="thead-light">
              <tr>
                <th>Guess</th><th>Matching Letters</th>
              </tr>
            </thead>
            <tbody>
              {guessedWordsRows}
            </tbody>
          </table>
        </div>
      )
    }
  
  return (
    <div data-test="component-guess-word">
      { contents }
    </div>
  );
}

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default GuessedWords;