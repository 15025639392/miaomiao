const Controller = require('egg').Controller;

class SignController extends Controller {

  async getSign() {
    const { ctx } = this;
    const body = ctx.request.body
    const res = await ctx.helper.sign(body.jsapi_ticket,body.url)
    console.log(res)
    // 4.发送响应
    this.ctx.body = res
  }
}

module.exports = SignController;
