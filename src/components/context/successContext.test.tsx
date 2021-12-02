// For the state embedded context.

import React from "react";
import { shallow, mount } from "enzyme";

import successContext from "./successContext";

// A functional component that calls useSuccess for our tests.
const FunctionalComponent = () => {
  // Now useSuccess is working outside successContext.Provider.
  // In this case, the default value is null like "const successContext = createContext(null)"
  successContext.useSuccess();
  return <div />;
};

test("useSuccess throws error when not wrapped in SuccessProvider", () => {
  // A wat to test shall in assertion.
  // It is useful when the just single test is required.

  // Testing "useSuccess" which is outside or not used inside of SuccessProvider.
  // In this case, "null " of createContext(null) will be context value.
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow("useSuccess must be used within a SuccessProvider.");
});

test("useSuccess does not throw error when wrapped in SuccessProvider", () => {
  // When it is used in inside of Provider, the context value will be useState return value [ success, setSuccess ]
  expect(() => {
    mount(
      <successContext.SuccessProvider>
        <FunctionalComponent />
      </successContext.SuccessProvider>
    );
  }).not.toThrow();
});
