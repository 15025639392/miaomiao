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


function getZhishus(params){
  //垂钓气象指数
  
  /**
   *  1级 C=5 气象条件极佳，非常利于垂钓 
      2级 C=4 气象条件较好，利于垂钓 
      3级 C=3 气象条件尚可，可考虑垂钓 
      4级 C=2 气象条件偏差，不太利于垂钓 
      5级 C=1 气象条件很差，不利垂钓 
      6级 C=0 气象条件极差，不考虑垂钓 
      计算公式：C= X1 + X2 + X3 + X4 + X5 （B.1） 

      X1的确定： 
      春季：最高气温12到30度，最高气温-最低气温=4到6度。符合条件：+1，不符合：0 
      夏季：最高气温18到30度，最高气温-最低气温=6到8度。符合条件：+1，不符合：0 
      秋季：最高气温12到30度，最高气温-最低气温=4到6度。符合条件：+1，不符合：0 
      冬季：最高气温8到25度，最高气温-最低气温=2到4度。符合条件：+1，不符合：0 
      X2的确定： 
      天气现象：有利条件：晴、小雨、雾转晴、雷阵雨转晴、强冷空气刚影响或影响前。X2符合条件：+1，不符合条件：0 
      X3的确定： 
      风速：有利条件：1到4级风。X3符合条件：+1，不符合条件：0 
      X4的确定： 
      风向：天气晴好：南风、东南风；雾转晴（春、秋季）：北转南风，偏南风；小雨：南风、北风都有利。X4符合条件：+1，不符合条件：0 
      X5的确定： 
      气压：天气晴好：大于等于1005百帕，阴天或下雨：大于等于1000百帕。X5符合条件：+1，不符合条件：0 
      C 为级数判别值； 
      X1、X2、X3、X4、X5为不同气象因子对垂钓影响的权重值。 
   */
}
