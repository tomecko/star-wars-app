import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { App } from './App';
import { machine } from '../config';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('matches snapshot', () => {
  const component = renderer.create(
    <App />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('allows playing a game', () => {
  const div = document.createElement('div');
  const mockMachine = machine.withConfig({
    services: {
      loadingInvoke: () => Promise.resolve(),
      battleInvoke: () => Promise.resolve([
        { name: 'name1', a: 1 },
        { name: 'name2', a: 10 },
      ]),
    },
  });
  ReactDOM.render(<App machine={mockMachine} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
