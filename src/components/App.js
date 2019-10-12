import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useMachine } from '@xstate/react';

import { machine } from '../config';

import { Battle } from './Battle';
import { Failure } from './Failure';
import { Footer } from './Footer';
import { Header } from './Header';
import { Loading } from './Loading';
import { Menu } from './Menu';
import { Scores } from './Scores';

export function App(props) {
  const [current, send] = useMachine(props.machine || machine);
  useEffect(() => {
    send('INIT');
  }, [send])

  return (
    <Container>
      <Row>
        <Col xs="12" md="8" lg="6">
          <Header />
          <Scores scores={current.context.scores} />

          {current.matches('loading') ? <Loading /> : ''}

          {current.matches('failure') ? (
            <Failure error={current.context.error} send={send} />
           ) : ''}

          {current.matches('menu') ? (
            <Menu resourceInfo={current.context.resourceInfo} send={send} />
           ) : null}

          {current.matches('battle') && current.context.battle
            ? <Battle
                battle={current.context.battle}
                resourceInfo={current.context.resourceInfo}
              />
            : null}

          <Footer />
        </Col>
      </Row>
    </Container>
  );
}

