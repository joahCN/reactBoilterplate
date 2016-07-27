/**
 * Created by mac on 16/7/18.
 */
import React from 'react';
import {IndexRoute, Route} from 'react-router';

const rootRoute = {
    childRoutes: [ {
        path: '/',
        // component: require('./components/App'),
        childRoutes: [
            // require('./routes/Calendar'),
            // require('./routes/Course'),
            // require('./routes/Grades'),
            // require('./routes/Messages'),
            // require('./routes/Profile')
        ]
    } ]
};

export default rootRoute;

//to dynamic load components, please refer to https://github.com/reactjs/react-router/blob/master/examples/huge-apps/app.js