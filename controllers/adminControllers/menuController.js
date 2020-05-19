let Admin = require('../../models/Admin')
let Menu = require('../../models/Menu')

exports.menuCreateGetController = (req, res, next) => {
	res.render('pages/administrator/createMenu', {
		title: 'Create Menu',
		style: 'bg-light',
		error: {},
		data: req.admin,
		flashMessage: req.flash(),
	})
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
		console.log(deleteMenu)
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
exports.menuPostController = async (req, res, next) => {}
