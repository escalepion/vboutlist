import React from 'react'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'
import classNames from 'classnames'

/* ... */

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <div className='undo-redo-container'>
    <button onClick={onUndo} className={classNames('button undo-button', {disabled: !canUndo})} disabled={!canUndo}>
      Undo
    </button>
    <button onClick={onRedo} className={classNames('button', {disabled: !canRedo})} disabled={!canRedo}>
      Redo
    </button>
  </div>
)

const mapStateToProps = state => {
  return {
    canUndo: state.addedGrudges.past.length > 0,
    canRedo: state.addedGrudges.future.length > 0
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo())
  }
}

UndoRedo = connect(mapStateToProps, mapDispatchToProps)(UndoRedo)

export default UndoRedo