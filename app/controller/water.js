const Controller = require('egg').Controller;

class WaterController extends Controller {

  async initWater() {
    const { ctx } = this;
    const res = await this.service.water.testGrib2()
    // 4.ειεεΊ
    this.ctx.body = res
  }

  async getwater(){
    // console.log('runing--------------------------------------')
    const result = await this.service.water.getwater()
    this.ctx.body = {
        result
    }
  }
}

module.exports = WaterController;
