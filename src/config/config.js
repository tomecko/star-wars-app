export const BATTLE_TIMEOUT = 3000;
export const ITEM_COUNT = 2;

export const RESOURCE_INFOS = [
  {
    name: 'people',
    getScore: ({ mass }) => Number(mass) || 0,
    getScoreText: ({ mass }) => mass,
    scoreDescription: 'mass',
  },
  {
    name: 'starships',
    getScore: ({ crew }) => Number(crew) || 0,
    getScoreText: ({ crew }) => crew,
    scoreDescription: 'crew',
  },
];
