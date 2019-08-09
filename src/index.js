import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

// Store
import { Provider } from 'react-redux';
import store from './store/store';

let data = [1,2,3,4,5]

let listShield = [
    'Agency',
    'Amateur',
    'Amateur-v2',
    'Amateur-v3',
    'Banshea'
]

store.dispatch({
    type : 'LIST_MASCOT',
    payload : data
});
store.dispatch({
    type : 'LIST_SHIELD',
    payload : listShield
});
store.dispatch({
    type : 'LIST_BACKGROUND',
    payload : data
});

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
