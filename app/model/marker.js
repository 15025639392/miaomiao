// app/config/article.js
module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
  
    const markerSchema = new Schema({
        user: {
            type: mongoose.ObjectId, // 文章作者
            required: true,
            ref: 'User'
        },
        address:{
            type: String,
            default: null
        },
        icon:{
            type: String,
            default: null
        },
        name:{
            type: String,
            default: null
        },
        isCommon:{
            type:Boolean,
            default: false
        },
        markerType:{
            type:String,
            default: null
        },
        
        updatedAt: { // 更新时间
            type: Date,
            default: Date.now
        },
        createTime:{// 创建时间
            type: Date, 
            default: Date.now
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number], // Array of arrays of arrays of numbers
                required: true
            }
        }
    })

    markerSchema.index({ location: '2dsphere' });
  
    return mongoose.model('Marker', markerSchema)
  }
  