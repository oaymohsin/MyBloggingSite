const OrderModel = require('../models/OrdersModel')


const CreateOrder = async (req, res) => {
    try {
        const { email, address, contact, userId, totalPrice } = req.body;
        const docToCreate = new OrderModel({
            email,
            address,
            contact,
            userId,
            totalPrice
        })
        const docToSave = await docToCreate.save()
        res.json({
            Message: 'Order Saved Successfully',
            Body: docToSave,
            Result: true
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Body: null,
            Result: false
        })
    }
}

const GetOrdersById = async (req, res) => {
    try {
        const Id = req.params._id;
        // console.log(Id)
        const dataToFind = await OrderModel.find({ userId: Id })
        res.json({
            Message: "Data Found Successfully",
            Data: true,
            Result: dataToFind
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const CancelOrderById = async (req, res) => {
    try {
        const Id = req.params._id;
        const docToGet = await OrderModel.findOne({ _id: Id }).lean()
        // console.log(Id)
        // console.log(docToGet._id)

        if (!!docToGet) {
            const docToDelete = await OrderModel.deleteOne({ _id: Id })
            res.json({
                Message: "Deleted",
                Data: true,
                Result: docToDelete
            })
        } else {
            res.json({
                Message: "Not Deleted",
                Data: false,
                Result: null
            })
        }
    } catch (error) {
        res.json({
            Message: error.Message,
            Data: false,
            Result: null
        })
    }
}

module.exports = {
    CreateOrder,
    GetOrdersById,
    CancelOrderById
}