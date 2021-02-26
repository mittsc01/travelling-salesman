import AddScheduleItem from './AddScheduleItem';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
it('renders without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(<AddScheduleItem />, div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
  const tree = renderer
    .create(<AddScheduleItem />)
    .toJSON();
  expect(tree).toMatchSnapshot();  
  });