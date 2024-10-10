import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  // Optionally log the error or handle it in some way
  console.log('Unhandled promise rejection:', event.reason);
  event.preventDefault(); // Prevent default logging
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
