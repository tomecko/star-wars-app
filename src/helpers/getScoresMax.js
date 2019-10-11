export const getScoresMax = scores =>
  Math.max(
    10,
    Math.ceil(Math.max(...Object.keys(scores).map(i => scores[i])) / 10) * 10,
  );
