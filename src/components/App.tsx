import { FC, useEffect, useReducer } from "react";

import Input from "./Input/Input";
import GuessedWords from "./GuessWord_2/GuessWord";
import Congrats from "./Congrats_1/Congrats";
import LanguagePicker from "./LanguagePicker_4/LanguagePicker";

import languageContext from "./context/languageContext";
import { getSecretWord } from "../actions";

// interface AppProps {
//   success?: boolean;
//   guessedWords?: { guessedWord: string; letterMatchCount: number }[];
//   secretWord?: string;
// }

interface ReducerState {
  secretWord: string | null;
  language: string;
}

interface Action {
  type: string;
  payload: string;
}

const defaultState: ReducerState = {
  secretWord: null,
  language: "en",
};

// [important] Reducer example
/**
 * @function reducer to update state, automatically called by dispatch.
 * @param state {object} - previous state
 * @param action {object} - 'type' and 'payload' properties.
 * @param return {object} - new state.
 */
const reducer = (state: ReducerState = defaultState, action: Action) => {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };

    case "setLanguage":
      return { ...state, language: action.payload };

    default:
      return state;
  }
};

const App: FC = () => {
  // // reducer
  const [state, dispatch] = useReducer(reducer, defaultState);

  // 1) local state
  // const [secretWord, setSecretWord] = useState("");

  // TODO: get props from sharing state.
  const success = false;
  const guessedWords: {}[] = [];

  const setSecretWord = (secretWord: string) => {
    dispatch({ type: "setSecretWord", payload: secretWord });
  };

  const setLanguage = (language: string) => {
    dispatch({ type: "setLanguage", payload: language });
  };

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

  if (!state.secretWord) {
    return (
      <div className="spinner" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading....</span>
        </div>
        <div>Loading secret word...</div>
      </div>
    );
  }

  return (
    <div
      data-test="component-app"
      className="container"
      style={{ textAlign: "center" }}
    >
      <h1>Jotto</h1>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <Congrats success={success} />{" "}
        <Input success={success} secretWord={state.secretWord} />
        <GuessedWords guessedWords={guessedWords} />
      </languageContext.Provider>
    </div>
  );
};

export default App;
