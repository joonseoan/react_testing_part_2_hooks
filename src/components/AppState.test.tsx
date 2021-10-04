import { findByTestAttr } from "../test/testUtil";
import { mount, ReactWrapper } from "enzyme";
import App from "./App";

interface GuessedWord {
  guessedWord: string;
  letterMatchCount: number;
}
interface DefaultState {
  success?: boolean;
  secretWord?: string;
  guessedWords?: GuessedWord[];
}

const setup = ({
  success = false,
  secretWord = "",
  guessedWords = [],
}: DefaultState) => {
  // So now we test "guess a word every single time something changes"

  // @TODO: apply state.
  const wrapper = mount(<App />);

  const inputBox = findByTestAttr(wrapper, "input-box");
  inputBox.simulate("change", { target: { value: "train" } });

  const submitButton = findByTestAttr(wrapper, "submit-button");
  submitButton.simulate("click", { preventDefault() {} });

  return wrapper;
};

describe("no words guessed", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup({
      secretWord: "party",
      guessedWords: [],
      success: false,
    });
  });

  test("creates GuessedWords table with one row", () => {
    console.log("ddd");
  });
});

describe("some words guessed", () => {
  test("a", () => {});
});

describe("guess secret word", () => {
  test("a", () => {});
});
