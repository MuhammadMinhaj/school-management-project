let { body } = require('express-validator')
let Admin = require('../../models/Admin')

module.exports = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Please Provied Name')
    ,
    body('username')
        .not()
        .isEmpty()
        .withMessage('Please Provied Username')
        .isLength({min:6,max:16})
        .withMessage('Username Must Be Min 6 Chars And Max 16 Chars')
        .custom(async value=>{
            let admin = await Admin.findOne({username:value})
            if(admin){
                return Promise.reject('Already Used This Username')
            }
            return true
        })
    ,
    body('email')
        .not()
        .isEmpty()
        .withMessage('Please Provied Email')
        .isEmail()
        .withMessage('Invalid Email')
        .custom(async value=>{
            let admin = await Admin.findOne({email:value})
            if(admin){
                return Promise.reject('Already Used This Email')
            }
            return true
        })
        
    ,
    body('phone')
        .not()
        .isEmpty()
        .withMessage('Please Provied Phone')
        .isLength({min:6,max:16})
        .withMessage('Phone Must Be Min 10 Chars And Max 21 Chars')
    ,
    body('password')
        .not()
        .isEmpty()
        .withMessage('Please Provied Password')
    ,
    body('birthday')
        .not()
        .isEmpty()
        .withMessage('Please Select Birthday')
    ,
    body('gender')
        .not()
        .isEmpty()
        .withMessage('Please Select Gender')
]