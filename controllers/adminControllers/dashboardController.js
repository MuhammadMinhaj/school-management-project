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
let searchForItem = [
	{
		name:'Create Page',
		url:'/administrator/page_create',
		search:'page pages'
	},
	{
		name:'Create Category',
		url:'/administrator/news/category',
		search:'category categorys'
	},
	{
		name:'Create Department',
		url:'/administrator/department',
		search:'department departments'
	},
	{
		name:'Create Links',
		url:'/administrator/links',
		search:'links link'
	},
	{
		name:'Email Management',
		url:'/administrator/emails',
		search:'email emails'
	},
	{
		name:'Create Examination',
		url:'/administrator/results/create/examination',
		search:'examination exam examinations'
	},
	{
		name:'Request',
		url:'/administrator/results/management',
		search:'request requests'
	},
	{
		name:'Create Teachers',
		url:'/administrator/user/create',
		search:'teachers teacher'
	},
	{
		name:'Settings',
		url:'/administrator/setting',
		search:'settings setting'
	},
	{
		name:'Developer Info',
		url:'/administrator/developer/info',
		search:'developer info'
	},
	{
		name:'Logout',
		url:'/auth/logout',
		search:'logout singout'
	},
	{
		name:'Create Menu',
		url:'/administrator/menu-create',
		search:'menu menus'
	},
	{
		name:'News',
		url:'/administrator/news',
		search:'news'
	},
	{
		name:'Change Password',
		url:'/administrator/account',
		search:'change password'
	},
	{
		name:'Profile',
		url:'/administrator/account',
		search:'profile account'
	},
	{
		name:'Add Content',
		url:'/administrator/add_content',
		search:'add content'
	},
	{
		name:'Gallery',
		url:'/administrator/gallery',
		search:'gallery gallerys'
	}
]
// Administrator Dashboard
exports.adminDashboardGetController = async (req, res, next) => {
	try {
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		let category = await Category.find()
	
		
		for(let page of pages){
			let hasPageItem = false
            for(let s of searchForItem){
                if(page._id.toString()===s.id){
                    hasPageItem = true 
                }
			}
			if(!hasPageItem){
				searchForItem.push({
					name:`${page.menu} Page`,
					url:`/administrator/page_update/${page._id}`,
					id:page._id.toString(),
					search:`${page.menu.toLowerCase()} page pages`
				})
			} 
			
		}
		for(let c of category){
			let hasCategoryItem = false
            for(let s of searchForItem){
                if(c._id.toString()===s.id){
                    hasCategoryItem = true 
                }
			}
			if(!hasCategoryItem){
				searchForItem.push({
					name:`${c.name} Category`,
					url:`/administrator/news/category/item/${c._id}`,
					id:c._id.toString(),
					search:`${c.name.toLowerCase()} category categorys`
				})
			} 
			
		}
		for(let d of webModel.departments){
			let hasDepartmentItem = false
            for(let s of searchForItem){
                if(d._id.toString()===s.id){
                    hasDepartmentItem = true 
                }
			}
			if(!hasDepartmentItem){
				searchForItem.push({
					name:`${d.name} Department`,
					url:`/administrator/department/update/${d._id}`,
					id:d._id.toString(),
					search:`${d.name.toLowerCase()} department departments`
				})
			} 
			
		}
		let d = new Date()
		let teachers = await User.countDocuments()
		let students = await Student.countDocuments()
		let results = await Result.find({submited:true,session:d.getFullYear().toString(),published:true}).countDocuments()
		let { search } = req.query
		let searchItems = []

		if(search){
			for(let s of searchForItem){
				if(s.search.includes(search.toString().toLowerCase())){
					searchItems.push(s)
				}
			}
		}
		res.render('pages/administrator/dashboard', {
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
			routingInfo,
			searchItems
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