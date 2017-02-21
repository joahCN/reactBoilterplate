/**
 * Created by mac on 16/7/18.
 */

/* eslint react/jsx-indent: "off" */

import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/index';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import * as middlewaresFactory from "./middleware/index";
import rootSagas from "../sagas/index";

import reduces from "../reducers/index";

import getRoutes from "../router";

let sagasMiddleware = middlewaresFactory.getSagasMiddleware();
let middlewares = [
    middlewaresFactory.getRouterMiddleware(browserHistory),
    sagasMiddleware
];

const store = createStore(reduces, middlewares, window.__data);
const history = syncHistoryWithStore(browserHistory, store);

sagasMiddleware.run(rootSagas);

const component = (
    <Router history={history} routes={getRoutes(store.getState())} />
);

export default function mount(dest) {
    ReactDOM.render(
        <Provider store={store} key="provider">
            {component}
        </Provider>,
        dest
    );
}

