import { findByTestAttr } from "../test/testUtil";
import { mount } from "enzyme";
import App from "./App";
import { toUnicode } from "punycode";

// const setup = (state = {}) => {
//   // So now we test "guess a word every single time something changes"

//   // @TODO: apply state.
//   const wrapper = mount(<App />);

//   const inputBox = findByTestAttr(wrapper, "input-box");
//   inputBox.simulate("change", { target: { value: "train" } });

//   const submitButton = findByTestAttr(wrapper, "submit-button");
//   submitButton.simulate("click", { preventDefault() {} });

//   return wrapper;
// };

describe("no words guessed", () => {
  test("a", () => {});
});

describe("some words guessed", () => {
  test("a", () => {});
});

describe("guess secret word", () => {
  test("a", () => {});
});
