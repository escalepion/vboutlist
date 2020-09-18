import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import id from 'uuid/v4';

import { ADD_GRUDGE, TOGGLE_FORGIVENESS } from './sagas/types';
import Grudges from './Grudges';
import NewGrudge from './NewGrudge';
import UndoRedo from './containers/undoRedo';

import initialState from './initialState';

const Application = (props) => {
  const [grudges, setGrudges] = useState(initialState);

  const addGrudge = (grudge) => {
    grudge.id = id();
    grudge.forgiven = false;
    props.dispatch({ type: ADD_GRUDGE, payload: grudge });
  };

  const toggleForgiveness = (id) => {
    props.dispatch({ type: TOGGLE_FORGIVENESS, payload: { id } });
  };

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <UndoRedo />
      <Grudges grudges={props.grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { grudges: state.addedGrudges.present.grudges };
};

export default connect(mapStateToProps, null)(Application);
