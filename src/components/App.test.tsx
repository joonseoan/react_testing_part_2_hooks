import { findByTestAttr } from "../test/testUtil";
import { shallow, ShallowWrapper } from "enzyme";
import App from "./App";

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
