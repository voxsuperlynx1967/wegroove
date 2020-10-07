import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './store/configureStore'
import { Provider } from 'react-redux';
const store = configureStore();
if (process.env.Node_ENV !== 'production') {
  window.store = store;
}


ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
