import React, { FC } from 'react';
import PropTypes from 'prop-types';

interface GuessedWord {
  guessedWord: String;
  letterMatchCount: Number;
};
interface GuessedWordsProps {
  guessedWords: GuessedWord [];
};

// any: just for testing. (In reality, typescript should not use propTypes.)
const GuessedWords: FC<GuessedWordsProps | any> = (props) => {
  let contents: JSX.Element;

  console.log('props: ', props);

  if (props.guessedWords.length === 0) {
    contents = (
      <span data-test="guess-instructions">
        Try to guess the correct word!
      </span>
    )
  } else {
    const guessedWordsRows = props.guessedWords.map((word: GuessedWord , index: React.Key) => {
      if (index) {
        return (
          <tr data-test="guessed-word" key={index}>
            <td>{word.guessedWord}</td>
            <td>{word.letterMatchCount}</td>
          </tr>
        );
      } else {
        return null;
      }
    });

    contents = (
      <div data-test="guessed-words">
        <h3>Guessed Words</h3>
        <table>
          <thead>
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