module.exports = () =>{
    return async (ctx,next)=>{
        // 1.获取请求头中的token数据
        let token = ctx.headers['authorization']
        token= token?token.split('Bearer ')[1]:null
        // 2.验证token，无效401
        if(!token){
            ctx.throw(401)
        }
        try {
            console.log(token)
            // 3.有效，根据userId获取用户数据挂载到ctx中给后续的中间间使用
            const data = ctx.service.user.verifyToken(token)
            ctx.user = await ctx.model.User.findById(data.userId)
            console.log(ctx.user)
        } catch (error) {
            ctx.throw(401)
        }
        
        await next()
        // 4.next执行后续中间间
    }
}