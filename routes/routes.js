const adminAuthRoute = require('./adminAuthRoute')
const adminRoute = require('./adminRoute')
const menuRoute = require('./menuRoute')
const pageRoute = require('./pageRoute')
const router = [
	{
		path: '/administrator',
		handler: 
		[
			adminRoute,
			menuRoute,
			pageRoute
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
		handler: (req, res, next) => {
			res.json({ message: 'Assalamu Alaikum' })
		},
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
