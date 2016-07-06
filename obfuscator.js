/**
 * Created by el on 05.07.16.
 */

function collectUniq(data) {
    var uniq = {};
    data.forEach(function (item) {
        uniq[item] = (uniq[item] ? uniq[item] : 0) + 1;
    });
    return uniq;
}

var symbols = '-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789';

/**
 * @param {Number} number – число в десятичной
 * @param {Number} radix – основание системы счисления, max 64
 */
var getRadix = function (number, radix) {
    if (radix < 2 || radix > symbols.length) {
        throw new RangeError('radix argument must be between 2 and 64')
    }
    if (number < radix) {
        return symbols[number];
    }
    return '' + getRadix(Math.floor(number / radix), radix) + symbols[number % radix];

};

function generateNames(data) {
    var names = {};
    data.forEach(function (item, index) {
        var newName = getRadix(index + 1, 64);
        var firstSymbol = symbols.indexOf(newName[0]);
        if (firstSymbol > 52) {
            newName = getRadix(firstSymbol, 53) + newName.slice(1);
        }
        names[item] = newName;
    });
    return names;
}

/**
 * @param {Array} data – массив CSS классов
 */
module.exports = function (data) {
    var uniqCounts = collectUniq(data);
    var uniq = Object.keys(uniqCounts);
    uniq.sort(function (a, b) {
        return uniqCounts[b] - uniqCounts[a];
    });
    return generateNames(uniq);
};
