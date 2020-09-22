import React from 'react'
import classNames from 'classnames'

/* ... */

let UndoRedo = ({ canUndo, canRedo, handleUndo, handleRedo }) => (
  <div className='undo-redo-container'>
    <button onClick={handleUndo} className={classNames('button undo-button', {disabled: !canUndo})} disabled={!canUndo}>
      Undo
    </button>
    <button onClick={handleRedo} className={classNames('button', {disabled: !canRedo})} disabled={!canRedo}>
      Redo
    </button>
  </div>
)

export default UndoRedo