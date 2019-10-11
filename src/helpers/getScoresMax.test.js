import { getScoresMax } from './getScoresMax';

test.each([
  [{ 0: 0, 1: 0, 2: 0 }, 10],
  [{ 0: 5, 1: 0, 2: 0 }, 10],
  [{ 0: 10, 1: 0, 2: 0 }, 10],
  [{ 0: 11, 1: 0, 2: 0 }, 20],
  [{ 0: 11, 1: 11, 2: 0 }, 20],
  [{ 0: 100, 1: 11, 2: 0 }, 100],
])(
  'getScoresMax',
  (scores, expected) => {
    expect(getScoresMax(scores)).toStrictEqual(expected);
  },
);
