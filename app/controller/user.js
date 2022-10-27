const Controller = require('egg').Controller;

class UserController extends Controller {
  async update() {
    const { ctx } = this;
    const body = ctx.request.body
    ctx.validate({
        avatar:{
            type:'string'
        }
    })
    const user = await this.service.user.updateUser(body)
    // 4.发送响应
    this.ctx.body = {
        user:{
            id:user._id,
            email:user.email,
            username:user.username,
            channelDesription:user.channelDesription,
            avatar:user.avatar,
            token:this.ctx.headers['authorization']
        }
    }
  }

  async create(){
    const { ctx } = this;
    const body = ctx.request.body
    ctx.validate({
        username:{
            type:'string'
        },
        password:{
            type:'string'
        }
    },body)

    if(body.phone&&await this.service.user.findByPhone(body.phone)){
        ctx.throw(422,'账户已存在')
    }
    if(await this.service.user.findByUsername(body.username)){
        ctx.throw(422,'用户已存在')
    }

    // 1.数据校验
    // 2.保存数据
    const user = await this.service.user.createUser(body)
    // 3.生成token
    const token = this.service.user.createToken({
        userId:user._id
    })
    // 4.发送响应
    this.ctx.body = {
        user:{
            id:user._id,
            ...this.ctx.helper._.pick(user,[
                'username',
                'channelDesription',
                'avatar',
                'nickname'
            ]),
            token
        }
    }
  }

  async getCurrentUser(){
    // 1. 验证token
    // 2. 获取用户
    // 3. 发送响应
    const user = this.ctx.user
    this.ctx.body = {
        user:{
            id:user._id,
            ...this.ctx.helper._.pick(user,[
                'username',
                'channelDesription',
                'avatar',
                'nickname'
            ]),
            token:this.ctx.headers['authorization']
        }
    }
  }

  async login(){
    const {ctx} = this;
    const body = ctx.request.body;
    ctx.validate({
        phone:{
            type:'string'
        },
        password:{
            type:'string'
        }
    },body)
    const md5Pwd = this.ctx.helper.md5(body.password)
    const user = await this.service.user.findByPhone(body.phone)
    if(!user){
        thix.ctx.throw(422,'用户不存在')
    }
    if(md5Pwd!==user.password){
        thix.ctx.throw(422,'密码不正确')
    }
    // 3.生成token
    const token = this.service.user.createToken({
        userId:user._id
    })
    // 4.发送响应
    this.ctx.body = {
        user:{
            id:user._id,
            ...this.ctx.helper._.pick(user,[
                'username',
                'channelDesription',
                'avatar',
                'nickname'
            ]),
            token
        }
    }
  }

  async getUserList(){
    const userList = await this.service.user.getUserList()
    this.ctx.body = {
        userList
    }
  }

  async attention(){
    await this.service.user.attention()
    this.ctx.body = {
        message:'ok'
    }
  }

  async getUser(){
    // 1.获取订阅状态
    let isSubscribtion = false
  
    if(this.ctx.user){
        // 检查订阅记录
        const record = await this.app.model.Subscription.findOne({
            user:this.ctx.user._id,
            channel: this.ctx.request.query.channel
        })
        if(record){
            isSubscribtion = true
        }
    }
    // 2.获取用户信息
    const user = await this.app.model.User.findById(this.ctx.request.query.channel)
    // 3.发送响应
    this.ctx.body = {
        user:{
            ...this.ctx.helper._.pick(user,[
                'subscribersCount','_id','username','phone','avatar'
            ]),
            isSubscribtion
        }
    }
  }
}

module.exports = UserController;
