const userManagementModel = require('../models/UserManagementModel')
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken')

const userRegister = async (req, res) => {
    try {
        const { fullName, email, password, repeatPassword, phone } = req.body;
        const checkIfAdminAlreadyExists = await userManagementModel.findOne({
            email: email
        })
        if (checkIfAdminAlreadyExists?.userPrivilege === 'Admin') {
            return res.json({
                Message: 'Something went wrong Please ask admin',
                Status: null,
                Data: false
            })
        }
        let checkAdminIdentity = email.split('@')[0];
        checkAdminIdentity = checkAdminIdentity.toLowerCase();
        if (checkAdminIdentity === 'admin') {
            const adminToCreate = new userManagementModel({
                fullName, email, password, repeatPassword, phone, userPrivilege: 'Admin'
            });
            const adminToSave = await adminToCreate.save();
            return res.json({
                Message: 'Register Successfully',
                Data: true
            })
        }
        if (!checkIfAdminAlreadyExists) {
            const userToCreate = new userManagementModel({
                fullName, email, password, repeatPassword, phone
            })
            const userToSave = await userToCreate.save()
            res.json({
                Message: 'Register Successfully',
                Data: true
            })
        }
        else {
            return res.json({
                Message: 'User Already exist',
                Status: null,
                Data: false
            })
        }
    } catch (error) {
        res.json({
            Error: error.message,
            Data: false,
            Result: null
        })
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUserExistence = await userManagementModel.findOne(
            { email: email },
        ).lean();
        if (Object.keys(checkUserExistence).length === 0) {
            return res.json({
                Message: 'Authentication Failed  either incorrect password or email',
                Data: false
            })
        }
        const checkUserPassword = await bcrypt.compare(password, checkUserExistence.password);
        if (checkUserPassword === false) {
            return res.json({
                Message: 'Authentication Failed  either incorrect password or email',
                Data: false
            })
        }
        const token = jsonwebtoken.sign({
            name: 'hi'
        },
            'superSecret',
            { expiresIn: '2m' })

        res.json({
            Message: 'Authenticate Successfuly',
            Data: true,
            Token: token,
            UserPrivilege: checkUserExistence.userPrivilege,
            UserId: checkUserExistence._id

        })
    } catch (error) {
        res.json({
            Error: error.message,
            Data: false,
            Result: null
        })
    }
}

module.exports = {
    userRegister,
    userLogin
}