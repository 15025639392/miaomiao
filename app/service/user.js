const Service = require('egg').Service
const jwt = require('jsonwebtoken')
class UserService extends Service{
    get User(){
        return this.app.model.User
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
}

module.exports = UserService