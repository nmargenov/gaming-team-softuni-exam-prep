const jsonwebtoken = require('jsonwebtoken');
const {promisify} = require('util');

exports.sign = promisify(jsonwebtoken.sign);
exports.verify = promisify(jsonwebtoken.verify);