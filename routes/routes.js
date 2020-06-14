const adminAuthRoute = require('./adminAuthRoute')
const adminRoute = require('./adminRoute')
const menuRoute = require('./menuRoute')
const pageRoute = require('./pageRoute')
const settingRoute = require('./settingRoute')
const noticeRoute = require('./noticeRoute')
const departmentRoute = require('./departmentRoute')
// Web Explorer Related Routes
const webRoute = require('./webRoute')

const router = [
	{
		path: '/administrator',
		handler: 
		[
			adminRoute,
			menuRoute,
			pageRoute,
			settingRoute,
			noticeRoute,
			departmentRoute
		],
	},
	{
		path: '/auth',
		handler: adminAuthRoute,
	},
	{
		path: '/test',
		handler: (req, res, next) => {
			// res.send('It\'s only project test')
			res.render('pages/explorer/explorer.ejs')
		},
	},
	{
		path: '/',
		handler: webRoute
	},
]
module.exports = app => {
	router.forEach(r => {
		if (r.path === '/') {
			app.get(r.path, r.handler)
		} else {
			app.use(r.path, r.handler)
		}
	})
}
