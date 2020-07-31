const Admin = require('../../models/Admin')
const Menu = require('../../models/Menu')
const Page = require('../../models/Page')
const WebModel = require('../../models/WebModel')
const Category = require('../../models/Category')

exports.menuCreateGetController = async (req, res, next) => {
	try {
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
	    let category = await Category.find()

		res.render('pages/administrator/createMenu', {
			title: 'Create Menu',
			style: 'bg-light',
			error: {},
			data: req.admin,
			pages,
			webModel,
			createdPage:{},
			flashMessage: req.flash(),
			category
		})
	} catch (e) {
		next(e)
	}
}
exports.menuCreatePostController = async (req, res, next) => {
	try {
		let checkAdminWithReq = await Admin.findOne({ _id: req.admin._id, email: req.admin.email })
		if (!checkAdminWithReq) {
			return res.json({
				message: "You' Not Authenticated User",
			})
		}
		let { name, action } = req.body
		if (name.length === 0 || action.length === 0) {
			return res.json({
				message: "Can't Be Empty Field",
			})
		}
		let menu = new Menu({
			name,
			href: action,
		})
		let createdMenu = await menu.save()
		if (!createdMenu) {
			return res.json({
				error: 'Internal Server Error',
			})
		}

		res.json({
			message: 'Successfully Created Menu',
			name: createdMenu.name,
			href: createdMenu.href,
			dropDown: createdMenu.dropDown,
			createdAt: createdMenu.createdAt,
			_id: createdMenu._id,
		})
	} catch (e) {
		next(e)
	}
}
exports.menuDeleteDeleteController = async (req, res, next) => {
	try {
		let checkAdminWithRequest = await Admin.findOne({ _id: req.admin._id, email: req.admin.email })
		if (!checkAdminWithRequest) {
			return res.json({
				message: "You're Not Authenticated User",
			})
		}
		let { id } = req.params
		let deleteMenu = await Menu.findOneAndRemove({ _id: id })
		if (!deleteMenu) {
			return res.json({
				error: 'Internal Server Error',
			})
		}
		res.json({
			message: 'Successfully Deleted Menu',
		})
	} catch (e) {
		next(e)
	}
}
exports.menuUpdatePutController = async (req, res, next) => {
	try {
		let hasAdminWithReq = await Admin.findOne({ _id: req.admin._id, email: req.admin.email })
		if (!hasAdminWithReq) {
			return res.json({
				message: "You're Not Authenticated User",
			})
		}
		let { id } = req.params
		let { name, action } = req.body
		if (name.length === 0 || action.length === 0) {
			return res.json({
				message: "Can't Be Empty Field",
			})
		}
		let updatedMenu = await Menu.findOneAndUpdate(
			{ _id: id },
			{
				name,
				href: action,
			},
			{
				new: true,
			}
		)

		if (!updatedMenu) {
			return res.json({
				message: 'Internal Server Error',
			})
		}

		res.json({
			message: 'Successfully Updated Menu',
			updatedMenu,
		})
	} catch (e) {
		next(e)
	}
}

exports.menuGetController = async (req, res, next) => {
	try {
		let checkAdmin = await Admin.findOne({ _id: req.admin._id, email: req.admin.email })
		if (!checkAdmin) {
			return res.json({
				message: "You're Not Authenticated User",
			})
		}
		let menus = await Menu.find()
		res.status(200).json(menus)
	} catch (e) {
		next(e)
	}
}

exports.dropDownCreateGetController = async (req, res, next) => {
	try {
		let hasAdminWithReq = await Admin.findOne({ _id: req.admin._id })
		if (!hasAdminWithReq) {
			return res.redirect('/auth/login')
		}
		let menu = await Menu.findOne({ _id: req.params.id })
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		let category  = await Category.find()
		if (!menu) {
			req.flash('fail', 'Please Create New Menu')
			return res.redirect('/administrator/menu-create')
		}

		res.render('pages/administrator/createDropDown.ejs', {
			title: 'DropDown Menu',
			style: 'bg-light',
			error: {},
			data: req.admin,
			flashMessage: req.flash(),
			menuName: menu.name,
			pages,
			webModel,
			createdPage:{},
			id: menu._id,
			category
		})
	} catch (e) {
		next(e)
	}
}

exports.dropDownCreatePostController = async (req, res, next) => {
	try {
		let hasAdminWithReq = await Admin.findOne({ _id: req.admin._id })
		if (!hasAdminWithReq) {
			return res.status(401).json({
				message: "You're Not Authenticated User",
			})
		}
		let { name, action } = req.body
		if (name.length === 0 || action.length === 0) {
			return res.json({
				message: 'Invalid Creadentials',
			})
		}
		let { id } = req.params
		let hasMenu = await Menu.findOne({ _id: id })

		let error = {}

		hasMenu.dropDown.forEach(d => {
			if (d.name === name || d.href === action) {
				error.message = 'Already Used Name or Action'
			}
		})

		if (Object.keys(error).length !== 0) {
			return res.json({ message: 'Already Used Menu Name Or Action' })
		}

		let menu = await Menu.findOneAndUpdate(
			{ _id: id },
			{
				$push: {
					dropDown: {
						name,
						href: action,
					},
				},
			},
			{
				new: true,
			}
		)
		if (!menu) {
			return res.status(500).json({ message: 'Internal Server Error' })
		}
		res.status(200).json(menu)
	} catch (e) {
		next(e)
	}
}
exports.showAllDropDownGetController = async (req, res, next) => {
	try {
		let hasAdminWithReq = await Admin.findOne({ _id: req.admin._id })
		if (!hasAdminWithReq) {
			return res.json({
				message: "You're Not Authenticated User",
			})
		}
		let { id } = req.params
		let menu = await Menu.findOne({ _id: id })
		if (!menu) {
			return res.json({
				message: 'Menu Not Found',
			})
		}
		res.json(menu)
	} catch (e) {
		next(e)
	}
}
exports.dropDownDeletePostController = async (req, res, next) => {
	try {
		let hasAdminWithReq = await Admin.findOne({ _id: req.admin._id })
		if (!hasAdminWithReq) {
			return res.json({ message: "You're Not Authenticated User" })
		}
		let { id } = req.params
		let { name, action } = req.body
		let deletedMenu = await Menu.findOneAndUpdate(
			{ _id: id },
			{
				$pull: {
					dropDown: {
						name,
						href: action,
					},
				},
			},
			{
				new: true,
			}
		)
		if (!deletedMenu) {
			return res.json({
				message: 'Internal Server Error',
			})
		}
		res.json(deletedMenu)
	} catch (e) {
		next(e)
	}
}
exports.dropDownUpdatePutController = async (req, res, next) => {
	try {
		let { id } = req.params
		let { name, action, ind } = req.body
		let hasAdminWithReq = await Admin.findOne({ _id: req.admin._id })
		if (!hasAdminWithReq) {
			return res.json({
				message: "You're Not Authenticated User",
			})
		}
		if (name.length === 0 || action.length === 0) {
			return res.json({
				message: 'Cannot Be Empty Field',
			})
		}
		let hasMenu = await Menu.findOne({ _id: id })
		if (!hasMenu) {
			return res.json({
				message: 'Menu Not Found',
			})
		}
		let error = {}
		hasMenu.dropDown.forEach((d,indOfd)=> {
			if(indOfd.toString()!==ind.toString()){
				if (d.name === name || d.href === action) {
					error.message = 'Already Used Menu Name or Action'
				}
			}
			
		})
		if (Object.keys(error).length !== 0) {
			return res.json({
				message: error.message,
			})
		}

		if (ind === null || undefined) {
			return res.json({
				message: 'Please Refresh Page',
			})
		}

		let updatedElement = await Menu.findOne({ _id: id })

		updatedElement.dropDown[ind].name = name
		updatedElement.dropDown[ind].href = action

		let updatedMenu = await Menu.findOneAndUpdate({ _id: id }, updatedElement, {
			new: true,
		})
		if (!updatedMenu) {
			return res.status(500).json({
				message: 'Internal Server Error',
			})
		}
		res.status(200).json(updatedMenu)
	} catch (e) {
		next(e)
	}
}
