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
    No_USER: 'invalid emailid',
    INTERNAL: 'internal error',
    BAD_PASS: 'invalid password',
    EXPIRE:   'user expired',
    USER_EXISTS:'username already taken', 
  }

let getMenstrualCycle =()=>{
    const menCycle = new Map();
    menCycle.set(1,'28 Days');
    menCycle.set(2,'30 Days');
    menCycle.set(3,'Other');
    return menCycle;
}

let pragnencyCycle = ()=>{
    const pregCycle = new Map();
    pregCycle.set(1,'never pragnent and dont want to get pregnent');
    pregCycle.set(2,'never pregnent but want to get pregnent');
    pregCycle.set(3,'pregnent many times');
    return pregCycle;
}


let crampsCycle = ()=>{
    const crampsCycles = new Map();
    crampsCycles.set(1,'experience pain');
    crampsCycles.set(2,'do not experience pain');
    return crampsCycles;
}

let bleedCycle = ()=>{
    const bleedCycles = new Map();
    bleedCycles.set(1,'heavy bleeding');
    bleedCycles.set(2,'normal bleeding');
    bleedCycles.set(3,'light bleeding');
    return bleedCycles;
}

let currentLife = ()=>{
    const lifestyle = new Map();
    lifestyle.set(1,'smoking');
    lifestyle.set(2,'alcohol consumption');
    lifestyle.set(3,'frequently staying up');
    lifestyle.set(4,'feeling stressed out');
    lifestyle.set(5,'None of the above');
    return lifestyle;
}


module.exports = {
    getResponseHeaders,
    user_error,
    getContentType,
    postErrorResponse,
    varifyToken,
    currentLife,
    bleedCycle,
    pragnencyCycle,
    crampsCycle,
    getMenstrualCycle
}