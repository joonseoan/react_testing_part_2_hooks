import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../test/testUtil";
import Input from "./Input";

const setup = (secretWord = 'party') => {
    return shallow(<Input secretWord={secretWord} />);
}

test('Input renders without error', () => {
    const wrapper = setup();
    const inputComponent = findByTestAttr(wrapper, 'component-input');
    expect(inputComponent.length).toBe(1);
});

test('does not throw warning with expected props', () => {
    checkProps(Input, { secretWord: 'party' });
});