//将shp文件的数据坐标系由GCJ-02改为WGS-84
const Service = require('egg').Service
class SubscriptionService extends Service {
  get Subscription() {
    return this.app.model.Subscription
  }
  get User(){
      return this.app.model.User
  }

  async toggle(channel) {
    // 查询目标用户
    const channelData = await this.service.user.findById(channel)
    // 查询是否订阅
    const user = await this.Subscription.findOne({
      user: this.ctx.user._id,
      channel
    })
    
    let channelDataNew = {}
    let isChannel = false
    
    if (user) {
      await this.Subscription.deleteOne({
        user: this.ctx.user._id,
        channel
      })
      console.log('no------------')
      channelDataNew = await this.User.findByIdAndUpdate(channel, {
        subscribersCount: channelData.subscribersCount - 1
      }, {
        new: true
      })
    } else {
      await new this.Subscription({
        user: this.ctx.user._id,
        channel
      }).save()
      console.log('yes------------',channelData.subscribersCount)
      channelDataNew = await this.User.findByIdAndUpdate(channel, {
        subscribersCount: channelData.subscribersCount + 1
      }, {
        new: true
      })
      isChannel = true
    }
    return {
      ...this.ctx.helper._.pick(channelDataNew,[
        'subscribersCount','_id','username','phone','avatar'
      ]),
      isChannel
    }
  }
}


module.exports = SubscriptionService