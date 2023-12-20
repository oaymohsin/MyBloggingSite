const CartModel = require('../models/CartModel')

const CartData = async (req, res) => {
    try {
        const { name, quantity, price, category, productId, userId, productQuantity, imagedetails } = req.body;
        // req.files.forEach(imageArrayObject => {
        //     const { filename, originalname, mimetype } = imageArrayObject;
        //     imageDetails.push({
        //         ImageUrl: `assets/Cart/${name}/${filename}`,
        //         ImageName: originalname,
        //         ImageMimeType: mimetype
        //     })
        // });
        const docToCreate = new CartModel({
            name, quantity, category, userId, productQuantity, productId, price,
            imagedetails
        })
        const docToSave = await docToCreate.save();
        res.json({
            Message: "Data Saved Successfully",
            Body: docToSave,
            Data: true
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Result: null,
            Data: false
        })
    }
}

const GetCartDataById = async (req, res) => {
    try {
        const Id = req.params._id;

        const dataToFind = await CartModel.find({ userId: Id })
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
const RemoveCartItemById = async (req, res) => {
    try {
        const Id = req.params._id;
        const docToGet = await CartModel.findOne({ productId: Id }).lean();
        // console.log("Doc to get:", docToGet);

        if (!!docToGet) {
            const docToDelete = await CartModel.deleteOne({ productId: docToGet.productId })
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
const RemoveAllCartsByUserId = async (req, res) => {
    try {
        const Id = req.params._id;
        const docToGet = await CartModel.findOne({ userId: Id }).lean();
        // console.log("Doc to get:", docToGet);

        if (!!docToGet) {
            const docToDelete = await CartModel.deleteMany({ userId: docToGet.userId })
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
    CartData,
    GetCartDataById,
    RemoveCartItemById,
    RemoveAllCartsByUserId
}