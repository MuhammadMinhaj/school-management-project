const { body } = require('express-validator')
const bcrypt = require('bcrypt')
const Admin = require('../../models/Admin')
module.exports = [
    body('securityPassword')
        .not()
        .isEmpty()
        .withMessage('Please Provied Security Password')
        .isLength({min:5,max:16})
        .withMessage('Security Password Must Be Min 5 Chars And Max 16 Chars')
        .custom(async(value,{req})=>{
            let admin = await Admin.findOne({_id:req.admin._id})
            if(!admin){
                return Promise.reject('Warning!Please Login')
            }else{
                let checkedSecurityPassword = await bcrypt.compare(value,admin.securityPassword)
                if(!checkedSecurityPassword){
                    return Promise.reject('Please Provied Valid Security Password')
                } 
            }
            return true
        })
]