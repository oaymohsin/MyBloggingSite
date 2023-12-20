const mongoose = require('mongoose');
const date = require('../Utils/date')

//Start Block Schema Creating
const CartSchema = mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Number, default: 1 },
    softDeleteStatus: { type: Number, default: 0 },
    imagedetails: [{
        ImageUrl: { type: String },
        ImageName: { type: String },
        ImageMimeType: { type: String }
    }],
    createdDate: {
        type: String,
        default: `${date.year}-${date.month}-${date.day}-${date.time}`
    },
    productId: { type: String, required: true },
    userId: { type: String, required: true },
    productQuantity: { type: Number, required: true }
}, { timestamps: true });



//End Block Schema Creating

module.exports = mongoose.model('Cart', CartSchema)