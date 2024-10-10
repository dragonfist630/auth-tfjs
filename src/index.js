import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
// window.addEventListener('unhandledrejection', (event) => {
//   console.log('Unhandled promise rejection:', event.reason);
//   event.preventDefault();
// });
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
