// [No destructuring test]
// Must not use "React" when we are using NO destructuring test.
// import React, { FormEvent, useContext, useState } from "react"; -----> React.useState()
// Or otherwise, need to specify React.useState() when we are requiring to specify "React" in import.
import {
  FormEvent,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react"; // -------> useState()

// With Destructuring
// import React, { FormEvent, useContext, useState } from "react";
import PropTypes from "prop-types";
import stringsModule from "../../helpers/strings";
import languageContext from "../context/languageContext";
import successContext from "../context/successContext";

// ?: for now testing with propType.
export interface InputProps {
  success?: boolean;
  secretWord?: string;
}

// React.FC (no destruction) : for now to test
const Input: React.FC<InputProps> = ({
  success: notUsedInEmbeddedContext,
  secretWord,
}) => {
  const language = useContext<string>(languageContext);
  const [success, setSuccess] = successContext.useSuccess();

  // -----------------------------
  const [currentGuess, setCurrentGuess] = useState("");

  // [Really important]
  // Must use React.useState without destructuring. Or, otherwise remove "React" like above.

  // ------------------------------

  if (!success) {
    return <div data-test="component-input" />;
  }

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Fix this one weekends
    // if (currentGuess === secretWord) {
    //   setSuccess(true);
    // }

    setCurrentGuess("");
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
  secretWord: PropTypes.string,
  success: PropTypes.bool,
};

export default Input;
