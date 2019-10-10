import React from 'react';

export function Item({ item, resourceInfo, winner }) {
  return (
    <div>
      <p>name: {item.name} {winner ? 'winner' : ''}</p>
      <p>{resourceInfo.scoreDescription}: {resourceInfo.getScoreText(item)}</p>
    </div>
  );
}

