import React from 'react';
import { Card } from 'reactstrap';

export function Footer() {
  return (
    <footer>
      <Card body>
        <ul>
          <li>
            For demonstration purposes fetching data fails
            with 50% probability on the first attempt.
          </li>
          <li>
            Currently the app loads all data on startup.
            It does not scale and may take some time especially if SW API is slow :(
            Alternatively it would be possible to get random pair
            of ids on the client side and then fetch two items by their id.
            That would be correct only if made strong assumptions
            about all ids (i.e. ids are always subsequent integers).
            On the other hand the current solution (downloading all data) results in
            smooth and instantaneous interactions during the game.
          </li>
          <li>
            As a challenge I decided to try out a new approach
            toward handling app logic and configured state machine (XState).
            Naturally it would also be possible to set up Redux store
            or just use component's state as the app is relatively simple.
          </li>
        </ul>
      </Card>
    </footer>
  );
}

