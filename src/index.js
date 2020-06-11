import 'bootstrap/dist/css/bootstrap.css';
import './style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { loggedIn } from './actions';

const store = createStore(rootReducer, applyMiddleware(thunk));

if(localStorage.getItem('logged-in') === 'true'){
  store.dispatch({
    type: 'SIGN_IN',
    payload: {}
  });

  loggedIn()(store.dispatch);
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);