import { FC } from "react";
import Input from "./Input/Input";
import GuessedWords from "./GuessWord_2/GuessWord";
import Congrats from "./Congrats_1/Congrats";

interface AppProps {
  success?: boolean;
  guessedWords?: [];
  secretWord?: string;
}

const App: FC<AppProps> = ({ success, guessedWords, secretWord }) => {
  return (
    <div
      data-test="component-app"
      className="container"
      style={{ textAlign: "center" }}
    >
      <h1>Jotto</h1>
      <Congrats success={success} />
      <GuessedWords
        guessedWords={guessedWords}

        // guessedWords={[{ guessedWord: "train", letterMatchCount: 3 }]}
      />
      <Input success={success} secretWord={secretWord} />
    </div>
  );
};

export default App;
