import { findByTestAttr } from "../test/testUtil";
import { shallow, ShallowWrapper } from "enzyme";
import App from "./App";

// activate global mock to make sure getSecretWord does not make network call
// Yeah. it is index.ts in "./action".
// The way of mocking the function.
jest.mock("./actions");

/**
 * Setup ShallowWrapper.
 * @returns {ShallowWrapper}
 */
const setup = () => {
  return shallow(<App />);
};

let wrapper: ShallowWrapper;

test("renders learn react link", () => {
  wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent).toHaveLength(1);
});
