import React from 'react';

export function Footer() {
  return (
    <footer>
      <p>Comments:</p>
      <ul>
        <li>
          For demonstration purposes fetching data fails
          with 50% probability on the first attempt.
        </li>
        <li>
          Currently the app loads all data on startup.
          It may take some time, especially if SW API is slow :(
          It would be possible to get random pair of ids on the client side
          and then fetch two items by their id.
          That would be correct only if made strong assumptions
          about all ids (i.e. ids are always subsequent integers).
          On the other hand downloading all data means
          smooth and instantaneous interactions during the game.
        </li>
        <li>
          I decided to try out a new approach
          toward state management and configured state machine (XState).
          Naturally it would also be possible to set up Redux store
          or just use component's state as the app is relatively simple.
        </li>
      </ul>
    </footer>
  );
}

