import React from 'react';
import { Badge, Card, CardGroup } from 'reactstrap';

export function Battle({ battle, resourceInfo }) {
  const { items, winners } = battle;
  return (
    <CardGroup>
      {items && items.map((item, i) => (
        <Card
          key={i}
          body
          className="text-center"
          inverse={winners.includes(i) ? true : undefined}
          color={winners.includes(i) ? 'primary' : undefined}
        >
          <p>
            {item.name}<br/>
            <Badge>
              {resourceInfo.scoreDescription}: {resourceInfo.getScoreText(item)}
            </Badge>
          </p>
        </Card>
      ))}
    </CardGroup>
  );
}

