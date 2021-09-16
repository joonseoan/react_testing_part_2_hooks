import { shallow } from "enzyme";

import { findByTestAttr } from "../../test/testUtil";
import Input from "./Input";

const setup = () => {
    return shallow(<Input />);
}

test('Input renders without error', () => {
    const wrapper = setup();
    const inputComponent = findByTestAttr(wrapper, 'component-input');
    expect(inputComponent.length).toBe(1);
});