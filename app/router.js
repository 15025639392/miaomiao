/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // const { router, controller, middleware, io } = app;
  // const auth = middleware.auth()
  // router.prefix('/api/v1')
  // //-------- 用户相关 ------------
  // router.post('/user/create', controller.user.create);
  // router.post('/user/update', auth, controller.user.update);
  // router.post('/user/login', controller.user.login);
  // router.get('/getUser', app.middleware.auth({required:false}), controller.user.getUser);
  // // 获取当前用户
  // router.get('/currentuser', auth, controller.user.getCurrentUser);
  // // 获取用户清单
  // router.get('/userlist', controller.user.getUserList);

  // router.post('/attention',controller.user.attention);
  // //-------- 用户相关 ------------

  // router.post('/article/create',auth, controller.article.create);
  // router.post('/article/update',auth, controller.article.update);
  // router.post('/article/delete',auth, controller.article.delete);
  // router.get('/article',controller.article.getList);
  // router.get('/my_article',auth,controller.article.getList);
  // router.get('/my_sub_article',auth,controller.article.getList);
  // router.get('/article/detail', controller.article.getArticleDetail);

  // router.post('/sign',controller.sign.getSign);

  // router.get('/getwater',controller.water.getwater);
  // router.get('/initWater',controller.water.initWater);

  // router.get('/getWeather',controller.weather.getWeather);


  // router.post('/subscription',auth, controller.subscription.subscribe);
  
  // console.log(io)
  // io.of('/').route('chat', controller.chat.ping);
};
