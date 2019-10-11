export const getWinnerIndexes = (items, getScore) => {
  const scores = items.map(getScore);
  const max = Math.max(...scores);
  return max === 0
    ? []
    : Array.from(scores.keys()).filter((_, i) => scores[i] === max);
}
