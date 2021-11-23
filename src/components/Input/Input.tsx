import React, { FormEvent, useContext, useState } from "react";
import PropTypes from "prop-types";
import stringsModule from "../../helpers/strings";
import languageContext from "../context/languageContext";

// ?: for now testing with propType.
export interface InputProps {
  success?: boolean;
  secretWord?: string;
}

// React.FC (no destruction) : for now to test
const Input: React.FC<InputProps> = ({ success, secretWord }) => {
  const language = useContext<string>(languageContext);
  const [currentGuess, setCurrentGuess] = useState("");

  // Must use React.useState without destructuring.
  // const [inputParams, setInputParameter] = React.useState<{
  //   currentGuess: string;
  //   language: string;
  //   secretWord: string;
  // }>({ currentGuess: "", language, secretWord: "" });

  if (success) {
    return <div data-test="component-input" />;
  }

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={stringsModule.getStringByLanguage(
            language,
            "guessInputPlaceholder"
          )}
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
          {stringsModule.getStringByLanguage(language, "submit")}
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

// need to do test next week.
