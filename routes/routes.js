// All Imported Administrator Related Routes
const adminAuthRoute = require('./administrator/adminAuthRoute')
const adminRoute = require('./administrator/adminRoute')
const menuRoute = require('./administrator/menuRoute')
const pageRoute = require('./administrator/pageRoute')
const settingRoute = require('./administrator/settingRoute')
const noticeRoute = require('./administrator/noticeRoute')
const departmentRoute = require('./administrator/departmentRoute')
const linksRoute = require('./administrator/linksRoute')
const createTeacherRoute = require('./administrator/createTeacherRoute')
const resultManagementRoute = require('./administrator/resultManagementRoute')

// All Imported User Related  Routes
const userAuthRoute = require('./user/authRoute')
const userRoute = require('./user/userRoute')
const classRoute = require('./user/classRoute')
const resultRoute = require('./user/resultRoute')
// Web Explorer Related Routes
const webRoute = require('./webRoute')
const resultsPublicationRoute = require('./web/resultsPublicationRoute')


// Api Route Imported
const resultApiRoute = require('./api/resultApiRoute')

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
			departmentRoute,
			linksRoute,
			createTeacherRoute,
			resultManagementRoute
		],
	},
	{
		path:'/user',
		handler:[
			userAuthRoute,
			userRoute,
			classRoute,
			resultRoute
		]
	}
	,
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
		path:'/results',
		handler:resultsPublicationRoute
	},
	{
		path:'/api',
		handler:resultApiRoute
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
