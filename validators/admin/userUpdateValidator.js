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
        .custom(async (value,{req})=>{


            let user = await User.findOne({_id:req.params.id})

            if(user.username!==value){
                let UnUniqUser = await User.findOne({username:value})
                if(UnUniqUser){
                    return Promise.reject('Username Already Exits')
                }
            }

            
            return true 

        }),
    body('email')
        .not()
        .isEmpty()
        .withMessage('Please Provied Email')
        .isEmail()
        .withMessage('Please Provied Valid Email')
        .custom(async (value,{req})=>{
            
            let user = await User.findOne({_id:req.params.id})

            if(user.email!==value){
                let UnUniqUser = await User.findOne({email:value})
                if(UnUniqUser){
                    return Promise.reject('Email Already Exits')
                }
                
            }

            return true 

        }),
    body('phone')
        .not()
        .isEmpty()
        .withMessage('Please Provied Phone')
        .custom(async (value,{req})=>{
            let user = await User.findOne({_id:req.params.id})

            if(user.phone!==value){
                let UnUniqUser = await User.findOne({phone:value})
                if(UnUniqUser){
                    return Promise.reject('Phone Already Exits')
                }
            }
           
            return true 

        })
    ,
    body('confirmPassword')
        .custom(async(value,{req})=>{
            if(value!==req.body.password){
                return Promise.reject('Password Dosen\'t Matched')
            }
        })
    
    ,  
    body('gender')
        .not()
        .isEmpty()
        .withMessage('Please Select Gender')
]