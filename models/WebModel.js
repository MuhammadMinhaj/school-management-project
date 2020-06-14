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
	breakingNews:[
		{
			title:String,
			url:String
		}
	],
	notice:[
		{
			title:String,
			text:String,
			date:{
				date:String,
				month:String,
				year:String
			},
			numberDate:String,
			image:String,
			action:String
		}
	],
	latestNews:{
		title:String,
		text:String,
		date:String
	},
	socialLinks: [
		{
			name:String,
			action:String,
			icon:String,
			color:String
		}
	],
	futuredLinks:[
		{
			name:String,
			url:String
		}
	],
	about:{
		title:{
			type:String,
			trim:true
		},
		body:{
			type:String,
			trim:true
		}
	}
})

const WebModel = new model('WebModel', schema)

module.exports = WebModel
