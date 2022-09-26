// app/config/article.js
module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
  
    const articleSchema = new Schema({
        displayType:{
            type: Number,
            default: 1
        },
        user: {
            type: mongoose.ObjectId, // 文章作者
            required: true,
            ref: 'User'
        },
        content:{
            type: String,
            default: null
        },
        imgs:[
            {
                style:Number,
                url:String,
                required: false,
            }
        ],
        img1:{
            style:Number,
            url:String,
            required: false,
        },
        img2:{
            style:Number,
            url:String,
            required: false,
        },
        img3:{
            style:Number,
            url:String,
            required: false,
        },
        publishTime:{
            type: Date,
            default: null
        }
    },{
        timestamps:true
      })
  
    return mongoose.model('Article', articleSchema)
  }
  