import React from 'react';

import { RESOURCE_INFOS } from '../config';

export function Menu({ resourceInfo, send }) {
  return (
    <div>
      {RESOURCE_INFOS.map(info => (
        <button
          key={info.name}
          onClick={() => {
            send({
              type: 'PLAY',
              resourceInfo: info,
            });
          }}
        >
          {info.name} {resourceInfo === info ? '*' : ''}
        </button>
      ))}
    </div>
  );
}

