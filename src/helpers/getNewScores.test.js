import { getNewScores } from './getNewScores';

test.each([
  [
    { resourceInfo: { getScore: ({ a }) => a }, scores: { 0: 0, 1: 0, 2: 0 } },
    { data: [{ a: 2 }, { a: 0 }, { a: 1 }] },
    { 0: 1, 1: 0, 2: 0 },
  ],
  [
    { resourceInfo: { getScore: ({ a }) => a }, scores: { 0: 10, 1: 0, 2: 0 } },
    { data: [{ a: 2 }, { a: 0 }, { a: 1 }] },
    { 0: 11, 1: 0, 2: 0 },
  ],
  [
    { resourceInfo: { getScore: ({ a }) => a }, scores: { 0: 0, 1: 5 } },
    { data: [{ a: 2 }, { a: 0 }] },
    { 0: 1, 1: 5 },
  ],
])(
  'getNewScores',
  (context, event, expected) => {
    expect(getNewScores(context, event)).toStrictEqual(expected);
  },
);
