import { FC } from "react";
import propTypes from "prop-types";

interface LanguagePickerProps {
  setLanguage: (lang: string) => void;
}

const LanguagePicker: FC<LanguagePickerProps | any> = ({ setLanguage }) => {
  const languageIcons = [
    { code: "en", symbol: "🇺🇸" },
    { code: "emoji", symbol: "😊" },
  ].map((lang) => {
    return (
      <span
        data-test="language-icon"
        key={lang.code}
        onClick={() => setLanguage(lang.code)}
      >
        {lang.symbol}
      </span>
    );
  });

  return <div data-test="component-language-picker">{languageIcons}</div>;
};

LanguagePicker.propTypes = {
  setLanguage: propTypes.func.isRequired,
};

export default LanguagePicker;
