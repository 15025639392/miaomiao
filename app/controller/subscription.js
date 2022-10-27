const Controller = require('egg').Controller;
class SubscriptionController extends Controller {
  async toggle() {
    const { ctx } = this;
    const body = ctx.request.body
    const data = await this.service.subscription.toggle(body.channel)
    ctx.body = data
  }

  async subscribe(){
    // 1.用户不能订阅自己
    const userId = this.ctx.user._id
    const channel = this.ctx.request.body.channel
    if(userId.equals(channel)){
      this.ctx.throw(422,'用户不能关注自己')
    }
    // 2.添加订阅
    const user = await this.service.user.subscribe(userId,channel)
    // 3.发送响应逻辑

    this.ctx.body = {
      user
    }
  }
}

module.exports = SubscriptionController;
