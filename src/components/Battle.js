import React from 'react';

import { Item } from './Item';

export function Battle({ battle, resourceInfo }) {
  const { items, winners } = battle;
  return (
    <div>
      <h2>Battle</h2>
      {items && items.map((item, i) => (
        <Item
          key={i}
          item={item}
          resourceInfo={resourceInfo}
          winner={winners.includes(i)}
        />
      ))}
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}

