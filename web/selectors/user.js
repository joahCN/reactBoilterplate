/**
 * Created by mac on 16/12/8.
 */
import {PATHS} from "../reducers/index"

let getLoginUser = (state)=>{
    return state.loginUser
};

let getUserFriends = (state) => {
    return state.friends  
};

export default {
    name: 'user',
    path: PATHS.user,
    selectors: [
        getLoginUser,
        getUserFriends
    ]
}