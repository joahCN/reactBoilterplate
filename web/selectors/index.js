/**
 * Created by mac on 16/12/8.
 */
import * as _ from 'lodash';

import userSelectors from "./user";

const fromRoot = (path, selector) => {
    return (state, ...props) => {
        return selector(_.get(state, path), ...props);
    }
};

const globalizeSelectors = ({selectors, path}) => {
    return selectors.reduce((finals, selector)=>{
        finals[selector.name] = fromRoot(path, selector);
        return finals;
    }, {});
};

let globleSelectors = {};

[userSelectors].forEach((selectorsObj)=>{
    globleSelectors[selectorsObj.name] = globalizeSelectors(selectorsObj);
});

export default globleSelectors;