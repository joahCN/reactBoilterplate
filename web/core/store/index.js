import { createStore, applyMiddleware } from 'redux';
import createMiddleware from '../utils/clientMiddleware';

// import ApiClient from '../utils/ApiClient';

// const apiClient = new ApiClient();

export default function (reducer, middlewares, initialData) {
    // Sync dispatched route actions to the history
    // const reduxRouterMiddleware = routerMiddleware(history);
    //createMiddleware(apiClient), 
    // const sagaMiddleware = createSagaMiddleware();
    // const middleware = [reduxRouterMiddleware];

    // const finalCreateStore = applyMiddleware(...middlewares)(_createStore);
    // return finalCreateStore(reducer, initialData);

    return createStore(
        reducer,
        applyMiddleware(...middlewares)
    )

}
