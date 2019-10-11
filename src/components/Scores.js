import React from 'react';
import { Card, Progress } from 'reactstrap';

import { getScoresMax } from '../helpers';

export function Scores({ scores }) {
  return (
    <Card body>
      {Object.keys(scores).map(i => (
        <div key={i}>
          Player {Number(i) + 1}
          <Progress value={Math.max(scores[i], 0.5)} max={getScoresMax(scores)}>
            {scores[i] > 0 ? scores[i] : '0'}
          </Progress>
        </div>
      ))}
    </Card>
  );
}

