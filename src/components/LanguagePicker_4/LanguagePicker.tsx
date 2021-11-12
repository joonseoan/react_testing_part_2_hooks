import { FC } from "react";
import propTypes from "prop-types";

interface LanguagePickerProps {
  setLanguage: (lang: string) => void;
}

const LanguagePicker: FC<LanguagePickerProps | any> = ({ setLanguage }) => {
  return <div data-test="component-language-picker"></div>;
};

LanguagePicker.propTypes = {
  setLanguage: propTypes.func.isRequired,
};

export default LanguagePicker;
