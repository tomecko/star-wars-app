import React from 'react';
import { Card, CardBody, Spinner } from 'reactstrap';

export function Loading() {
  return (
    <Card>
      <CardBody>
        <Spinner type="grow" size="sm" color="primary" />{' '}
        Loading…
      </CardBody>
    </Card>
  );
}

