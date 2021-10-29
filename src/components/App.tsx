import { FC, useEffect, useState, useReducer } from "react";
import Input from "./Input/Input";
import GuessedWords from "./GuessWord_2/GuessWord";
import Congrats from "./Congrats_1/Congrats";
import { getSecretWord } from "../actions";

// interface AppProps {
//   success?: boolean;
//   guessedWords?: { guessedWord: string; letterMatchCount: number }[];
//   secretWord?: string;
// }

interface ReducerState {
  secretWord: string;
}

interface Action {
  type: string;
  payload: string;
}

// [important] Reducer example
/**
 * @function reducer to update state, automatically called by dispatch.
 * @param state {object} - previous state
 * @param action {object} - 'type' and 'payload' properties.
 * @param return {object} - new state.
 */
const reducer = (state: ReducerState, action: Action) => {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };

    default:
      throw new Error(`invalid action type: ${action.type}`);
  }
};

const App: FC = () => {
  // // reducer
  const [state, dispatch] = useReducer(reducer, { secretWord: "" });

  // 1) local state
  // const [secretWord, setSecretWord] = useState("");

  // TODO: get props from sharing state.
  const success = false;
  const guessedWords: {}[] = [];

  const setSecretWord = (secretWord: string) => {
    dispatch({ type: "secretWord", payload: secretWord });
  };

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

  const { secretWord } = state || {};

  return (
    <div
      data-test="component-app"
      className="container"
      style={{ textAlign: "center" }}
    >
      <h1>Jotto</h1>
      <Congrats success={success} />{" "}
      <Input success={success} secretWord={secretWord} />
      <GuessedWords
        guessedWords={guessedWords}

        // guessedWords={[{ guessedWord: "train", letterMatchCount: 3 }]}
      />
    </div>
  );
};

export default App;
