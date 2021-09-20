import React, { useState } from "react";
import PropTypes from 'prop-types';

// ?: for now testing with propType.
export interface InputProps {
    secretWord?: string 
}

// React.FC (no destruction) : for now to test
const Input: React.FC<InputProps> = ({ secretWord }) => {

    const [currentGuess, setCurrentGuess] = useState<string>('');

    return (
        <div data-test="component-input">
            <form className="form-inline">
                <input 
                    data-test="input-box"
                    className="mb-2 mx-sm-3"
                    type="text"
                    placeholder="enter guess"
                    value={currentGuess}
                    onChange={(event) => setCurrentGuess(event.target.value)}
                />
                <button data-test="submit-button" className="btn btn-primary mb-2">
                    Submit
                </button>
            </form>
        </div>
    );
}

Input.propTypes ={
    secretWord: PropTypes.string.isRequired,
}

export default Input;