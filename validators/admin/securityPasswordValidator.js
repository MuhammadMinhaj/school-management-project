const { body } = require('express-validator')
const bcrypt = require('bcrypt')
module.exports = [
	body('password')
		.not()
		.isEmpty()
		.withMessage("Can't Be Empty")
		.isLength({ min: 5, max: 16 })
		.withMessage('Password Must Be 5 Chars And Max 16 Chars')
		.custom(async (value, { req }) => {
			let admin = req.admin
			if (!admin.securityPassword) {
				if (admin.password !== 'admin') {
					let checkedPassword = await bcrypt.compare(value, admin.password)
					if (!checkedPassword) {
						return Promise.reject("1 Administrator Login Password Dosen't Matched")
					}
				} else {
					if (value !== admin.password) {
						return Promise.reject("2 Administrator Login Password Dosen't Matched")
					}
				}
			} else {
				let checkedPassword = await bcrypt.compare(value, admin.securityPassword)
				if (!checkedPassword) {
					return Promise.reject("01  Old Security Password Dosen't Macthed")
				}
            }
            return true
		}),
	body('securityPassword')
		.not()
		.isEmpty()
		.withMessage("Can't Be Empty")
		.isLength({ min: 5, max: 16 })
		.withMessage('Password Must Be 5 Chars And Max 16 Chars'),
	body('confirmSecurityPassword')
		.not()
		.isEmpty()
		.withMessage("Can't Be Empty")
		.isLength({ min: 5, max: 16 })
		.withMessage('Password Must Be 5 Chars And Max 16 Chars')
		.custom((value, { req }) => {
			let { securityPassword } = req.body
			if (securityPassword !== value ) {
				return Promise.reject("Confirm Password Dosen't Matched With New Security Password")
            }
            return true
		})
]
