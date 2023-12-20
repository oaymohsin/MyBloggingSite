const MerchandiseModel = require('../models/MerchandiseManagementModel')


const MerchandiseInsertData = async (req, res) => {

    try {

        const { name, quantity, price, category } = req.body;
        let imageDetails = [];
        req.files.forEach(imageArrayObject => {
            const { filename, originalname, mimetype } = imageArrayObject;
            imageDetails.push({
                ImageUrl: `assets/Merchandise/${name}/${filename}`,
                ImageName: originalname,
                ImageMimeType: mimetype
            })
        });

        const docToCreate = new MerchandiseModel({
            name, quantity, category, price,
            imagedetails: imageDetails
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

const GetMerchandiseData = async (req, res) => {
    try {
        const docToGet = await MerchandiseModel.find();
        res.json({
            Message: "All documents Found",
            Data: true,
            Result: docToGet,
        });
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null,
        });
    }
};

const GetMerchandiseDataById = async (req, res) => {
    try {
        const Id = req.params._id;

        const docToFind = await MerchandiseModel.findOne({ _id: Id });
        res.json({
            Message: "Data Found Successfully",
            Data: true,
            Result: docToFind,
        });
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null,
        });
    }
};

module.exports = {
    MerchandiseInsertData,
    GetMerchandiseData,
    GetMerchandiseDataById
}