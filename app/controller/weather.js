const xml2js = require('xml2js');

const Controller = require('egg').Controller;

class WeatherController extends Controller {
  async getWeather() {
    const { ctx } = this;
    const {city,lng,lat} = ctx.query
    const weather = await this.service.weather.findByName(city)
    if(weather){
        ctx.body = weather.info
        return
    }
    const result = await ctx.curl(`http://wthrcdn.etouch.cn/WeatherApi?city=${city}`,{
        dataType: 'text',
    })
    const requestTime = Date.now()
    const paseString = await xml2js.parseStringPromise(result.data,{
        explicitArray:false,
        explicitRoot:false,
    })

    this.service.weather.createWeather({
        name:city,
        createTime:requestTime,
        info:paseString
    })
    ctx.body = paseString
  }
}

module.exports = WeatherController;
