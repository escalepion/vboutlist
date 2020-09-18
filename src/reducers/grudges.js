import undoable from 'redux-undo';

import {
  ADD_GRUDGE_SUCCESS,
  TOGGLE_FORGIVENESS_SUCCESS
} from '../sagas/types';
import initialGrudges from '../initialState';

const INITIAL_STATE = {
  grudges: initialGrudges,
};

const grudges = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case ADD_GRUDGE_SUCCESS:
        return { ...state, grudges: [action.payload, ...state.grudges] };

      case TOGGLE_FORGIVENESS_SUCCESS:
        let currentGrudges = state.grudges;
        const findedIndex = currentGrudges.findIndex(i => i.id === action.payload.id);
        let newGrudges = [];
        currentGrudges.forEach((grudge, grudgeIndex) => {
          let newGrudge = grudge;
          if (grudge.id === action.payload.id) {
            newGrudge = {...newGrudge, forgiven: !grudge.forgiven};
          }
          newGrudges = [...newGrudges, newGrudge];
        });

        return {...state, grudges: [...newGrudges]};
      default:
       return state;
  }
} 

const undoableGrudges = undoable(grudges);

export default undoableGrudges;
