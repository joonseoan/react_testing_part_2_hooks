// useEffect test.

import { findByTestAttr } from "../test/testUtil";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import App from "./App";
import { ReactNode } from "react";

// activate global mock to make sure getSecretWord does not make network call
// Yeah. it is index.ts in "./action".
// The way of mocking the function.
jest.mock("./actions");

// This mock function getSecretWord action now is going to be "getSecretWord" in project "__mock__"
// import { getSecretWord as mockGetSecretWord } from "../actions";

/**
 * Setup ShallowWrapper.
 * @returns {ReactNode}
 */
const setup = () => {
  // return shallow(<App />);
  // [Important]: useEffect is called on Shallow.
  // https://github.com/airbnb/enzyme/issues/2086
  return mount(<App />);
};

// let wrapper: ShallowWrapper;
let wrapper: ReactWrapper;

test("renders without error", () => {
  wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent).toHaveLength(1);
});

describe("get secret word", () => {
  test("get getSecretWord on app mount", () => {});

  test("getSecretWord does not run on app update", () => {});
});
