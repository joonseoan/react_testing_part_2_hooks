import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import Congrats from './Congrats';

Enzyme.configure({ adapter: new EnzymeAdapter() });

test('renders without error', () => {});