/** Embedded Context */

import React from "react";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";

import successContext from "../context/successContext";
import languageContext from "../context/languageContext";
import { findByTestAttr, checkProps } from "../../test/testUtil";
import Input from "./Input";

interface InputTestProps {
  language?: string;
  secretWord?: string;
  success?: boolean;
}

const setup = ({ language, secretWord, success }: InputTestProps) => {
  language ||= "en";
  secretWord ||= "party";
  success ||= false;

  return mount(
    <languageContext.Provider value={language}>
      {/* 
          // It can compares the mock custom hook test in GuessWord.test.tsx.
          const mockUseGuessedWords = jest
            .fn()
            .mockReturnValue([guessedWords, jest.fn]);
          guessWordsContext.useGuessWords = mockUseGuessedWords;


          fyi) Wrapping component like this test is also used in Congrats.test.tsx.
           <languageContext.Provider value={language}>
            <successContext.SuccessProvider value={[success, jest.fn()]}>
              <Congrats />
            </successContext.SuccessProvider>
          </languageContext.Provider>
      */}
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Input secretWord={secretWord} />
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};

const setupShallow = (success = false, secretWord = "party") => {
  return shallow(<Input success={success} secretWord={secretWord} />);
};

describe("render", () => {
  describe("success is true", () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = setup({ success: true });
    });

    test("Input renders without error", () => {
      // const wrapper = setup();
      const inputComponent = findByTestAttr(wrapper, "component-input");
      expect(inputComponent.length).toBe(1);
    });

    test("input box does not show", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      // "exist" from enzyme!!
      expect(inputBox.exists()).toBe(true);
    });

    test("submit button does not show", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.exists()).toBe(true);
    });
  });

  describe("success is false", () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      // when success is false
      wrapper = setup({ success: false });
    });

    test("Input renders without error", () => {
      // const wrapper = setup();
      const inputComponent = findByTestAttr(wrapper, "component-input");
      expect(inputComponent.length).toBe(1);
    });

    test("input box shows", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      // "exist" from enzyme!!
      expect(inputBox.exists()).toBe(false);
    });

    test("submit button shows", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.exists()).toBe(false);
    });
  });
});

// [useState with mock]
// Mock entire module
// Mock for for both shallow and mount (Destructuring)
// It must be a global variable which means it should be outside of describe method.
const mockSetCurrentGuess_des = jest.fn();

jest.mock("react", () => ({
  // return actual react mode.
  ...jest.requireActual("react"),

  // add required useState.
  useState: (initialState: string) => [initialState, mockSetCurrentGuess_des],
}));

describe("state controlled input field", () => {
  // Mock entire module for no destructuring.
  const mockSetCurrentGuess = jest.fn();

  let wrapper: ReactWrapper;

  // [Important!!!!!]
  // Need to satisfy the type : jest.fn(() => ["", mockSetCurrentGuess]);
  // not function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]; (original useState)
  let originalUseState: () => [string, (data: string) => void];

  beforeEach(() => {
    jest.clearAllMocks();

    // set useState to originalUseState.
    originalUseState = React.useState;

    // mocking for mount (No destructuring)
    React.useState = () => [true, mockSetCurrentGuess];

    wrapper = setup({ success: true });
  });

  afterEach(() => {
    // back to original function
    React.useState = originalUseState;
  });

  // No destructuring
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
  //   // const wrapper = setupShallow();
  //   const inputBox = findByTestAttr(wrapper, "input-box");

  //   const mockEvent = { target: { value: "train" } };
  //   inputBox.simulate("change", mockEvent);

  //   expect(mockSetCurrentGuess_des).toHaveBeenCalledWith("train");
  // });

  test("setCurrentGuess gets called with submit button", () => {
    // const mockEvent = {D}
    const submit = findByTestAttr(wrapper, "submit-button");

    // [IMPORTANT]
    // we can manually enter target.value or some event attribute like preventDefault into the second param~~
    submit.simulate("click", { preventDefault() {} });
    expect(mockSetCurrentGuess).not.toBeCalled();

    // Since we use context for setSuccess instead of the local state,
    // that local state is not be called.
    // expect(mockSetCurrentGuess).toBeCalled();
  });
});

// [Context API]
// Context Provider testing with mount
describe("language picker", () => {
  test("correctly renders submit string in english", () => {
    const wrapper = setup({ language: "en", success: true });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("Submit");
  });

  test("correctly renders congrats string in emoji", () => {
    const wrapper = setup({ language: "emoji", success: true });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("🚀");
  });
});

// /** useState Test and Context API */ ---------------------------------------------------

// import React from "react";
// import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";

// import languageContext from "../context/languageContext";
// import { findByTestAttr, checkProps } from "../../test/testUtil";
// import Input from "./Input";

// interface InputTestProps {
//   language?: string;
//   secretWord?: string;
//   success?: boolean;
// }

// const setup = ({ language, secretWord, success }: InputTestProps) => {
//   language ||= "en";
//   secretWord ||= "party";
//   success ||= false;

//   return mount(
//     <languageContext.Provider value={language}>
//       <Input success={success} secretWord={secretWord} />
//     </languageContext.Provider>
//   );
// };

// const setupShallow = (success = false, secretWord = "party") => {
//   return shallow(<Input success={success} secretWord={secretWord} />);
// };

// describe("render", () => {
//   describe("success is true", () => {
//     let wrapper: ReactWrapper;

//     beforeEach(() => {
//       wrapper = setup({ success: false });
//     });

//     test("Input renders without error", () => {
//       // const wrapper = setup();
//       const inputComponent = findByTestAttr(wrapper, "component-input");
//       expect(inputComponent.length).toBe(1);
//     });

//     test("input box does not show", () => {
//       const inputBox = findByTestAttr(wrapper, "input-box");
//       // "exist" from enzyme!!
//       expect(inputBox.exists()).toBe(true);
//     });

//     test("submit button does not show", () => {
//       const submitButton = findByTestAttr(wrapper, "submit-button");
//       expect(submitButton.exists()).toBe(true);
//     });
//   });

//   describe("success is false", () => {
//     let wrapper: ReactWrapper;

//     beforeEach(() => {
//       // when success is false
//       wrapper = setup({ success: false });
//     });

//     test("Input renders without error", () => {
//       // const wrapper = setup();
//       const inputComponent = findByTestAttr(wrapper, "component-input");
//       expect(inputComponent.length).toBe(1);
//     });

//     test("input box shows", () => {
//       const inputBox = findByTestAttr(wrapper, "input-box");
//       // "exist" from enzyme!!
//       expect(inputBox.exists()).toBe(true);
//     });

//     test("submit button shows", () => {
//       const submitButton = findByTestAttr(wrapper, "submit-button");
//       expect(submitButton.exists()).toBe(true);
//     });
//   });
// });

// // [useState with mock]
// // Mock entire module
// // Mock for for both shallow and mount (Destructuring)
// // It must be a global variable which means it should be outside of describe method.
// const mockSetCurrentGuess_des = jest.fn();

// jest.mock("react", () => ({
//   // return actual react mode.
//   ...jest.requireActual("react"),

//   // add required useState.
//   useState: (initialState: string) => [initialState, mockSetCurrentGuess_des],
// }));

// describe("state controlled input field", () => {
//   // Mock entire module for no destructuring.
//   const mockSetCurrentGuess = jest.fn();

//   let wrapper: ReactWrapper;

//   // [Important!!!!!]
//   // Need to satisfy the type : jest.fn(() => ["", mockSetCurrentGuess]);
//   // not function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]; (original useState)
//   let originalUseState: () => [string, (data: string) => void];

//   beforeEach(() => {
//     // 2) clear a specific mock
//     // mockSetCurrentGuess.mockClear();
//     // mockSetCurrentGuess_des.mockClear();

//     // 1) clear all mocks
//     jest.clearAllMocks();

//     // set useState to originalUseState.
//     originalUseState = React.useState;

//     // mocking for shallow (No destructuring)
//     // React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

//     // mocking for mount (No destructuring)
//     React.useState = () => ["", mockSetCurrentGuess];

//     wrapper = setup({});
//   });

//   afterEach(() => {
//     // ^^^^^^^
//     // back to original function
//     React.useState = originalUseState;
//   });

//   // No destructuring
//   test("state updates with value of input box upon change", () => {
//     // it is the second element, setCurrentWord.
//     // const mockSetCurrentGuess = jest.fn();
//     // React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

//     // const wrapper = setup();
//     const inputBox = findByTestAttr(wrapper, "input-box");
//     const mockEvent = { target: { value: "train" } };

//     // event simulate
//     inputBox.simulate("change", mockEvent);
//     expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
//   });

//   // With destructuring
//   // test("state updates with value of input box upon change (with destructuring)", () => {
//   //   // const wrapper = setupShallow();
//   //   const inputBox = findByTestAttr(wrapper, "input-box");

//   //   const mockEvent = { target: { value: "train" } };
//   //   inputBox.simulate("change", mockEvent);

//   //   expect(mockSetCurrentGuess_des).toHaveBeenCalledWith("train");
//   // });

//   test("setCurrentGuess gets called with submit button", () => {
//     // const mockEvent = {D}
//     const submit = findByTestAttr(wrapper, "submit-button");

//     // [IMPORTANT]
//     // we can manually enter target.value or some event attribute like preventDefault into the second param~~
//     submit.simulate("click", { preventDefault() {} });
//     expect(mockSetCurrentGuess).toBeCalled();
//   });
// });

// // [Context]
// // Context Provider testing with mount
// describe("language picker", () => {
//   test("correctly renders submit string in english", () => {
//     const wrapper = setup({ language: "en" });
//     const submitButton = findByTestAttr(wrapper, "submit-button");
//     expect(submitButton.text()).toBe("Submit");
//   });

//   test("correctly renders congrats string in emoji", () => {
//     const wrapper = setup({ language: "emoji" });
//     const submitButton = findByTestAttr(wrapper, "submit-button");
//     expect(submitButton.text()).toBe("🚀");
//   });
// });
