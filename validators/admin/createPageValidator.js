const { body } = require('express-validator')
const Page = require('../../models/Page')

module.exports = [
	body('menuName')
		.not()
		.isEmpty()
		.withMessage('Please Select Menu Name')

		.custom(async value => {
			console.log('The see' + value)
			let page = await Page.findOne({ menu: value })
			if (page) {
				return Promise.reject('Already Exist This Menu and Page')
			}
			return true
		}),
	body('title').not().isEmpty().withMessage("Can't Be Empty Field"),
	body('body').not().isEmpty().withMessage("Can't Be Empty Field"),
]
