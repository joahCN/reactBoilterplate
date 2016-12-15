/**
 * Created by mac on 16/12/13.
 */
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

export let getRouterMiddleware = (history) =>{
    return routerMiddleware(history);
};

export let getSagasMiddleware = () => {
    return createSagaMiddleware();
};