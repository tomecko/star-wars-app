import { getWinnerIndexes } from './getWinnerIndexes';

export const getNewBattle = (context, event) => ({
  items: event.data,
  winners: getWinnerIndexes(event.data, context.resourceInfo.getScore),
});
