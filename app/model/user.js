// app/config/user.js
module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
  
    const userSchema = new Schema({
      username: { // 用户名
        type: String,
        required: true
      },
      phone:{
        type: String,
        required: false
      },
      openId: { // openId
        type: String,
        required: false
      },
      unionId:{
        type: String,
        required: false
      },
      nickame: { // 昵称
        type: String,
        required: false
      },
      password: { // 密码
        type: String,
        select: false, // 查询中不包含该字段
        required: true
      },
      avatar: { // 头像
        type: String,
        default: null
      },
      channelDescription: { // 频道介绍
        type: String,
        default: null
      },
      subscribersCount: {
        type: Number,
        default: 0
      }
    },{
      timestamps:true
    })
  
    return mongoose.model('User', userSchema)
  }
  