import axios from 'axios'
function alertMessage(option, message, time, classNames) {
	let alerts = document.createElement('div')
	alerts.className = option === 'fail' ? `alert alert-danger ${classNames}` : `alert alert-success ${classNames}`
	alerts.setAttribute('role', 'alert')
	alerts.innerHTML = message
	setTimeout(() => {
		alerts.remove()
	}, time)
	return alerts
}

let emptyMessageContainer = document.getElementById('dropDown-empty-message-container')
let textContainer = document.createElement('h5')
textContainer.innerText = 'There is nothing to show'
textContainer.className = 'text-center text-muted'
textContainer.style.fontWeight = 'bold'
textContainer.style.height = '100px'
textContainer.style.lineHeight = '100px'
textContainer.style.fontFamily = 'Arial black'

let loadingMessage = document.createElement('h5')
loadingMessage.innerText = 'Loading...'
loadingMessage.className = 'text-center text-muted'
loadingMessage.style.fontWeight = 'bold'

let GET_ALL_DROPDOWN_URI = 'http://localhost:8080/administrator/dropdown-all'
let CREATE_DROPDOWN_URI = 'http://localhost:8080/administrator/dropdown-create'
let DELETE_DROPDOWN_URI = 'http://localhost:8080/administrator/dropdown-delete'
let UPDATE_DROPDOWN_URI = 'http://localhost:8080/administrator/dropdown-update'
let tbody = document.getElementById('dropDownBody')

let id = undefined
let allDataLength;
let everyData;

if (tbody) {
	id = tbody.dataset.id
}

if (id) {
	axios
		.get(`${GET_ALL_DROPDOWN_URI}/${id}`)
		.then(res => {
			let { data } = res
			everyData = data
			allDataLength = data.dropDown.length
			if (data.dropDown) {
				if (data.dropDown.length === 0) {
					emptyMessageContainer.appendChild(textContainer)
				} else {
					data.dropDown.forEach((menu, index) => {
						tbody.appendChild(createDropDownModel(menu, index + 1))
					})
				}
			}
			loadingMessage.remove()
		})
		.catch(error => {
			console.log(error)
		})
}

// Loading Message 
if(!everyData){
	if(emptyMessageContainer){
		emptyMessageContainer.appendChild(loadingMessage)
	}
}


// Create DropDown
let nameField = document.getElementById('dropDownNameField')
let actionField = document.getElementById('dropDownActionField')
let createBtn = document.getElementById('createDropDownBtn')

let dropDownAlertBox = document.getElementById('alert-drop-menu-box')
if (createBtn) {
	createBtn.addEventListener('click', function () {
		if (nameField.value.length === 0 || actionField.value.length === 0) {
			return dropDownAlertBox.appendChild(alertMessage('fail', 'Invalid Creadentials', 2000, 'w-50 py-1 m-auto'))
		}
		axios
			.post(`${CREATE_DROPDOWN_URI}/${id}`, {
				name: nameField.value,
				action: actionField.value,
			})
			.then(res => {
				let { data } = res
				if (data.message) {
					return dropDownAlertBox.appendChild(alertMessage('fail', data.message, 2000, 'w-50 py-1 m-auto'))
				}
				if (data.dropDown) {
					let data = {
						name: nameField.value,
						href: actionField.value,
					}
					tbody.appendChild(createDropDownModel(data, 'New'))
					dropDownAlertBox.appendChild(alertMessage('success', 'Successfully Created Menu', 2000, 'w-50 py-1 m-auto'))
					textContainer.remove()
					nameField.value = ''
					actionField.value = ''
				}
			})
			.catch(error => {
				console.log(error)
			})
	})
}

// Create Dropdown Functionality
function createDropDownModel(menu, index) {
	let TR = document.createElement('tr')
	TR.className = 'text-center'
	let sirialId = document.createElement('th')
	sirialId.scope = 'row'
	sirialId.innerHTML = index ? index : 'N/A'
	sirialId.className = index === 'New' ? 'text-danger' : 'text-dark'
	TR.appendChild(sirialId)

	let emptyId = document.createElement('td')
	TR.appendChild(emptyId)

	let title = document.createElement('td')
	title.innerHTML = menu.name
	TR.appendChild(title)

	let emptyTitle = document.createElement('td')
	TR.appendChild(emptyTitle)

	let action = document.createElement('td')
	action.innerHTML = menu.href
	TR.appendChild(action)

	let emptyAction = document.createElement('td')
	TR.appendChild(emptyAction)

	let controlling = document.createElement('td')

	let deleteBtn = document.createElement('button')
	deleteBtn.className = 'btn btn-sm'
	let deleteIcon = document.createElement('i')
	deleteIcon.className = 'fas fa-trash-alt text-danger'
	deleteBtn.appendChild(deleteIcon)
	controlling.appendChild(deleteBtn)

	deleteBtn.addEventListener('click', function () {
		deletedDropDownMenuHandler(menu, TR)
	})

	let editBtn = document.createElement('button')
	editBtn.className = 'btn btn-sm mr-1'
	let editIcon = document.createElement('i')
	editIcon.className = 'fas fa-edit text-info'
	editBtn.appendChild(editIcon)
	controlling.appendChild(editBtn)

	editBtn.addEventListener('click', function () {
		dropDownEditHandler(menu, controlling, editBtn, title, action, index)
	})

	TR.appendChild(controlling)

	return TR
}

// DropDown Update Functionality
function dropDownEditHandler(menu, editBtnParent, editBtn, name, action, index) {
	name.innerText = ''
	let nameField = document.createElement('input')
	nameField.setAttribute('type', 'text')
	nameField.setAttribute('name', 'name')
	nameField.setAttribute('value', menu.name)
	nameField.setAttribute('placeholder', 'Title')
	name.appendChild(nameField)
	nameField.className = 'w-75 input-focus-style'
	nameField.style.border = '1px solid #0000001f'
	nameField.style.borderRadius = '10px'
	nameField.style.paddingLeft = '7px'
	nameField.style.paddingRight = '5px'
	nameField.style.outline = 'none'

	action.innerText = ''
	let actionField = document.createElement('input')
	actionField.setAttribute('type', 'text')
	actionField.setAttribute('name', 'action')
	actionField.setAttribute('value', menu.href)
	actionField.setAttribute('placeholder', 'Action')
	action.appendChild(actionField)
	actionField.className = 'w-75 input-focus-style'
	actionField.style.border = '1px solid #0000001f'
	actionField.style.borderRadius = '10px'
	actionField.style.paddingLeft = '7px'
	actionField.style.paddingRight = '5px'
	actionField.style.outline = 'none'

	let updateBtn = document.createElement('button')
	updateBtn.className = 'btn btn-primary btn-sm'
	updateBtn.style.fontSize = '10px'
	updateBtn.innerText = 'Update'
	editBtnParent.appendChild(updateBtn)
	editBtn.style.display = 'none'

	updateBtn.addEventListener('click', function () {
		dropDownUpdateHandler(name, action, nameField, actionField, updateBtn, editBtn, index)
	})
}
// DropDown Update With Ajax Request
function dropDownUpdateHandler(name, action, nameField, actionField, updateBtn, editBtn, index) {
	if (nameField.value.length === 0 || actionField.value.length === 0) {
		return dropDownAlertBox.appendChild(alertMessage('fail', 'Invalid Creadentials', 2000, 'w-50 py-1 m-auto'))
	}
	axios
		.put(`${UPDATE_DROPDOWN_URI}/${id}`, {
			name: nameField.value,
			action: actionField.value,
			ind: index - 1,
		})
		.then(res => {
			let { data } = res
			if (data.message) {
				return dropDownAlertBox.appendChild(alertMessage('fail', data.message, 2000, 'w-50 py-1 m-auto'))
			}

			name.innerText = nameField.value
			action.innerText = actionField.value
			editBtn.style.display = 'inline-block'
			nameField.remove()
			actionField.remove()
			updateBtn.remove()
			dropDownAlertBox.appendChild(alertMessage('sucess', 'Successfully Update Menu', 2000, 'w-50 py-1 m-auto'))
		})
		.catch(error => {
			console.log(error)
		})
}

// DropDown Delete Handler
function deletedDropDownMenuHandler(menu, parentElement) {
	axios
		.post(`${DELETE_DROPDOWN_URI}/${id}`, {
			name: menu.name,
			action: menu.href,
		})
		.then(res => {
			let { data } = res
			if (data.message) {
				return dropDownAlertBox.appendChild(alertMessage('fail', data.message, 2000, 'w-50 py-1 m-auto'))
			}
			parentElement.remove()
			dropDownAlertBox.appendChild(alertMessage('success', 'Successfully Deleted DropDown Menu', 2000, 'w-50 py-1 m-auto'))
			allDataLength--
			if (allDataLength === 0) {
				emptyMessageContainer.appendChild(textContainer)
			}
		})
		.catch(error => {
			console.log(error)
		})
}
