const express=require('express')
const Router=express.Router()

const{userRegister,userLogin}=require('../controller/UserManagementController')

Router.post('/userRegister',userRegister);
Router.post('/userLogin',userLogin)

module.exports=Router;