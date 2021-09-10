import { FC } from 'react';
import PropTypes from 'prop-types';

interface GuessedWordsProps {
  guessedWords: { guessedWord: String, letterMatchCount: Number } [];
}

// any: just for testing. (In reality, typescript should not use propTypes.)
const GuessedWords: FC<GuessedWordsProps | any> = (props) => {
  let contents: JSX.Element;

  if (props.guessedWords.length === 0) {
    contents = (
      <span data-test="guess-instructions">
        Try to guess the correct word!
      </span>
    )
  } else {
    contents = <div />;
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