import React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { findByTestAttr, checkProps } from "../../test/testUtil";
import Input from "./Input";

// Mock entire module for destructuring.
// const mockSetCurrentGuess_des = jest.fn();

// Component structure of React!!! [Important]
// jest.mock("react", () => ({
//   // return actual react mode.
//   ...jest.requireActual("react"),

//   // add required useState.
//   useState: (initialState: string) => [initialState, mockSetCurrentGuess_des],
// }));

const setup = (secretWord = "party") => {
  return shallow(<Input secretWord={secretWord} />);
};

test("Input renders without error", () => {
  const wrapper = setup();
  const inputComponent = findByTestAttr(wrapper, "component-input");
  expect(inputComponent.length).toBe(1);
});

test("does not throw warning with expected props", () => {
  checkProps(Input, { secretWord: "party" });
});

describe("state controlled input field", () => {
  let wrapper: ShallowWrapper;

  const mockSetCurrentGuess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup();
  });

  // Without destructuring
  test("state updates with value of input box upon change", () => {
    // it is the second element, setCurrentWord.
    // const mockSetCurrentGuess = jest.fn();
    // React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

    // const wrapper = setup();
    const inputBox = findByTestAttr(wrapper, "input-box");

    const mockEvent = { target: { value: "train" } };
    // event simulate
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });

  // With destructuring
  // test("state updates with value of input box upon change (with destructuring)", () => {
  //   const wrapper = setup();
  //   const inputBox = findByTestAttr(wrapper, "input-box");

  //   const mockEvent = { target: { value: "train" } };
  //   inputBox.simulate("change", mockEvent);

  //   expect(mockSetCurrentGuess_des).toHaveBeenCalledWith("train");
  // });

  test("setCurrentGuess gets called with submit button", () => {
    // const mockEvent = {D}
    const form = findByTestAttr(wrapper, "submit-button");
    form.simulate("submit", {});

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
