import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { findByTestAttr, checkProps } from '../../test/testUtil';
import GuessedWords from './GuessWord';

const defaultProps = {
  guessedWords: [{ guessedWord: 'train', letterMatchCount: 3 }]
  // guessedWords: 'ddd' --->  error
};

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {Object} props Component props specific to this setup. 
 * @returns {ShallowWrapper}
 */
const setup = (props={}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessedWords {...setupProps} />)
}

test('does not throw warning with expected props', () => {
  checkProps(GuessedWords, defaultProps);
});

describe('if there are not words guessed', () => {

});

describe('if there are words guessed', () => {
  
})