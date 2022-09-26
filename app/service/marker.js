const Service = require('egg').Service
const jwt = require('jsonwebtoken')
class MarkerService extends Service{
    get Marker(){
        return this.app.model.Marker
    }
    findByMarkername(markername){
        return this.Marker.findOne({markername})
    }
    findByEmail(email){
        return this.Marker.findOne({email})
    }

    findByOpenId(openId){
        return this.Marker.findOne({openId})
    }
    async createMarker(data){
        data.user = this.ctx.user._id;
        // console.log(this.ctx)
        const marker = new this.Marker(data)
        this.Marker.populate(marker,'user')
        await marker.save()
        return marker
    }
    async updateMarker(data){
        const marker = await this.Marker.findByIdAndUpdate(this.ctx.marker._id,data,{
            new: true
        })
        return marker
    }
    createToken(data){
        return jwt.sign(data,this.app.config.jwt.security,{
            expiresIn:this.app.config.jwt.expiresIn
        })
    }

    verifyToken(token){
        return jwt.verify(token,this.app.config.jwt.security)
    }

    async getCurrentMarker(){
        await this.ctx.marker
    }

    async getMarkerList(){
        const markerList = await this.Marker.find(header)
        return markerList
    }
}

module.exports = MarkerService