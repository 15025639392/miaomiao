/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1662998646581_4409';

  // add your middleware config here
  config.middleware = [
    'errorHandler',
    // 'jwt'
  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // recommended
  config.mongoose = {
    client: {
      url: 'mongodb://localhost/my_database',
      options: {
        useUnifiedTopology:true,
        useNewUrlParser: true, 
        useCreateIndex: true
      },
      // mongoose global plugins, expected a function or an array of function and options
      plugins: [],
    },
  };


  config.security = {
    csrf:{
      enable:false
    }
  }

  config.jwt={
    enable: true,
    security:'961448793903793318528971',
    expiresIn:'100d'
  }

  // config.io = {
  //   init: { }, // passed to engine.io
  //   namespace: {
  //     '/': {
  //       connectionMiddleware: [],
  //       packetMiddleware: [],
  //     },
  //   },
  //   redis: {
  //     host: '127.0.0.1',
  //     port: 6379
  //   }
  // }

  return {
    ...config,
    ...userConfig,
  };
};
