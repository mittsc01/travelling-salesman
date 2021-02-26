import Map from './Map';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom'
it('renders without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(<MemoryRouter><Map /></MemoryRouter>, div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
  const tree = renderer
    .create(<MemoryRouter><Map /></MemoryRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();  
  });