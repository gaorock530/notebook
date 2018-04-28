// css styles
// import 'materialize-css/dist/css/materialize.min.css'; // materialize
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap
import 'font-awesome/css/font-awesome.min.css'; // font-awesome.min.css
import './index.scss';
// config
// import {API} from './config/config';
// react core
import React from 'react';
import ReactDOM from 'react-dom';
// dependencies
import { Provider } from 'react-redux';
import store from './App/store/configureStore';
// others
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import style from './consoleStyle';

store.subscribe(() => {
  if (window.localStorage) {
    if (localStorage.getItem('token')) {
      localStorage.setItem('data', JSON.stringify(store.getState()));
    }
  }
})


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'), (e) => {
  console.log('%cWelcome to Schedule App, I\'m Magic, contact me:', style.basic);
  console.log('%cgaorock530@hotmail.com', style.email);
});
registerServiceWorker();
