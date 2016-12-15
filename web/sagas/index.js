/**
 * Created by mac on 16/12/12.
 */

import { call, fork, select, put, take} from 'redux-saga/effects';
import {login} from "../transport/index";
import selector from "../selectors/index";

function* loginUser() {
    let action = yield take("SAGA_LOGIN_USER");
    let userInfo = action.userInfo; //yield select(selector.user.getLoginUser);
    let result = yield call(login, userInfo);
    yield put({type: 'login', result})
}

export default function* rootSagas() {
    
    yield fork(loginUser)
}