import { shallow } from 'enzyme';

// since the centralized config
// import Enzyme, { shallow } from 'enzyme';
// import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

// since the testUtil implements
// testing for props when we are not using typescript.
import checkPropTypes  from 'check-prop-types';

import { findByTestAttr, checkProps } from '../../test/testUtil';
import Congrats from './Congrats';

// since centralized config
// Enzyme.configure({ adapter: new EnzymeAdapter() });

const defaultProps = {
  success: false,
}

// setup props as empty object by default.
/**
 * Factory function to create a ShallowWrapper for the Congrats component.
 * @param {object} props Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props={}) => {
  const setupProps = { ...defaultProps, ...props }
  return shallow(<Congrats {...setupProps} />)
}

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});

test ('renders no text when `success` props is false', () => {
  const wrapper = setup({success: false});
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.text()).toBe('');
});

test('renders non-empty congrats message when `success` prop os true', () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, 'congrats-message');
  expect(message.text().length).not.toBe(0);
})

test('it does not throw warning with expected props', () => {
  const expectedProps = { success: false };
  
  checkProps(Congrats, expectedProps);
  
  // IMPORTANT: Props testing!!! (It is not required when we are using typescript)

  // because in Congrats Component, PropTypes are not defined yet ()
  // const propError = checkPropTypes(Congrats.propTypes, expectedProps, 'prop', Congrats.name);
  // console.log('propError: ', propError); // ---> undefined.
  // expect(propError).toBeUndefined();


})