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

  if (!context) {
    throw new Error("useSuccess must be used within a SuccessProvider.");
  }

  return context;
}

/**
 * Implement useSuccess
 * @function SuccessProvider
 * @param {object} props - props to pass through from declared component.
 * @returns {JSX.Element} Provider Component.
 */
function SuccessProvider(props: object) {
  const [success, setSuccess] = useState<boolean>(false);

  // Only when success is changes, return success and setSuccess
  const value = useMemo(() => [success, setSuccess], [success]);

  return <successContext.Provider value={value} {...props} />;
}

export default { SuccessProvider, useSuccess };
