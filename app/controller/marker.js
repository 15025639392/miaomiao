const Controller = require('egg').Controller;

class MarkerController extends Controller {
  get marker(){
    return this.service.marker
  }
  async update() {
    const { ctx } = this;
    const body = ctx.request.body
    ctx.validate({
        avatar:{
            type:'string'
        }
    })
    const back = await this.marker.updateMarker(body)
    // 4.发送响应
    this.ctx.body = back
  }

  async create(){
    const { ctx } = this;
    const body = ctx.request.body
    
    const marker = await this.marker.createMarker(body)
    // 4.发送响应
    this.ctx.body = {
      numberId:this.ctx.helper.getNumberId(marker._id),
      ...this.ctx.helper._.pick(marker,[
        'address',
        'icon',
        'name',
        'longitude',
        'latitude',
        'markerType',
        'isCommon',
      ])
    }
    // {
    //   numberId:this.ctx.helper.getNumberId(marker._id),
    //   ...marker,
    // }
  }

  async getList(){
    const list = await this.marker.getMarkerList()
    // 4.发送响应
    this.ctx.body = {
      list
    }
  }

  async delete(){
    const body = this.ctx.request.body
    const item = await this.marker.findById(body.id)
    if(item.user !== this.ctx.user.id){
      this.ctx
    }
    const result = await this.marker.deleteById(body.id)
    this.ctx.body = result
  }
}

module.exports = MarkerController;
