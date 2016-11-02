/**
 * Created by mac on 16/7/18.
 */
import React from 'react';
import {Route} from 'react-router';
import Index from "./components/index/index";
// import Login from "./components/login/index";


const routes = (
  <Route path="/" component={Index}>
    <Route path="login" getComponent={(nextState, cb) => {
        require.ensure([], function (require) {
            cb(null, require('./components/login/index'))
        });
    }}
    />
  </Route>
);

export default routes;

//to dynamic load components, please refer to https://github.com/reactjs/react-router/blob/master/examples/huge-apps/app.js
