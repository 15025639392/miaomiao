const Service = require('egg').Service
const jwt = require('jsonwebtoken')
class UserService extends Service{
    get User(){
        return this.app.model.User
    }
    get Subscription() {
        return this.app.model.Subscription
      }
    findByUsername(username){
        return this.User.findOne({username})
    }
    findByPhone(phone){
        return this.User.findOne({phone}).select('+password')
    }
    findByEmail(email){
        return this.User.findOne({email})
    }

    findById(id){
        return this.User.findById(id)
    }

    findByOpenId(openId){
        return this.User.findOne({openId})
    }
    async createUser(data){
        data.password = this.ctx.helper.md5(data.password)
        const user = new this.User(data)
        await user.save()
        return user
    }
    async updateUser(data){
        const user = await this.User.findByIdAndUpdate(this.ctx.user._id,data,{
            new: true
        })
        return user
    }
    createToken(data){
        return jwt.sign(data,this.app.config.jwt.security,{
            expiresIn:this.app.config.jwt.expiresIn
        })
    }

    verifyToken(token){
        return jwt.verify(token,this.app.config.jwt.security)
    }

    async getCurrentUser(){
        await this.ctx.user
    }

    async getUserList(){
        const userList = await this.User.find()
        return userList.map(r=>this.ctx.helper._.pick(r,['avatar','_id','username']))
    }

    // 关注
    async attention(){
        const body = this.ctx.request.body
        body.userId
        return
    }

    // 取消关注
    async cancelAttention(){
        const body = this.ctx.request.body
        body.userId
        return
    }

    async subscribe(userId,channel){
        const record = await this.Subscription.findOne({
            user:userId,
            channel
        })

        let isSubscribtion = false
        const user = await this.User.findById(channel)
        if(!record){
            await new this.Subscription({
                user:userId,
                channel
            }).save()
            user.subscribersCount++
            isSubscribtion=true
            await user.save()
        }else{
            await record.remove()
            user.subscribersCount--
            await user.save()
        }
        // 1.检查是否已经订阅
        // 2.没有订阅，添加订阅
        // 3.返回用户信息
        return {
            ...this.ctx.helper._.pick(user,[
                'subscribersCount','_id','username','phone','avatar'
            ]),
            isSubscribtion
        }
    }
}

module.exports = UserService