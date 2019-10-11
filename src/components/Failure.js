import React from 'react';
import { Button, Card, CardBody } from 'reactstrap';

export function Failure({ error, send }) {
  return (
    <Card>
      <CardBody>
        <p>
          Something went wrong
          {error ? ` (details: ${error.message})` : null}.
        </p>
        <Button
          color="danger"
          onClick={() => send('RETRY')}
        >
          let's try again!
        </Button>
      </CardBody>
    </Card>
  );
};
