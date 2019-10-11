import React from 'react';

export function Footer() {
  return (
    <footer>
      <p>
        <small>
          Technical note: Currently the app loads all data on startup.
          It may take some time, especially if SW API is slow :(
          It would be possible to get random pair of ids on the client side
          and then fetch two items by their id.
          That would be correct only if made strong assumptions
          about all ids (i.e. ids are always subsequent integers).
          On the other hand downloading all data means
          smooth and instantaneous interactions during the game.
        </small>
      </p>
      <p>
        <small>
          Technical note #2: I decided to try out a new approach
          toward state management and configured state machine (XState).
          Naturally it would also be possible to set up Redux store
          or just use component's state as the app is rather simple.
        </small>
      </p>
    </footer>
  );
}

