import React from "react";
import PropTypes from "prop-types";

// ?: for now testing with propType.
export interface InputProps {
  secretWord?: string;
}

// React.FC (no destruction) : for now to test
const Input: React.FC<InputProps> = ({ secretWord }) => {
  // Must use React.useState without destructuring.
  const [currentGuess, setCurrentGuess] = React.useState<string>("");

  // Destructuring case
  // const { useState } = React;
  // const [currentGuess_des, setCurrentGuess_des] = useState<string>("");

  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder="enter guess"
          value={currentGuess}
          // Destructuring case
          // value={currentGuess_des}
          onChange={(event) => {
            setCurrentGuess(event.target.value);

            // Destructuring case
            // setCurrentGuess_des(event.target.value);
          }}
        />
        <button data-test="submit-button" className="btn btn-primary mb-2">
          Submit
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
