import Schedule from './Schedule';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
it('renders without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(<Schedule />, div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
  const tree = renderer
    .create(<Schedule />)
    .toJSON();
  expect(tree).toMatchSnapshot();  
  });