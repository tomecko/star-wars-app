import React from 'react';
import renderer from 'react-test-renderer';

import { Scores } from './Scores';

test('matches snapshot', () => {
  const component = renderer.create(
    <Scores scores={{ 0: 1, 1: 0}} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
