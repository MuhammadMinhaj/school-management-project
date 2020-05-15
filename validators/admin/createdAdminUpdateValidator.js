let { body } = require('express-validator')
let Admin = require('../../models/Admin')

module.exports = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Please Provied Name')
        .isLength({min:3})
        .withMessage('Please Provied Valid Name')
    ,
    body('email')
        .not()
        .isEmpty()
        .withMessage('Please Provied Email')
        .isEmail()
        .withMessage('Please Provied Valid Email')
        .custom(async (value,{req})=>{
            let { id } = req.params 
            let updateAdmin = await Admin.findOne({_id:id})
            if(updateAdmin){
                if(updateAdmin.email!==value){
                    let checkEmail = await Admin.findOne({email:value})
                    if(checkEmail){
                        return Promise.reject('Email is Already Used')
                    }
                }
            }
            return true
        })
    ,
    body('phone')
        .not()
        .isEmpty()
        .withMessage('Please Provied Phone')
        .isLength({min:10,max:21})
        .withMessage('Phone No Must Be Greater Then or Equal 10 and Less Then 21 ')
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