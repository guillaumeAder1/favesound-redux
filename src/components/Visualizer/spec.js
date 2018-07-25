import Visualizer from './index';
import { shallow } from 'enzyme';

describe('Visualizer', () => {

    const props = {
        audio: {}
    };

    it('renders', () => {
        const element = shallow(<Visualizer {...props} />);
        expect(element.find('canvas')).to.have.length(1);

    });

    // it('takes an optional image into account', () => {
    //     props.image = null;
    //     const element = shallow(<Visualizer {...props} />);
    //     expect(element.find('img').prop('src')).to.equal(props.optionalImage);
    // });

});
