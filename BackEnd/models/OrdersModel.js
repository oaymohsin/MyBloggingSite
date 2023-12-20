const mongoose = require('mongoose')
const date = require('../Utils/date')


const OrderSchema = mongoose.Schema({
    email: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    createdDate: {
        type: String,
        default: `${date.year}-${date.month}-${date.day}-${date.time}`
    },
    userId: { type: String, required: true },
    totalPrice: { type: Number, required: true }
}, { timestamps: true })


module.exports = mongoose.model('Orders', OrderSchema)
