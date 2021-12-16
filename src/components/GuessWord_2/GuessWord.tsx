// Embedded Context with no props
import { FC, Key, useContext } from "react";

import languageContext from "../context/languageContext";
import guessWordsContext from "../context/guessWordsContext";
import stringModule from "../../helpers/strings";

interface GuessedWord {
  guessedWord: string;
  letterMatchCount: number;
}

// any: just for testing. (In reality, typescript should not use propTypes.)
const GuessedWords: FC = () => {
  const [guessedWords] = guessWordsContext.useGuessWords();
  const language = useContext(languageContext);
  // console.log("guessedWords: ", guessedWords);

  let contents: JSX.Element;

  if (!guessedWords.length) {
    contents = (
      <span data-test="guess-instructions">
        {stringModule.getStringByLanguage(language, "guessPrompt")}
      </span>
    );
  } else {
    let guessedWordsRows: JSX.Element[] | null;

    if (Array.isArray(guessedWords)) {
      guessedWordsRows = guessedWords.map((word: GuessedWord, index: Key) => {
        return (
          <tr data-test="guessed-word" key={index}>
            <td>{word.guessedWord}</td>
            <td>{word.letterMatchCount}</td>
          </tr>
        );
      });
    } else {
      guessedWordsRows = null;
    }

    contents = (
      <div data-test="guessed-words">
        <h3>{stringModule.getStringByLanguage(language, "guessedWords")}</h3>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>
                {stringModule.getStringByLanguage(
                  language,
                  "guessColumnHeader"
                )}
              </th>
              <th>
                {stringModule.getStringByLanguage(
                  language,
                  "matchingLettersColumnHeader"
                )}
              </th>
            </tr>
          </thead>
          {guessedWordsRows}
        </table>
      </div>
    );
  }

  return <div data-test="component-guess-word">{contents}</div>;
};

export default GuessedWords;

// -------------------- With Context API with props----------
// import { FC, Key, useContext } from "react";
// import PropTypes from "prop-types";

// import languageContext from "../context/languageContext";
// import stringModule from "../../helpers/strings";
// interface GuessedWord {
//   guessedWord: string;
//   letterMatchCount: number;
// }

// interface GuessedWordsProps {
//   guessedWords?: GuessedWord[];
//   // success: boolean;
//   // secretWord: string;
// }

// // any: just for testing. (In reality, typescript should not use propTypes.)
// const GuessedWords: FC<GuessedWordsProps | any> = ({ guessedWords = [] }) => {
//   const language = useContext(languageContext);

//   let contents: JSX.Element;

//   if (!guessedWords.length) {
//     contents = (
//       <span data-test="guess-instructions">
//         {stringModule.getStringByLanguage(language, "guessPrompt")}
//       </span>
//     );
//   } else {
//     const guessedWordsRows = guessedWords.map(
//       (word: GuessedWord, index: Key) => {
//         return (
//           <tr data-test="guessed-word" key={index}>
//             <td>{word.guessedWord}</td>
//             <td>{word.letterMatchCount}</td>
//           </tr>
//         );
//       }
//     );

//     contents = (
//       <div data-test="guessed-words">
//         <h3>{stringModule.getStringByLanguage(language, "guessedWords")}</h3>
//         <table className="table table-sm">
//           <thead className="thead-light">
//             <tr>
//               <th>
//                 {stringModule.getStringByLanguage(
//                   language,
//                   "guessColumnHeader"
//                 )}
//               </th>
//               <th>
//                 {stringModule.getStringByLanguage(
//                   language,
//                   "matchingLettersColumnHeader"
//                 )}
//               </th>
//             </tr>
//           </thead>
//           <tbody>{guessedWordsRows}</tbody>
//         </table>
//       </div>
//     );
//   }

//   return <div data-test="component-guess-word">{contents}</div>;
// };

// GuessedWords.propTypes = {
//   guessedWords: PropTypes.arrayOf(
//     PropTypes.shape({
//       guessedWord: PropTypes.string.isRequired,
//       letterMatchCount: PropTypes.number.isRequired,
//     })
//   ).isRequired,
// };

// export default GuessedWords;
