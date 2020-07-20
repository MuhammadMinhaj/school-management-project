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
const emailsRoute = require('./administrator/emailsRoute')

// All Imported User Related  Routes
const userAuthRoute = require('./user/authRoute')
const userRoute = require('./user/userRoute')
const classRoute = require('./user/classRoute')
const resultRoute = require('./user/resultRoute')
// Web Explorer Related Routes
const webRoute = require('./web/webRoute')

// Api Route Imported
const resultApiRoute = require('./api/resultApiRoute')

// Root Page Controller Imported For Root Route 
const {
	indexPageGetController
} = require('../controllers/web/webController')

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
			resultManagementRoute,
			emailsRoute
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
		path:'/api',
		handler:resultApiRoute
	},
	{
		path:'/web',
		handler:webRoute
	},
	{
		path: '/',
		handler: indexPageGetController,
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
