import { FC } from "react";
// import PropTypes from "prop-types";
import { useContext } from "react";

import languageContext from "../context/languageContext";
import strings from "../../helpers/strings";

/**
 * Congrats message page.
//  * @param {Object} props - React props.
 * @returns {JSX.Element} - rendered component.
 */
const Congrats: FC = () => {
  const success = null;
  const language = useContext<string>(languageContext);

  if (success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {/* By implementing Context */}
          {strings.getStringByLanguage(language, "congrats")}

          {/* Congratulations! You guessed the word! */}
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};

export default Congrats;

// ----------------------------------------------------- [Before Embedded Context, use props] ------------------------------------------
// import { FC } from "react";
// import PropTypes from "prop-types";
// import { useContext } from "react";

// import languageContext from "../context/languageContext";
// import strings from "../../helpers/strings";

// /**
//  * Congrats message page.
//  * @param {Object} props - React props.
//  * @returns {JSX.Element} - rendered component.
//  */
// const Congrats: FC<{ success?: boolean }> = ({ success }) => {
//   const language = useContext<string>(languageContext);

//   if (success) {
//     return (
//       <div data-test="component-congrats" className="alert alert-success">
//         <span data-test="congrats-message">
//           {/* By implementing Context */}
//           {strings.getStringByLanguage(language, "congrats")}

//           {/* Congratulations! You guessed the word! */}
//         </span>
//       </div>
//     );
//   } else {
//     return <div data-test="component-congrats" />;
//   }
// };

// Congrats.propTypes = {
//   // [Important!!!]
//   // 'isRequired' should be here if it wants to get warning!
//   success: PropTypes.bool.isRequired,
// };

// export default Congrats;
