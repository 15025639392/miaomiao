const crypto = require('crypto')
const _ = require('lodash')
exports.md5 = (str) => {
  return crypto.createHash('md5').update(str).digest('hex')
}

exports.getNumberId = (id) => {
  return +Math.random().toString(10).substring(2,10)
}

exports._ = _



var createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

var createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000) + '';
};

var raw = function (args) {
  var keys = Object.keys(args);
  keys = keys.sort()
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};

/**
* @synopsis 签名算法 
*
* @param jsapi_ticket 用于签名的 jsapi_ticket
* @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
*
* @returns
*/
var sign = function (jsapi_ticket, url) {
  var ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url: url
  };
  var string = raw(ret);
  console.log(string)
  // jsSHA = require('jssha');
  // crypto.createHash('sha1').update(string).digest('hex')
  // shaObj = new jsSHA(string, 'TEXT');
  ret.signature = crypto.createHash('sha1').update(string).digest('hex');

  return ret;
};

exports.sign = sign;