const mongoose = require('mongoose');
const date = require('../Utils/date')

//Start Block Schema Creating
const merchandiseUploadSchema = mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
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
    }
}, { timestamps: true });



//End Block Schema Creating

module.exports = mongoose.model('MerchandiseCollection', merchandiseUploadSchema)