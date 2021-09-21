import Input from "./Input/Input";
import GuessedWords from "./GuessWord_2/GuessWord";
import Congrats from "./Congrats_1/Congrats";

function App() {
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1>Jotto</h1>
      <Congrats success={true} />
      <GuessedWords
        guessedWords={[{ guessedWord: "train", letterMatchCount: 3 }]}
      />
      {/* <Input /> */}
    </div>
  );
}

export default App;
