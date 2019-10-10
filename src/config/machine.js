import { Machine, assign } from 'xstate';

import { starWarsDataService } from '../services';

import { ITEM_COUNT, RESOURCE_INFOS } from './config';

const getWinnerIndexes = (items, getScore) => {
  const scores = items.map(getScore);
  const max = Math.max(...scores);
  return max === 0
    ? []
    : Array.from(scores.keys()).filter((_, i) => scores[i] === max);
}

const getZeroScores = () =>
  [...Array(ITEM_COUNT).keys()]
    .reduce((acc, val) => ({ ...acc, [val]: 0 }), {})

export const machine = Machine({
  id: 'root',
  context: {
    battle: null,
    resourceInfo: null,
    scores: getZeroScores(),
  },
  initial: 'blank',
  states: {
    blank: {
      on: {
        INIT: 'loading',
      },
    },
    loading: {
      invoke: {
        src: () =>
          Promise.all(RESOURCE_INFOS.map(({ name }) =>
            starWarsDataService.getAll(name))),
        onDone: 'menu',
      },
    },
    menu: {
      on: {
        PLAY: {
          target: 'battle',
          actions: assign({
            resourceInfo: (_, event) => event.resourceInfo,
          }),
        },
      }
    },
    battle: {
      invoke: {
        src: (context) =>
          starWarsDataService
            .getRandom(context.resourceInfo.name, ITEM_COUNT),
        onDone: {
          actions: assign(({
            battle: (context, event) => ({
              items: event.data,
              winners: getWinnerIndexes(event.data, context.resourceInfo.getScore),
            }),
            scores: (context, event) =>
              getWinnerIndexes(event.data, context.resourceInfo.getScore)
                .reduce(
                  (scores, i) => ({ ...scores, [i]: scores[i] + 1 }),
                  context.scores,
                ),
          })),
        },
      },
      after: {
        4000: 'menu',
      },
      exit: 'clearBattle',
    },
  },
}, {
  actions: {
    clearBattle: assign(({ battle: null })),
  },
});
