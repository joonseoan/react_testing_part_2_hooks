import { FC } from "react";
import Input from "./Input/Input";
import GuessedWords from "./GuessWord_2/GuessWord";
import Congrats from "./Congrats_1/Congrats";

// interface AppProps {
//   success?: boolean;
//   guessedWords?: { guessedWord: string; letterMatchCount: number }[];
//   secretWord?: string;
// }

const App: FC = () => {
  //TODO: get props from shared state.

  const success = false;
  const secretWord = "party";
  const guessedWords: {}[] = [];

  return (
    <div
      data-test="component-app"
      className="container"
      style={{ textAlign: "center" }}
    >
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input success={success} secretWord={secretWord} />
      <GuessedWords
        guessedWords={guessedWords}

        // guessedWords={[{ guessedWord: "train", letterMatchCount: 3 }]}
      />
    </div>
  );
};

export default App;
