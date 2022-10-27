module.exports = (options={required:true}) =>{
    return async (ctx,next)=>{
        // 1.获取请求头中的token数据
        let token = ctx.headers['authorization']
        token= token?token.split('Bearer ')[1]:null
        if(token){
            try {
                // 3.有效，根据userId获取用户数据挂载到ctx中给后续的中间间使用
                const data = ctx.service.user.verifyToken(token)
                ctx.user = await ctx.model.User.findById(data.userId)
            } catch (error) {
                ctx.throw(401)
            }
        }else if(options.required){
            ctx.throw(401)
        }
        
        await next()
        // 4.next执行后续中间间
    }
}