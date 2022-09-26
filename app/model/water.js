

// app/config/article.js
module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const waterSchema = new Schema({
        name: String,
        location: {
            type: {
                type: String,
                enum: ['Polygon'],
                required: true
            },
            coordinates: {
                type: [[[Number]]], // Array of arrays of arrays of numbers
                required: true
            }
        }
    });

    waterSchema.index({ location: '2dsphere' });

    return mongoose.model('Water', waterSchema)
}
