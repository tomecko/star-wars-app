import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';

import { machine } from '../config';

import { Battle } from './Battle';
import { Menu } from './Menu';

export function App() {
  const [current, send] = useMachine(machine);
  useEffect(() => {
    send('INIT');
  }, [send])

  return (
    <div>
      <h1>Star Wars App</h1>
      {current.matches('loading') ? 'Loading…' : ''}
      {current.matches('menu') ? (
        <Menu resourceInfo={current.context.resourceInfo} send={send} />
       ) : null}

      {current.matches('battle') && current.context.battle
        ? <Battle
            battle={current.context.battle}
            resourceInfo={current.context.resourceInfo}
          />
        : null}

      <pre>{JSON.stringify(current.context, null, 2)}</pre>
    </div>
  );
}

