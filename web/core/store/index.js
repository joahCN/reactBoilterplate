import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from '../utils/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import ApiClient from '../utils/ApiClient';

let apiClient = new ApiClient();

export default function createStore(reducer, history, initialData) {
    // Sync dispatched route actions to the history
    const reduxRouterMiddleware = routerMiddleware(history);

    const middleware = [createMiddleware(apiClient), reduxRouterMiddleware];

    let finalCreateStore = applyMiddleware(...middleware)(_createStore);

    return finalCreateStore(reducer, initialData);
    
}
