import { FC } from "react";
import PropTypes from "prop-types";

/**
 * Congrats message page.
 * @param {Object} props - React props.
 * @returns {JSX.Element} - rendered component.
 */
const Congrats: FC<{ success?: boolean }> = ({ success }) => {
  if (success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          Congratulations! You guessed the word!
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};

Congrats.propTypes = {
  // [Important!!!]
  // 'isRequired' should be here if it wants to get warning!
  success: PropTypes.bool.isRequired,
};

export default Congrats;
