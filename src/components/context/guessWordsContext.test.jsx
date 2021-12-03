// For the state embedded context.

import { shallow, mount } from "enzyme";
import guessWordsContext from "./guessWordsContext";

const FunctionalComponent = () => {
  guessWordsContext.useGuessWords();
  return <div />;
};

// [Important]
// Once again. useGuessWords and the functional component should not exist independently.
// Instead, they (useGuessWords and the component) must be wrapped in GuessWordsProvider.

test("useGuessWords throws error when not wrapped in GuessWordsProvider", () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow();
});

//
test("useGuessWords does not throw error when wrapped in GuessWordsProvider", () => {
  expect(() => {
    mount(
      <guessWordsContext.GuessWordsProvider>
        <FunctionalComponent />
      </guessWordsContext.GuessWordsProvider>
    );
  }).not.toThrow();
});
