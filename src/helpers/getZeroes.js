export const getZeroes = (count) =>
  [...Array(count).keys()]
    .reduce((acc, val) => ({ ...acc, [val]: 0 }), {})
