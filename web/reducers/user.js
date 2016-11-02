
// import Immutable from "immutable";

let initialState = {
    loginUser: {
        name: ""
    }
};

export default (state = initialState, action = {})=>{
    switch (action.type) {
        case 'login' :
            let userInfo = action.userInfo;
            
            return {...state, loginUser: userInfo};

        //let imState = Immutable.fromJS(state).updateIn([billingProp, "items"], (items)=>{
        //    return items.concat(billings);
        //});
        //let hasMore = billings.length == state[billingProp].pageSize;
        //if(hasMore) {
        //    imState = imState.setIn([billingProp, "page"], parseInt(state[billingProp].page) + 1);
        //}
        //imState = imState.setIn([billingProp, "hasMore"], hasMore);
        //return imState.toJSON();
            
        default:
            return state;
    }
}

// export let login = (userInfo)=>{
//     return {
//         types: ["loginStart", "loginSuccess", "loginFailure"],
//         promise: (apiClient) => {
//             return apiClient.post("login", {data: userInfo});
//         }
//     }
// };

export let login = (userInfo)=>{
    return {
        type: "login",
        userInfo: userInfo
    }
};