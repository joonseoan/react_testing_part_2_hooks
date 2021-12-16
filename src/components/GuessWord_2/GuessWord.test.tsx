// ------------------------- With Embedded Context --------------------------------

/** Add describe and beforeEach/After */
import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { findByTestAttr, checkProps } from "../../test/testUtil";
import GuessedWords from "./GuessWord";

import guessWordsContext from "../context/guessWordsContext";

// [important]
// [ Embedded Context - Mock custom hook : mock return value sets context value]
// pros: 1) isolate unit test
// 2) does not rely on other functionality
// 3) can use shallow (isolate from child components)
// cons
// 1) need to export / import context object. otherwise mock won't work.
/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {Array} guessedWords guessedWords value specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (guessedWords = []) => {
  // Value and SetterMock [Important!!]
  // on the guessWordContext, the array will return [value, setter]
  const mockUseGuessedWords = jest
    .fn()
    .mockReturnValue([guessedWords, jest.fn]);
  guessWordsContext.useGuessWords = mockUseGuessedWords;

  return shallow(<GuessedWords />);
};

describe("if there are not words guessed", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup([]);
  });

  test("renders without error", () => {
    const component = findByTestAttr(wrapper, "component-guess-word");
    expect(component.length).toBe(1);
  });

  test("renders instructions to guess a word", () => {
    const instructions = findByTestAttr(wrapper, "guess-instructions");
    expect(instructions.text().length).not.toBe(0);
  });
});

describe("if there are words guessed", () => {
  let wrapper: ShallowWrapper;

  const guessedWords = [
    { guessedWord: "train", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 1 },
    { guessedWord: "party", letterMatchCount: 5 },
  ];

  beforeEach(() => {
    // for a while.
    wrapper = setup(guessedWords as []);
  });

  test("renders without error", () => {
    const component = findByTestAttr(wrapper, "component-guess-word");
    expect(component.length).toBe(1);
  });

  test('renders "guessed words" section', () => {
    const guessedWordNode = findByTestAttr(wrapper, "guessed-words");
    expect(guessedWordNode.length).toBe(1);
  });

  test("correct number of guessed words", () => {
    const guessedWordsNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordsNodes.length).toBe(guessedWords.length);
  });
});

// [ Context ]
// Context Receiver Test without Provider by using mock
describe("languagePicker", () => {
  test("correctly renders guess instructions string in English by default", () => {
    const wrapper = setup([]);
    const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
    expect(guessInstructions.text()).toBe("Try to guess the secret word!");
  });

  test("correctly renders guess instructions string in Emoji by default", () => {
    // Mocking return value from jest.fn()
    /**
     * [Important]
     * jest.fn().mockReturnValue(value) ===> to define any return value from a function.
     */
    const mockUseContext = jest.fn().mockReturnValue("emoji");
    // if return value is `emoji` from the useContext
    React.useContext = mockUseContext; // const returnValue = useContext(languageContext);
    const wrapper = setup([]);
    const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
    expect(guessInstructions.text()).toBe(`🤔🤫🔤`);
  });
});

// ----------------------------------------------------------

// With Context api with props

// /** Add describe and beforeEach/After */
// import React from "react";
// import { shallow, ShallowWrapper } from "enzyme";
// import { findByTestAttr, checkProps } from "../../test/testUtil";
// import GuessedWords from "./GuessWord";

// const defaultProps = {
//   guessedWords: [{ guessedWord: "train", letterMatchCount: 3 }],
// };

// /**
//  * Factory function to create a ShallowWrapper for the GuessedWords component.
//  * @function setup
//  * @param {Object} props Component props specific to this setup.
//  * @returns {ShallowWrapper}
//  */
// const setup = (props = {}) => {
//   const setupProps = { ...defaultProps, ...props };
//   return shallow(<GuessedWords {...setupProps} />);
// };

// test("does not throw warning with expected props", () => {
//   checkProps(GuessedWords, defaultProps);
// });

// describe("if there are not words guessed", () => {
//   let wrapper: ShallowWrapper;

//   beforeEach(() => {
//     wrapper = setup({ guessedWords: [] });
//   });

//   test("renders without error", () => {
//     const component = findByTestAttr(wrapper, "component-guess-word");
//     expect(component.length).toBe(1);
//   });

//   test("renders instructions to guess a word", () => {
//     const instructions = findByTestAttr(wrapper, "guess-instructions");
//     expect(instructions.text().length).not.toBe(0);
//   });
// });

// describe("if there are words guessed", () => {
//   let wrapper: ShallowWrapper;

//   const guessedWords = [
//     { guessedWord: "train", letterMatchCount: 3 },
//     { guessedWord: "agile", letterMatchCount: 1 },
//     { guessedWord: "party", letterMatchCount: 5 },
//   ];

//   beforeEach(() => {
//     wrapper = setup({ guessedWords });
//   });

//   test("renders without error", () => {
//     const component = findByTestAttr(wrapper, "component-guess-word");
//     expect(component.length).toBe(1);
//   });

//   test('renders "guessed words" section', () => {
//     const guessedWordNode = findByTestAttr(wrapper, "guessed-words");
//     expect(guessedWordNode.length).toBe(1);
//   });

//   test("correct number of guessed words", () => {
//     const guessedWordsNodes = findByTestAttr(wrapper, "guessed-word");
//     expect(guessedWordsNodes.length).toBe(guessedWords.length);
//   });
// });

// // [ Context ]
// // Context Receiver Test without Provider by using mock
// describe("languagePicker", () => {
//   test("correctly renders guess instructions string in English by default", () => {
//     const wrapper = setup({ guessedWords: [] });
//     const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
//     expect(guessInstructions.text()).toBe("Try to guess the secret word!");
//   });

//   test("correctly renders guess instructions string in Emoji by default", () => {
//     // Mocking return value from jest.fn()
//     /**
//      * [Important]
//      * jest.fn().mockReturnValue(value) ===> to define any return value from a function.
//      */
//     const mockUseContext = jest.fn().mockReturnValue("emoji");
//     // if return value is `emoji` from the useContext
//     React.useContext = mockUseContext; // const returnValue = useContext(languageContext);
//     const wrapper = setup({ guessedWords: [] });
//     const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
//     expect(guessInstructions.text()).toBe(`🤔🤫🔤`);
//   });
// });
