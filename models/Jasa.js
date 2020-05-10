const { Schema, model } = require('mongoose')

const schema = new Schema({
	name: {
		type: String,
		trim: true,
		maxlength: 150,
		required: true,
	},
	logo: String,
	slider: {
		image1: String,
		image2: String,
		image3: String,
		image4: String,
		image5: String,
	},
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

const Jasa = new model('Jasa', schema)

module.exports = Jasa
