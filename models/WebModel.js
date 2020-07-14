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
	departments:[
		{
			name:String,
			url:String,
			title:String,
			text:String,
			date:{
				date:String,
				month:String,
				year:String
			},
			numberDate:String,
			image:String
		}
	],
	referenceLinks:[
		{
			name:String,
			url:String 
		}
	],
	documentsLinks:[
		{
			name:String,
			document:String,
			option:String, 
		}
	],
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
	aboutOfAdmin:[
		{
			image:String,
			name:String,
			title:String,
			subtitle:String,
			bio:String
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
