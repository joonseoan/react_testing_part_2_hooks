// Embedded Context

/** Add describe and beforeEach/After */
import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { findByTestAttr } from "../test/testUtil";

import GuessedWords from "./GuessWord_2/GuessWord";
import Congrats from "./Congrats_1/Congrats";
import Input from "./Input/Input";

import successContext from "./context/successContext";
import guessWordsContext from "./context/guessWordsContext";

interface GuessedWord {
  guessedWord: string;
  letterMatchCount: number;
}
interface DefaultState {
  success?: boolean;
  secretWord?: string;
  guessedWords?: GuessedWord[];
}

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {Array} guessedWords guessedWords value specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = ({ secretWord, guessedWords }: DefaultState) => {
  const wrapper = mount(
    <guessWordsContext.GuessWordsProvider>
      <successContext.SuccessProvider>
        <Congrats />
        <Input secretWord={secretWord} />
        <GuessedWords />
      </successContext.SuccessProvider>
    </guessWordsContext.GuessWordsProvider>
  );

  // add value to input box in mount
  const inputBox = findByTestAttr(wrapper, "input-box");
  inputBox.simulate("change", { target: { value: "train " } });

  // simulate click on submit button in mount
  const submitButton = findByTestAttr(wrapper, "submit-button");
  submitButton.simulate("click", { preventDefault() {} });

  // testing event with context in mount!!!
  guessedWords!.forEach(({ guessedWord }: GuessedWord) => {
    const mockEvent = { target: { value: guessedWord } };
    inputBox.simulate("change", mockEvent);
    submitButton.simulate("click", { preventDefault() {} });
  });

  return wrapper;
};

describe.skip("no words guessed", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup({
      secretWord: "party",
      success: false,
      guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
    });
  });

  test("creates GuessedWords table with one row", () => {
    const guessedWordRow = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordRow).toHaveLength(1);
  });
});

describe.skip("some words guessed", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup({
      secretWord: "party",
      success: false,
      // "a" matched in party and agile.
      guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
    });
  });

  test("creates GuessedWords table with one row", () => {
    const guessedWordRow = findByTestAttr(wrapper, "guessed-word");
    // why 2?
    expect(guessedWordRow).toHaveLength(2);
  });
});

describe.skip("guess secret word", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup({
      secretWord: "party",
      success: false,
      // "a" matched in party and agile.
      guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
    });

    const inputBox = findByTestAttr(wrapper, "input-box");
    inputBox.simulate("change", { target: { value: "party" } });

    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click", { preventDefault() {} });
  });

  test("add row to guessedWords table", () => {
    const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordNodes).toHaveLength(3);
  });

  test("displays congrats component", () => {
    const congrats = findByTestAttr(wrapper, "component-congrats");
    expect(congrats.text().length).toBeGreaterThan(0);
  });

  test("does not display input component contents", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");
    expect(inputBox.exists()).toBe(false);

    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.exists()).toBe(false);
  });
});

// ------------------------------------

// /** Functional Test */
// // 1. in put props from the most parents
// // 2, simulate the change
// // 3. use mount(<App />) for the children component test

// import { findByTestAttr } from "../test/testUtil";
// import { mount, ReactWrapper } from "enzyme";
// import App from "./App";

// interface GuessedWord {
//   guessedWord: string;
//   letterMatchCount: number;
// }
// interface DefaultState {
//   success?: boolean;
//   secretWord?: string;
//   guessedWords?: GuessedWord[];
// }

// const setup = ({
//   success = false,
//   secretWord = "",
//   guessedWords = [],
// }: DefaultState) => {
//   // So now we test "guess a word every single time something changes"

//   // @TODO: apply state.
//   const wrapper = mount(<App />);

//   // guessed word
//   const inputBox = findByTestAttr(wrapper, "input-box");
//   inputBox.simulate("change", { target: { value: "train" } });

//   const submitButton = findByTestAttr(wrapper, "submit-button");
//   submitButton.simulate("click", { preventDefault() {} });

//   return wrapper;
// };

// describe.skip("no words guessed", () => {
//   let wrapper: ReactWrapper;

//   beforeEach(() => {
//     wrapper = setup({
//       secretWord: "party",
//       success: false,
//       guessedWords: [],
//     });
//   });

//   test("creates GuessedWords table with one row", () => {
//     const guessedWordRow = findByTestAttr(wrapper, "guessed-word");
//     expect(guessedWordRow).toHaveLength(1);
//   });
// });

// describe.skip("some words guessed", () => {
//   let wrapper: ReactWrapper;

//   beforeEach(() => {
//     wrapper = setup({
//       secretWord: "party",
//       success: false,
//       // "a" matched in party and agile.
//       guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
//     });
//   });

//   test("creates GuessedWords table with one row", () => {
//     const guessedWordRow = findByTestAttr(wrapper, "guessed-word");
//     // why 2?
//     expect(guessedWordRow).toHaveLength(2);
//   });
// });

// describe.skip("guess secret word", () => {
//   let wrapper: ReactWrapper;

//   beforeEach(() => {
//     wrapper = setup({
//       secretWord: "party",
//       success: false,
//       // "a" matched in party and agile.
//       guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
//     });

//     const inputBox = findByTestAttr(wrapper, "input-box");
//     inputBox.simulate("change", { target: { value: "party" } });

//     const submitButton = findByTestAttr(wrapper, "submit-button");
//     submitButton.simulate("click", { preventDefault() {} });
//   });

//   test("add row to guessedWords table", () => {
//     const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
//     expect(guessedWordNodes).toHaveLength(3);
//   });

//   test("displays congrats component", () => {
//     const congrats = findByTestAttr(wrapper, "component-congrats");
//     expect(congrats.text().length).toBeGreaterThan(0);
//   });

//   test("does not display input component contents", () => {
//     const inputBox = findByTestAttr(wrapper, "input-box");
//     expect(inputBox.exists()).toBe(false);

//     const submitButton = findByTestAttr(wrapper, "submit-button");
//     expect(submitButton.exists()).toBe(false);
//   });
// });
