import React from 'react';
import renderer from 'react-test-renderer';

import { Menu } from './Menu';

test('matches snapshot', () => {
  const component = renderer.create(
    <Menu resourceInfo={null} send={() => {}} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
