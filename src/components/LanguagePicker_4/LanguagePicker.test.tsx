/**
 * Props as a useState callback.
 */

import React from "react";
import { ShallowWrapper, shallow } from "enzyme";

/**
 * MOUNT VS SHALLOW
 * When we do not have to use life cycle methods or functions,
 * we can use `shallow`.
 */

import { findByTestAttr, checkProps } from "../../test/testUtil";
import LanguagePicker from "./LanguagePicker";

const mockSetLanguage = jest.fn();

const setup = () => {
  return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
};

test("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-language-picker");
  expect(component.exists()).toBe(true);
});

test("does not throw warning with expected props", () => {
  checkProps(LanguagePicker, { setLanguage: jest.fn() });
});

test("renders non-zero language icons", () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, "language-icon");
  expect(languageIcons.length).toBeGreaterThan(0);
});

test("calls setLanguage prop upon click", () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, "language-icon");

  // ".first()" from enzyme.
  const firstIcon = languageIcons.first();
  firstIcon.simulate("click");

  expect(mockSetLanguage).toHaveBeenCalled();
});
