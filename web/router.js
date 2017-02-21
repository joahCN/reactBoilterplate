/**
 * Created by mac on 16/7/18.
 */
import React from 'react';
import {Route} from 'react-router';
import Index from "./components/index/index";
// import Login from "./components/login/index";
import selectors from './selectors/index';

const isLogin = (state) =>{
    return (routeState, replace)=>{
        if(routeState.location.pathname == "/login") return;
        let user = selectors.user.getLoginUser(state);
        if(!user) {
            replace('/login');
        }
    };
};

const getRoutes = (state)=>(
  <Route path="/" component={Index} onEnter={isLogin(state)}>
    <Route path="login" getComponent={(nextState, cb) => {
        require.ensure([], function (require) {
            cb(null, require('./components/login/index'))
        });
    }}
    />
  </Route>
);

export default getRoutes;

//to dynamic load components, please refer to https://github.com/reactjs/react-router/blob/master/examples/huge-apps/app.js
