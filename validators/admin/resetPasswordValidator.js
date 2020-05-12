const { body } = require('express-validator')

module.exports = [
    body('password')
    .not()
    .isEmpty()
    .withMessage('Please Provied New Password')
    .isLength({min:5,max:16})
    .withMessage('Password Must Be Min 5 Chars And Max 16 Chars')
    ,
    body('confirmPassword')
    .not()
    .isEmpty()
    .withMessage('Please Confirm New Password')
    .isLength({min:5,max:16})
    .withMessage('Password Must Be Min 5 Chars And Max 16 Chars')
    .custom((value,{req})=>{
        if(value!==req.body.password){
            return Promise.reject('Confirm Password Dosen\'t Mached')
        }
        return true
    })
]