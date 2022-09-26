const Mongoose = require('mongoose');
const path = require('path');
module.exports = app => {
    app.addSingleton('mongoose', createMongoose);
    app.mongoose = Mongoose;
    loadModelToApp(app);
};

/**
 * 创建 app.mongoose 的单例
 * @param {*} config
 * @param {*} app
 * @return
 */
async function createMongoose(config, app) {

    // 监听连接事件
    Mongoose.connection.on('connected', function () {
        app.coreLogger.info(`[egg-mongoose-v6] ${config.url} connected successfully`);
    });

    // 监听重连事件
    Mongoose.connection.on('reconnected', function () {
        app.coreLogger.info(`[egg-mongoose-v6] ${config.url} reconnected successfully`);
    });

    // 连接数据 这里url和options就是 config.default.js中配置的
    try {
        await Mongoose.connect(config.url, config.options);
    } catch (err) {
        err.message = `[egg-mongoose-v6] ${err.message}`;
        app.coreLogger.error(err);
    }

    // 监听错误
    Mongoose.connection.on('error', function (err) {
        err.message = `[egg-mongoose-v6] ${err.message}`;
        app.coreLogger.error(err);
    });

    return Mongoose;
}

/**
 * 加载 app/model中的模型
 * @param {*} app
 */
function loadModelToApp(app) {
    const dir = path.join(app.config.baseDir, 'app/model');
    app.loader.loadToApp(dir, 'model', {
        caseStyle: 'upper',
    });
}