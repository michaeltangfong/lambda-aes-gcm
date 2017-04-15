var crypto = require('crypto');
var    algorithm = 'aes-256-gcm';
var  key = '3zTvzr3p67VC61jmV54rIYu1545x4TlY';
// do not use a global iv for production,
// generate a new one for each encryption
var iv = '60iP0h6vJoEa';

function encrypt(text) {
    var cipher = crypto.createCipheriv(algorithm, key, iv)
    var encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex');
    var tag = cipher.getAuthTag();
    return {
        content: encrypted,
        tag: tag
    };
}

function decrypt(encrypted) {
    var decipher = crypto.createDecipheriv(algorithm, key, iv)
    decipher.setAuthTag(encrypted.tag);
    var dec = decipher.update(encrypted.content, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}

exports.handler = (event, context, callback) => {
    var hw = encrypt("hello world")
    console.log("Cipher: " + hw);

    var ha = decrypt(hw);

    callback(null, ha);
};
