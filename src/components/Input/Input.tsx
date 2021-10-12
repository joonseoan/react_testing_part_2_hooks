import React, { FormEvent } from "react";
import PropTypes from "prop-types";

// ?: for now testing with propType.
export interface InputProps {
  success?: boolean;
  secretWord?: string;
}

// React.FC (no destruction) : for now to test
const Input: React.FC<InputProps> = ({ success, secretWord }) => {
  // Must use React.useState without destructuring.
  const [currentGuess, setCurrentGuess] = React.useState<string>("");

  if (success) {
    return <div data-test="component-input" />;
  }

  // Destructuring case
  // const { useState } = React;
  // const [currentGuess_des, setCurrentGuess_des] = useState<string>("");

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();
    setCurrentGuess("");
  };

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
        <button
          data-test="submit-button"
          onClick={handleOnSubmit}
          className="btn btn-primary mb-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
};

export default Input;
