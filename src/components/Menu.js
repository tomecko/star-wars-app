import React from 'react';
import { Button, ButtonGroup, Card, CardBody, CardTitle } from 'reactstrap';

import { RESOURCE_INFOS } from '../config';

export function Menu({ resourceInfo, send }) {
  return (
    <Card>
      <CardBody>
        <CardTitle>Please choose battle type.</CardTitle>
        <ButtonGroup>
          {RESOURCE_INFOS.map(info => (
            <Button
              key={info.name}
              color="primary"
              onClick={() => {
                send({
                  type: 'PLAY',
                  resourceInfo: info,
                });
              }}
            >
              {info.name}
              {' '}
              {resourceInfo === info ? <small>(continue)</small> : null}
            </Button>
          ))}
        </ButtonGroup>
      </CardBody>
    </Card>
  );
}

