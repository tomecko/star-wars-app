import { getWinnerIndexes } from './getWinnerIndexes';

export const getNewScores = (context, event) =>
  getWinnerIndexes(event.data, context.resourceInfo.getScore)
    .reduce(
      (scores, i) => ({ ...scores, [i]: scores[i] + 1 }),
      context.scores,
    );
