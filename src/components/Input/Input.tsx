import { FC } from "react";
import PropTypes from 'prop-types';

// ? just for now testing. 
export interface InputProps {
    secretWord?: string 
}

const Input: FC<InputProps> = ({ secretWord }) => {
    return (
        <div data-test="component-input">

        </div>
    );
}

Input.propTypes ={
    secretWord: PropTypes.string.isRequired,
}

export default Input;