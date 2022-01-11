// It is Context with Embedded state.

import {
  useContext,
  createContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";

const guessWordsContext = createContext<
({
  guessedWord: string;
  letterMatchCount: number;
}[] | Dispatch<SetStateAction<{
  guessedWord: string;
  letterMatchCount: number;
}[]>>)[]
  | null
>(null);

/**
 * @function useGuessWords
 * @returns {Array} guessWordContext value, which is a state of [value, setter].
 */
function useGuessWords() {
  const context = useContext(guessWordsContext);

  if (!context) {
    throw new Error("useGuessWords must be used within a SuccessProvider.");
  }

  return context;
}

/**
 * Implement useGuessWord
 * @function GuessWordsProvider
 * @param {object} props - props to pass through from declared component.
 * @returns {JSX.Element} Provider Component.
 */
function GuessWordsProvider(props: object) {
  // The return value will goes to "context" above.
  const [guessedWords, setGuessedWords] = useState<
    { guessedWord: string; letterMatchCount: number }[]
  >([]);

  // Only when success is changes, return success and setSuccess
  const value = useMemo(() => [guessedWords, setGuessedWords], [guessedWords]);

  return <guessWordsContext.Provider value={value} {...props} />;
}

export default { GuessWordsProvider, useGuessWords };
