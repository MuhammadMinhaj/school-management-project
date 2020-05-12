const { body } = require('express-validator')
const Admin = require('../../models/Admin')
module.exports = [
    body('email')
        .not()
        .isEmpty()
        .withMessage('Please Provied Your Email')
        .isEmail()
        .withMessage('Please Provied Your Valid Email')
        .custom(async value=>{
            let admin = await Admin.findOne({email:value})
            if(!admin){
                return Promise.reject('Email Not Founded')
            }
            return true
        })
]