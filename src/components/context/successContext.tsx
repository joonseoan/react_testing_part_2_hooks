// It is Context with Embedded state.

import {
  useContext,
  createContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";

// not working.
// const successContext = createContext<
//   (boolean | Dispatch<SetStateAction<boolean>>)[] | null
// >(null);

// In the array, we need to specify the type, not return value of useMemo.
// Then we can deconstruct.
const successContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>] | null>(null);

/**
 * @function useSuccess
 * @returns {Array} successContext value, which is a state of [value, setter].
 */
function useSuccess() {
  const context = useContext(successContext);

  // when it is wrapped in Provider,
  // The context value is [success, setSuccess]
  // console.log("context: ", context);
  // ==> context:  [ false, [Function: bound dispatchAction] ]

  if (!context) {
    throw new Error("useSuccess must be used within a SuccessProvider.");
  }

  return context;
}

// { children: (string | Element)[]; value: [boolean, Mock<any, any>]; }
interface SuccessProviderProps {
  children: (string | Element)[];
  value: [boolean, jest.Mock];
}

/**
 * Implement useSuccess
 * @function SuccessProvider
 * @param {object} props - props to pass through from declared component.
 * @returns {JSX.Element} Provider Component.
 */
function SuccessProvider(props: SuccessProviderProps | any) {
  // The return value will goes to "context" above.
  const [success, setSuccess] = useState<boolean>(false);

  // Only when success is changes, return success and setSuccess
  const value = useMemo(() => [success, setSuccess], [success]);

  // value can be overiden by "props value" because props here
  // {...{...value, ...props}}
  return <successContext.Provider value={value} {...props} />;
}

export default { SuccessProvider, useSuccess };
