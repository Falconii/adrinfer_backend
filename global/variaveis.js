let ACESSTOKEN = "f69223e0d7af02833b3ae7d771052dddb01f39a1";

let REFRESH_TOKEN = "64019c25fd1e3a32eb72f141c9b50981be944860"

exports.setAcessToken = function(value) {

    ACESSTOKEN = value;

    return;

}

exports.getAcessToken = function() {

    return ACESSTOKEN;

}

exports.setRefreshToken = function(value) {

    REFRESH_TOKEN = value;

    return;

}

exports.getRefreshToken = function(value) {

    return REFRESH_TOKEN;

}


exports.getCredentialsBase64 = function(cliente) {
    let credBase64 = "";

    if (cliente == 1) {
        const clientId = "ad4ef071ff95286ac58508d99f21c195266fab6a";
        const secretClient = "137452b9150016a50c705116480a86982056c287d50b0909f60378e82aa0";
        const credentials = clientId + ":" + secretClient;
        let buff = Buffer.from(credentials);
        credBase64 = buff.toString('base64')
    }

    return credBase64;

}