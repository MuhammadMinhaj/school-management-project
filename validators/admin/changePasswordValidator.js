
const { body } = require('express-validator')

module.exports = [
    body('oldPassword')
        .not()
        .isEmpty()
        .withMessage('Can\'t Be Empty Field')
        ,
    body('newPassword')
        .not()
        .isEmpty()
        .withMessage('Can\'t Be Empty Field')
        .isLength({min:5,max:16})
        .withMessage('Password Must Be Min 5 Chars And Max 16 Chars')
        .custom((value,{req})=>{
            if(value!==req.body.confirmPassword){
                return Promise.reject('1Password Dosen\'t Match')
            }
            return true
        })
        ,
    body('confirmPassword')
        .not()
        .isEmpty()
        .withMessage('Can\'t Be Empty Field')
        .isLength({min:5,max:16})
        .withMessage('Password Must Be Min 6 Chars And Max 16 Chars')
        .custom((value,{req})=>{
            if(value!==req.body.newPassword){
                return Promise.reject('2Password Dosen\'t Match')
            }
            return true
        })
        ,
]