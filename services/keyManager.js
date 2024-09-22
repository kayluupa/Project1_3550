const jose = require('node-jose');
let keyStore = jose.JWK.createKeyStore();
let keys = [];

// Generate a new RSA key pair and store it
async function generateKey() {
    const key = await keyStore.generate("RSA", 2048, { use: 'sig', alg: 'RS256' });
    const keyObj = {
        kid: key.kid,
        key,
        expires: Date.now() + 3600 * 1000 // Key expires in 1 hour
    };
    keys.push(keyObj);
    return keyObj;
}

// Get valid (non-expired) keys
function getValidKeys() {
    return keys.filter(key => key.expires > Date.now());
}

// Get an expired key for testing purposes
function getExpiredKey() {
    return keys.find(key => key.expires < Date.now());
}

module.exports = { generateKey, getValidKeys, getExpiredKey };
