/**
 * Created by mac on 16/7/15.
 */
import * as devConfig from "./dev";
import * as prodConfig from "./prod"

let apiConfig = {};

if(process.env.NODE_ENV === "production") {
    apiConfig = prodConfig;
} else {
    apiConfig = devConfig;
}

export default {apiConfig};