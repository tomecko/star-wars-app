import React from 'react';
import renderer from 'react-test-renderer';

import { Battle } from './Battle';

test('matches snapshot', () => {
  const battle = {
    items: [
      { name: 'n1', a: 1 },
    ],
    winners: [1],
  };
  const resourceInfo = {
    name: 'resourceName',
    getScore: ({ a }) => a,
    getScoreText: ({ a }) => String(a),
    scoreDescription: 'a',
  }
  const component = renderer.create(
    <Battle battle={battle} resourceInfo={resourceInfo} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
