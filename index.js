/**
 * Created by el on 05.07.16.
 */

var obfuscator = require('./obfuscator');
var data = require('./data.json');

var obfuscated = obfuscator(data);
console.log(obfuscated);
