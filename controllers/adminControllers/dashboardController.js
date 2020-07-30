const Admin = require('../../models/Admin')
const Page = require('../../models/Page')
const WebModel = require('../../models/WebModel')
const Category = require('../../models/Category')
const User = require('../../models/User')
const Student = require('../../models/Student')
const Result = require('../../models/Result')



setInterval(async()=>{
	let webModel = await WebModel.findOne()
	await WebModel.findOneAndUpdate({_id:webModel._id},{countDailyVisitors:null},{new:true})
},1000*60*60*24)

let routingInfo =  [
	{
		name:'Home',
		route:'/'
	},
	{
		name:'Administration Login',
		route:'/auth/login'
	},
	{
		name:'User Login',
		route:'/user/auth/login'
	},
	{
		name:'Libray',
		route:'/web/libray'
	},
	{
		name:'Department',
		route:'/web/department/ (Your department name)'
	},
	{
		name:'Gallery',
		route:'/web/gallery	'
	},
	{
		name:'Teachers',
		route:'/web/teachers'
	},
	{
		name:'Notice',
		route:'/web/notice'
	},
	{
		name:'Administration',
		route:'/web/administration'
	},
	{
		name:'Results',
		route:'/web/result'
	},
	{
		name:'Contact',
		route:'/web/contact'
	},
	
]


// Administrator Dashboard
exports.adminDashboardGetController = async (req, res, next) => {
	try {
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		let category = await Category.find()

		let d = new Date()
		

		let teachers = await User.countDocuments()
		let students = await Student.countDocuments()
		let results = await Result.find({submited:true,session:d.getFullYear().toString(),published:true}).countDocuments()
		
		
		res.render('pages/administrator/dashboard.ejs', {
			style: 'bg-light',
			title: 'Administrator Dashboard',
			data: admin,
			flashMessage: req.flash(),
			pages,
			webModel,
			createdPage:{},
			category,
			teachers,
			students,
			results,
			routingInfo
		})
	} catch (e) {
		next(e)
	}
}
exports.dashboradNoticePostController = async(req,res,next)=>{
	try{
		let { notice } = req.body 

		let webModel = await WebModel.findOne()
		
		let msg;
		webModel.notice?msg = 'Updated':msg = 'Sended'

		let noticePublished = await WebModel.findOneAndUpdate({_id:webModel._id},{notice},{new:true})

		if(!noticePublished){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}
		req.flash('success',`Successfully ${msg} Notice To Every Users`)
		res.redirect('back')
	}catch(e){
		next(e)
	}
}

exports.clearNoticeGetController = async(req,res,next)=>{
	try{
		let webModel = await WebModel.findOne()

		let clearedNotice = await WebModel.findOneAndUpdate({_id:webModel._id},{notice:''},{new:true})

		if(!clearedNotice){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}
		req.flash('success','Successfully Cleared Notice To Every Users')
		return res.redirect('back')
		
	}catch(e){
		next(e)
	}
}