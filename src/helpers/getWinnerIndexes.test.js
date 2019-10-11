import { getWinnerIndexes } from './getWinnerIndexes';

test.each([
  [
    [{ score: 1 }, { score: 2 }],
    ({ score }) => score,
    [1],
  ],
  [
    [{ score: 1 }, { score: 1 }],
    ({ score }) => score,
    [0, 1],
  ],
  [
    [{ score: 'abc' }, { score: 10 }],
    ({ score }) => Number(score) || 0,
    [1],
  ],
  [
    [{ score: 0 }, { score: 0 }],
    ({ score }) => score,
    [],
  ],
  [
    [{ score: 'abc' }, { score: 0 }],
    ({ score }) => Number(score) || 0,
    [],
  ],
  [
    [{ a: 3 }, { a: 5 }],
    ({ b }) => b,
    [],
  ],
  [
    [{ a: NaN }, { a: 5 }],
    ({ a }) => a,
    [],
  ],
])(
  'getWinnerIndexes',
  (items, getScore, expected) => {
    expect(getWinnerIndexes(items, getScore)).toStrictEqual(expected);
  },
);
