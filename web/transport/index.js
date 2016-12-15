/**
 * Created by mac on 16/12/12.
 */

import apiClient from "../core/utils/ApiClient";

// let apiClient = new ApiClient();

export function login(userInfo) {
    return apiClient.post("login", {data: userInfo});
}
