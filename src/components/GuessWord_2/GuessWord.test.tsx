/** Add describe and beforeEach/After */

import { shallow, ShallowWrapper } from "enzyme";
import { findByTestAttr, checkProps } from "../../test/testUtil";
import GuessedWords from "./GuessWord";

const defaultProps = {
  guessedWords: [{ guessedWord: "train", letterMatchCount: 3 }],
  // guessedWords: 'ddd' --->  error
};
// console.log('ddd');
/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {Object} props Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessedWords {...setupProps} />);
};

test("does not throw warning with expected props", () => {
  checkProps(GuessedWords, defaultProps);
});

describe("if there are not words guessed", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
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
    wrapper = setup({ guessedWords });
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
