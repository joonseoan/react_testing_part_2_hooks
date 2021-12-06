// It is Context with Embedded state.

import {
  useContext,
  createContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";

const successContext = createContext<
  (boolean | Dispatch<SetStateAction<boolean>>)[] | null
>(null);

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

interface SuccessProviderProps {
  children: (string | Element)[];
  value: [boolean, () => void];
}

/**
 * Implement useSuccess
 * @function SuccessProvider
 * @param {object} props - props to pass through from declared component.
 * @returns {JSX.Element} Provider Component.
 */
function SuccessProvider(props: SuccessProviderProps | (any & object)) {
  // The return value will goes to "context" above.
  const [success, setSuccess] = useState<boolean>(false);

  // Only when success is changes, return success and setSuccess
  const value = useMemo(() => [success, setSuccess], [success]);

  return <successContext.Provider value={value} {...props} />;
}

export default { SuccessProvider, useSuccess };
