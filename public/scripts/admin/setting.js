import axios from 'axios'
// Web Name Setting

let webNameEditBtn = document.querySelectorAll('.webNameEditBtn')
let webNameParent = document.querySelectorAll('.webNameParent')
let webNameControllParent = document.querySelectorAll('.webNameControllParent')

webNameParent.forEach((parent, indOfParent) => {
	webNameEditBtn.forEach((editBtn, indOfBtn) => {
		webNameControllParent.forEach((controlParent, indOfControlParent) => {
			editBtn.addEventListener('click', function () {
				if (indOfParent === indOfBtn) {
					if (indOfBtn === indOfControlParent) {
						let language = editBtn.dataset.lang
						createWebNameEditInputField(parent, controlParent, editBtn, language)
					}
				}
			})
		})
	})
})
function createWebNameEditInputField(parentElem, controlParent, editBtn, lang) {
	parentElem.innerText = ''
	let updateInputField = document.createElement('input')
	updateInputField.setAttribute('type', 'text')
	updateInputField.setAttribute('value', parentElem.dataset.webname)
	updateInputField.className = 'editInputStyle'

	parentElem.appendChild(updateInputField)
	editBtn.style.display = 'none'

	let updateBtn = document.createElement('button')
	updateBtn.className = 'btn btn-primary btn-sm'
	updateBtn.innerHTML = 'update'
	controlParent.appendChild(updateBtn)

	updateBtn.addEventListener('click', function () {
		webNameupdateReqSentToServer(parentElem, updateInputField, updateBtn, editBtn, lang)
	})
}
function webNameupdateReqSentToServer(parentElem, updateField, updateBtn, editBtn, lang) {
	let webNameUpdateUrl = `/administrator/setting/web_name_update/${lang}`
	if (updateField.value.length === 0) {
		return alert('Please provied Name')
	}

	axios
		.put(webNameUpdateUrl, {
			webname: updateField.value,
		})
		.then(res => {
			if (res.data.message) {
				parentElem.innerText = res.data.webname
				updateField.remove()
				updateBtn.style.display = 'none'
				editBtn.style.display = 'inline-block'
			} else {
				alert('Internal Server Error')
			}
		})
		.catch(err => {
			console.log(err)
		})
}




let webLogoParent = document.getElementById('web-logo-img-parent')
let webLogoUploadField = document.getElementById('webLogoUploadField')
let webLogoPreview = document.getElementById('web-logo-preview')

if(webLogoUploadField){
	webLogoUploadField.addEventListener('change',(e)=>{
		webLogoParent.style.display = 'block'
		webLogoPreview.src=URL.createObjectURL(e.target.files[0])
		
	})	
}

















// Web Name Logo
// let testImgUpload = document.getElementById('testImgUpload')
// let imgParent = document.getElementById('img-parent')


// testImgUpload.addEventListener('change',(e)=>{
	
// 	let img = document.createElement('img')
// 	img.setAttribute('src',URL.createObjectURL(e.target.files[0]))
// 	img.setAttribute('width','120px')
// 	img.setAttribute('height','120px')
// 	img.style.borderRadius = '8px'
// 	imgParent.appendChild(img)

// 	imgParent.parentElement.className = 'card mb-2'
// 	imgParent.className = 'card-body text-center'
// 	// let parent = imgParent.parentElement
	
// 	// imgParent.className = 'text-center'
// 	// testImgUpload.className = 'text-center'
// })

