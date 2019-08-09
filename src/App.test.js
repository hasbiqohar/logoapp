import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

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

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
