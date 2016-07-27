/**
 * Created by mac on 16/7/18.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/index';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import reduces from "../reducers/index";

import routes from "../router"

const store = createStore(reduces, browserHistory, window.__data);
const history = syncHistoryWithStore(browserHistory, store);


const component = (
    <Router history={history} router={routes}>
    </Router>
);

export default function mount(dest) {
    ReactDOM.render(
        <Provider store={store} key="provider">
            {component}
        </Provider>,
        dest
    );
}
