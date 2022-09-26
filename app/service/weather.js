//将shp文件的数据坐标系由GCJ-02改为WGS-84
const Service = require('egg').Service
class WeatherService extends Service {
    get Weather() {
        return this.app.model.Weather
    }

    async findByName(name){
        const data = await this.Weather.findOne({name})
        if(data){
            if((Date.now-data.createTime)>5000){
                await this.Weather.findByIdAndDelete(data._id)
                return false
            }else{
                return data
            }
        }
        return false
    }

    async createWeather(data){
        const model = new this.Weather(data)
        return await model.save()
    }
}


module.exports = WeatherService