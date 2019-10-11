import { Machine, assign } from 'xstate';

import { getNewScores, getZeroes, getNewBattle } from '../helpers';
import { starWarsDataService } from '../services';

import { BATTLE_TIMEOUT, ITEM_COUNT, RESOURCE_INFOS } from './config';

export const machine = Machine({
  context: {
    battle: null,
    error: null,
    loadingShouldFail: Math.random() < 0.5, // for demonstration purposes only
    resourceInfo: null,
    scores: getZeroes(ITEM_COUNT),
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
        src: 'loadingInvoke',
        onDone: 'menu',
        onError: {
          target: 'failure',
          actions: assign({ error: (_, event) => event.data }),
        },
      },
    },
    failure: {
      on: {
        RETRY: {
          target: 'loading',
          actions: assign({ error: null, loadingShouldFail: false }),
        }
      },
    },
    menu: {
      on: {
        PLAY: {
          target: 'battle',
          actions: assign({ resourceInfo: (_, event) => event.resourceInfo }),
        },
      }
    },
    battle: {
      invoke: {
        src: 'battleInvoke',
        onDone: {
          actions: assign(({
            battle: getNewBattle,
            scores: getNewScores,
          })),
        },
      },
      after: {
        [BATTLE_TIMEOUT]: 'menu',
      },
      exit: assign(({ battle: null })),
    },
  },
}, {
  services: {
    loadingInvoke: (context) => context.loadingShouldFail
      ? Promise.reject(new Error('very informative error message'))
      : Promise.all(RESOURCE_INFOS.map(({ name }) =>
          starWarsDataService.getAll(name))),
    battleInvoke: (context) =>
      starWarsDataService.getRandom(context.resourceInfo.name, ITEM_COUNT),
  },
});
