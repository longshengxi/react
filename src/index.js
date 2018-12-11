import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
import {HashRouter} from 'react-router-dom';

render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>, 
    document.getElementById('root')
);
