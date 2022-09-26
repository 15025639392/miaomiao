

// app/config/article.js
module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const WeatherSchema = new Schema({
        name: String,
        info:Object,
        createTime:Number
    });
    return mongoose.model('Weather', WeatherSchema)
}
