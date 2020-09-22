import React, { useState } from 'react';

import id from 'uuid/v4';
import Grudges from './Grudges';
import NewGrudge from './NewGrudge';
import UndoRedo from './containers/undoRedo';

import initialState from './initialState';

const Application = (props) => {
  const [history, setHistory] = useState({ past: [], present: [...initialState], future: [] });

  const addGrudge = (grudge) => {
    grudge.id = id();
    grudge.forgiven = false;
    setHistory({ past: [ ...history.past, history.present ], present: [ grudge, ...history.present ], future: [] });
  };

  const toggleForgiveness = (id) => {
    const currentGrudges = history.present;
    const mappedGrudges = currentGrudges.map((grudge) => {
      if (grudge.id !== id) return grudge;
      return { ...grudge, forgiven: !grudge.forgiven };
    });
    setHistory({ past: [ ...history.past, history.present ], present: [ ...mappedGrudges ], future: [] });
  };

  const handleUndo = () => {
    const currentHistory = history;
    const { past = [], present = [], future = [] } = currentHistory;
    if (past.length) {
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      setHistory({ past: newPast, present: previous, future: [ present, ...future ] });
    };
  };

  const handleRedo = () => {
    const currentHistory = history;
    const { past = [], present = [], future = [] } = currentHistory;
    if (future.length) {
      const next = future[0];
      const newFuture = future.slice(1);
      setHistory({ past: [ ...past, present ], present: next, future: newFuture });
    }
  };

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <UndoRedo handleRedo={handleRedo} handleUndo={handleUndo} canUndo={!!history.past.length} canRedo={!!history.future.length} />
      <Grudges grudges={history.present} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
