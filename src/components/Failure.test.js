import React from 'react';
import renderer from 'react-test-renderer';

import { Failure } from './Failure';

test('matches snapshot', () => {
  const component = renderer.create(
    <Failure />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
