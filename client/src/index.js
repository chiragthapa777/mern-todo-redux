import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//redux
import { createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk";
import { Provider } from 'react-redux';

import rootReducer from "./store/reducers/rootReducer"

const store= createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

