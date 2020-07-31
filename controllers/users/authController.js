const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const User = require('../../models/User')
const Menu = require('../../models/Menu')
const WebModel = require('../../models/WebModel')
const Controls = require('../../models/Controls')

async function renderPageHandler(req,res,pagename,title){
    try{
        let menu = await Menu.find()
		let webModel = await WebModel.findOne()
		
		res.render(`pages/web/${pagename}`, {
			title: title,
			style: 'bg-light',
			error: {},
			menu,
			flashMessage: req.flash(),
			webModel,
            data:'',
            url:req.originalURL,
            loginURI:'/user/auth/login'
		})
    }catch(e){
        console.log(e)
    }
}

exports.userLoginGetController = async(req,res,next)=>{
    try{
        let menu = await Menu.find()
		let webModel = await WebModel.findOne()
		let control = await Controls.findOne()
        return res.render(`pages/user/login`, {
            title: 'LOGIN',
            style: 'bg-dark',
            menu,
            flashMessage: req.flash(),
			webModel,
			control 
        })
    }catch(e){
        next(e)
    }
}
exports.userLoginPostController = async(req,res,next)=>{
    try{
        let { email,username,password } = req.body
        
        
        let userInfo = email||username 
        if(!userInfo||password.length===0){
            req.flash('fail','Invalid Creadentials')
            return res.redirect('back')
        }
    
        let hasUser;

        if(email){
            let user = await User.findOne({email:email})
            if(!user){
                req.flash('fail','Unregistered User')
                return res.redirect('back')
            }
            hasUser = user
        }else{
            let user  =  await User.findOne({username:username})
            if(!user){
                req.flash('fail','Unregistered User')
                return res.redirect('back')
            }
            hasUser = user
        }

        let matchedPassword = await bcrypt.compare(password,hasUser.password)
        if(!matchedPassword){
            req.flash('fail','Invalid Password')
            return res.redirect('back')
        }
        

       req.flash('success','Successfully Login')
        req.session.userIsLoggedIn = true
        req.session.user = hasUser
        req.session.save(error=>{
            next(error)
        })
        
        res.redirect('/user/dashboard')
        res.end()
    }catch(e){
        next(e)
    }
}
exports.userLogoutGetController = (req,res,next)=>{
    delete req.session.userIsLoggedIn 
    delete req.session.user
    req.session.save(error=>{
        if(error){
            next(error)
        }
        res.redirect('/user/auth/login')
    }) 
}       

exports.forgotPasswordGetController = async (req, res, next) => {
    let control = await Controls.findOne()
    if(!control.userForgotPassword){
        return res.redirect('/')
    }
	renderPageHandler(req,res,'forgotPassword','Forgot-Password')
}
exports.forgotPasswordPostController = async (req, res, next) => {
	try {

		let control = await Controls.findOne()
		
		if(!control.userForgotPassword){
			return res.redirect('/')
		}

		if(!control.publicMail.email||!control.publicMail.password){
			req.flash('fail','Sorry! Change password system is not available')
			return res.redirect('back')
		}

        let { email } = req.body
        
		// Cheked Is Email Found Or Not
		let user = await User.findOne({ email })
		if (!user) {
			req.flash('fail', 'Unregistered Email')
			return res.redirect('back')
		}
		let token = jwt.sign({ email: user.email, id: user._id }, 'mdminhajislam99', {
			expiresIn: '1h',
		})
		// Reset Password Confirmation Email Sent To Server in Clint
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: control.publicMail.email,
				pass: control.publicMail.password,
			},
		})
		let sendMailToClint = await transporter.sendMail({
			from: control.publicMail.email,
			to: email,
			subject: '[JASA] Confirmation Link Of Reset Password',

			html: `
			<P>We heard that you lost your password. Sorry about that!</P>
			<p>But don’t worry! You can use the following link to reset your password:</p>
			<a href="http://localhost:8080/user/auth/reset_password/${token}">http://localhost:8080/user/auth/reset_password/${token}</a>
			
			<p>If you don’t use this link within 1 hours, it will expire. To get a new password reset link, visit <a href="http://localhost:8080/user/auth/forgot_password">http://localhost:8080/user/auth/forgot_password</a> </p>
			<p>
			Thanks,<br/>
			The JASA Edu
			</p>
			`,
		})
		// Need to Handler this Error
		if (!sendMailToClint.response) {
			req.flash('fail','Invalid Creadentials')
			return res.redirect('back')
		} 
        renderPageHandler(req,res,'confirmationEmail','Confirmation Email')
	} catch (e) {
		next(e)
	}
}
exports.resetPasswordGetController = async (req, res, next) => {
	try {
		var validationToken = jwt.decode(req.params.token);
		let control = await Controls.findOne()
		if(!control.userForgotPassword){
			return res.redirect('/')
		}
		if(!validationToken){
			res.redirect('/')
			return false 
        }
		renderPageHandler(req,res,'resetPassword','Reset Password')
	} catch (e) {
		next(e)
	}
}
exports.resetPasswordPostController = async (req, res, next) => {
	try {

		let control = await Controls.findOne()
		if(!control.userForgotPassword){
			return res.redirect('/')
		}

		var validationToken = jwt.decode(req.params.token);
		if(!validationToken){
			res.redirect('/')
			return false 
		}


        let { password,confirmPassword } = req.body
        
        if(password!==confirmPassword){
            req.flash('fail','Confirm Password Dosen\'t Mached!')
            return res.redirect('back')
        }
        if(password.length<6){
            req.flash('fail','Password Must Be Greater Then 5 Characters!')
            return res.redirect('back')
        }
        
		let token = req.params.token
		jwt.verify(token, 'mdminhajislam99', async (err, info) => {
			if (err) {
				req.flash('fail', 'Reset password token has expired,Please try to new request!')
				return res.redirect('back')
			}
			if (info) {
				let { email, id } = info
				let user = await User.findOne({ _id: id, email: email })
				if (!user) {
					req.flash('fail', 'Unregistered Email')
					return res.redirect('back')
				}
				let hashedPassword = await bcrypt.hash(password, 11)
				let updatedPassword = await User.findOneAndUpdate(
					{ _id: id, email: email },
					{
						password: hashedPassword,
					}
				)
				if (!updatedPassword) {
					req.flash('fail', 'Internal Server Error')
					return res.redirect('back')
				}
				req.flash('success', 'Successfully Updated Password, Please Login!')
				res.redirect('/user/auth/login')
			}
		})
	} catch (e) {
		next(e)
	}
}
