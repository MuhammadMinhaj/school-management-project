const User = require('../../models/User')
const { body } = require('express-validator')


module.exports = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Please Provied Name'),
    body('username')
        .not()
        .isEmpty()
        .withMessage('Please Provied Username')
        .custom(async value=>{

            let user = await User.findOne({username:value})
            if(user){
                return Promise.reject('Username Already Exits')
            }
            return true 

        }),
    body('email')
        .not()
        .isEmpty()
        .withMessage('Please Provied Email')
        .isEmail()
        .withMessage('Please Provied Valid Email')
        .custom(async value=>{
            
            let user = await User.findOne({email:value})
            if(user){
                return Promise.reject('Email Already Exits')
            }
            return true 

        }),
    body('phone')
        .not()
        .isEmpty()
        .withMessage('Please Provied Phone')
        .custom(async value=>{
            
            let user = await User.findOne({phone:value})
            if(user){
                return Promise.reject('Phone Already Exits')
            }
            return true 

        }),
        body('password')
        .not()
        .isEmpty()
        .withMessage('Please Provied Password'),
    body('gender')
        .not()
        .isEmpty()
        .withMessage('Please Select Gender')
]