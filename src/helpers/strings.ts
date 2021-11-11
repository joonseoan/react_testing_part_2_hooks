const languageStrings = {
  en: {
    congrats: "Congratulations! You guessed the word!",
    submit: "Submit",
    guessPrompt: "Try to guess the secret word!",
    guessInputPlaceholder: "enter guess",
    guessColumnHeader: "Guessed Words",
    guessedWords: "Guesses",
    matchingLettersColumnHeader: "Matching Letters",
  },
  emoji: {
    congrats: "🎯🎉",
    submit: "🚀",
    guessPrompt: "🤔🤫🔤",
    guessInputPlaceholder: "⌨️🤔",
    guessedWords: "🤷‍🔤",
    guessColumnHeader: "🤷‍",
    matchingLettersColumnHeader: "✅",
  },
};

type LanguageKCode = "en" | "emoji" | "mermish" | any;
type StringKey =
  | "congrats"
  | "submit"
  | "guessPrompt"
  | "guessInputPlaceholder"
  | "guessColumnHeader"
  | "guessedWords"
  | "matchingLettersColumnHeader"
  | any;

function getStringByLanguage(
  languageCode: LanguageKCode,
  stringKey: StringKey,
  strings: any = languageStrings // I do not know yet which type of object will come to pass.
) {
  if (!strings[languageCode] || !strings[languageCode][stringKey]) {
    console.warn(`Could not get string [${stringKey}] for [${languageCode}]`);

    // Fallback plan
    return strings.en[stringKey];
  }

  return strings[languageCode][stringKey];
}

// for future mocking
export default { getStringByLanguage };
