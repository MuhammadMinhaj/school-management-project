const { Schema, model } = require('mongoose')

const schema = new Schema({
	name:[
		{
			lang:String,
			name:String
		}
	],
	logo: String,
	slider: [
		{
			name:String,
			image:String,
			btnName:String,
			action:String,
			text:String
		}
	],
	menu: {
		type: Schema.Types.ObjectId,
		ref: 'Menu',
	},
	gallery: {
		type: Schema.Types.ObjectId,
		ref: 'Gallery',
	},
	footer: {
		brand: {
			title: String,
			body: String,
		},
		featured: {
			type: Schema.Types.ObjectId,
			ref: 'Featured',
		},
		about: {
			title: String,
			body: String,
		},
		contact: {
			location: String,
			phone: String,
			email: String,
		},
		links: {
			google: String,
			facebook: String,
			twitter: String,
			youtube: String,
		},
	},
})

const WebModel = new model('WebModel', schema)

module.exports = WebModel
