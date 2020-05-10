const adminAuthRoute = require('./adminAuthRoute')
const adminRoute = require('./adminRoute')

const router = [
	{
		path: '/administrator',
		handler: adminRoute,
	},
	{
		path: '/auth',
		handler: adminAuthRoute,
	},
	{
		path: '/test',
		handler: (req, res, next) => {
			// res.send('It\'s only project test')
			res.render('partials/head.ejs')
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
