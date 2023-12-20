//Acquiring Dependencies
const express = require('express')
const Router = express.Router()

//Calling my Controllers
const { ProductData, GetData, GetDataById, UpdateById, UpdateImageById, SoftDeleteById, HardDelete } = require('../controller/DataManagementController')
const { MerchandiseInsertData, GetMerchandiseData, GetMerchandiseDataById } = require('../controller/MerchandiseManagementController')
const { CartData, GetCartDataById, RemoveCartItemById, RemoveAllCartsByUserId } = require('../controller/CartManagementController')
const { CreateOrder, GetOrdersById, CancelOrderById } = require('../controller/OrdersManagementController');
//Calling Middlewares
const { UploadProductImage, uploadMerchandiseImage } = require('../middlewares/UploadMedia')


Router.post('/UploadData', UploadProductImage.array('images', 20), ProductData)
Router.get('/GetData', GetData)
Router.get('/GetDataById/:_id', GetDataById)
Router.post('/UpdateById', UpdateById)
Router.put('/UpdateImage', UpdateImageById),
    Router.delete('/DeleteById/:_id', SoftDeleteById),
    Router.delete('/HardDelete/:_id', HardDelete)

Router.post('/UploadMerchandiseData', uploadMerchandiseImage.array('images', 20), MerchandiseInsertData);
Router.get('/GetMerchandiseData', GetMerchandiseData)
Router.get('/GetMerchandiseDataById/:_id', GetMerchandiseDataById)

Router.post('/AddToCart', CartData)
Router.get('/GetCartDataById/:_id', GetCartDataById)
Router.delete('/DeleteCartItemById/:_id', RemoveCartItemById)
Router.delete('/DeleteAllCartsByUserId/:_id', RemoveAllCartsByUserId)


Router.post('/CreateOrder', CreateOrder)
Router.get('/GetOrdersById/:_id', GetOrdersById)
Router.delete('/CancelOrderById/:_id', CancelOrderById)



module.exports = Router;