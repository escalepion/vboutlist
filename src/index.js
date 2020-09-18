import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import { rootSaga } from './sagas/sagas';
import Application from './Application';

import './styles.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const rootElement = document.getElementById('root');

ReactDOM.render(<Provider store={store}><Application /></Provider>, rootElement);
