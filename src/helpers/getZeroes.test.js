import { getZeroes } from './getZeroes';

test.each([
  [0, {}],
  [1, { 0: 0 }],
  [2, { 0: 0, 1: 0 }],
  [3, { 0: 0, 1: 0, 2: 0 }],
])(
  'getZeroes',
  (count, expected) => {
    expect(getZeroes(count)).toStrictEqual(expected);
  },
);
