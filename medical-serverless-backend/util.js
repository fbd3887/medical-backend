const getContentType = (headers) => {
    var content_type = headers['Content-Type'];
    return content_type;
}

const varifyToken = (headers) => {
    var token = '';
    if(headers.Authorization === undefined){
        return token;
    }
    var bearerToken = headers.Authorization;
    token = bearerToken.replace('Bearer ', '')
    return token;
} 

const getResponseHeaders = () => {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Origin': '*'
    }
}

let postErrorResponse =(err)=>{ 
    return {
    statusCode: err.statusCode ? err.statusCode : 500,
    headers: util.getResponseHeaders(),
    body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error"
    })
}};

const user_error = {
    DEVICE_ERROR : 'device not available. Add the device first',
    NO_AUTH: 'Not authorized user',
    NO_AUTH_TOKEN: 'Authorization token not included',
    USER_NAME: 'user doesnot exixts',
    DEVICE_EXISTS : 'deviceId already exixts',
    No_USER: 'invalid username/password',
    INTERNAL: 'internal error',
    BAD_PASS: 'invalid password',
    EXPIRE:   'user expired',
    USER_EXISTS:'username already taken', 
  }


module.exports = {
    getResponseHeaders,
    user_error,
    getContentType,
    postErrorResponse,
    varifyToken
}