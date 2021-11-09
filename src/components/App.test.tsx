import { findByTestAttr } from "../test/testUtil";
import React, {
  Reducer,
  ReducerStateWithoutAction,
  DispatchWithoutAction,
} from "react";
import { mount, ReactWrapper } from "enzyme";
import App from "./App";

// This mock function getSecretWord action now is going to be "getSecretWord" in project "__mock__"
import { getSecretWord as mockGetSecretWord } from "../actions";

// activate global mock to make sure getSecretWord does not make network call
// Yeah. it is index.ts in "./action".
// The way of mocking the function.
jest.mock("../actions");

/**
 * Setup Mount.
 * @returns {ReactNode}
 */
const setup = () => {
  // return shallow(<App />);
  // [Important]: useEffect is called on Shallow.
  // https://github.com/airbnb/enzyme/issues/2086
  return mount(<App />);
};

// [useReducer]
// [Important]: to do the same tests repeatedly with the different parameters.
// For instance, the spinner
describe.each([
  // while loading,
  // 1) secretWord: null
  // 2) loadingShows: true,
  // 3) appShows: false
  [null, true, false],
  ["party", false, true],
])(
  // %s: take the first argument ans use it as string!!
  "renders with secretWord as %s",
  (secretWord: string | null, loadingShows: boolean, appShows: boolean) => {
    let wrapper = setup();
    let originalReducer: <R extends Reducer<any, any>, I>(
      reducer: R,
      initializerArg: I
    ) => [ReducerStateWithoutAction<any>, DispatchWithoutAction];

    beforeEach(() => {
      originalReducer = React.useReducer;

      const mockUseReducer = jest.fn().mockReturnValue([
        { secretWord }, // state
        jest.fn(), // dispatch
      ]);

      React.useReducer = mockUseReducer;

      wrapper = setup();
    });

    afterEach(() => {
      React.useReducer = originalReducer;
    });

    test(`renders loading spinner: ${loadingShows}`, () => {
      const spinnerComponent = findByTestAttr(wrapper, "spinner");
      // exists on mount
      expect(spinnerComponent.exists()).toBe(loadingShows);
    });

    test(`render apps: ${appShows}`, () => {
      const appComponent = findByTestAttr(wrapper, "component-app");
      // exists on mount
      expect(appComponent.exists()).toBe(appShows);
    });
  }
);

// useEffect with Mock

// test("renders without error", () => {
//   wrapper = setup();
//   const appComponent = findByTestAttr(wrapper, "component-app");
//   expect(appComponent).toHaveLength(1);
// });

describe("get secret word", () => {
  beforeEach(() => {
    // clear the mock call
    jest.clearAllMocks();
  });
  test("get getSecretWord on app mount", () => {
    const wrapper = setup();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });

  test("getSecretWord does not run on app update", () => {
    const wrapper = setup();
    jest.clearAllMocks();
    // using setProps because wrapper.update() does not trigger useEffect, for now.
    // https://github.com/enzymejs/enzyme/issues/2254
    wrapper.setProps({});
    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});
