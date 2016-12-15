/**
 * Created by mac on 16/12/8.
 */

export let login = (userInfo)=>{
    return {
        type: "SAGA_LOGIN_USER",
        userInfo: userInfo
    }
};