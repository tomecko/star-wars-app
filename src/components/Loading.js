import React from 'react';
import { Card, Spinner } from 'reactstrap';

export function Loading() {
  return (
    <Card body>
      <Spinner type="grow" size="sm" color="primary" />{' '}
      Loading…
    </Card>
  );
}

