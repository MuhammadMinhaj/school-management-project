import axios from 'axios'

// ANCHOR Star Alert Message
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
//End Alert Message

// const HOST_URL = `http://localhost:8080`

// Multiple Page Collapse
let pageBtns = document.querySelectorAll('.pageBtn')
let pageContainers = document.querySelectorAll('.pages-menu-container')
let pages = document.querySelectorAll('.pages')
let pageIcons = document.querySelectorAll('.pageSort')

if(pageBtns){
	pageBtns.forEach((pageBtn,pageBtnind)=>{
		pageBtn.addEventListener('click', () => {
			pageContainers.forEach((pageContainer,pageConInd)=>{
				if(pageBtnind===pageConInd){
					pages.forEach((page,pageInd)=>{
						if(pageInd===pageBtnind){
							pageIcons.forEach((pageIcon,pageIconInd)=>{
								if(pageBtnind===pageIconInd){
									let checkPageCss = getComputedStyle(pageContainer)
								if (checkPageCss.display === 'none') {
									pageContainer.style.display = 'block'
									page.style.transform = 'translateX(15px)'
									page.classList.add('clickToStyle')
									pageIcon.style.transform = 'rotate(0deg)'
								} else {
									pageContainer.style.display = 'none'
									page.style.transform = 'translateX(0px)'
									page.classList.remove('clickToStyle')
									pageIcon.style.transform = 'rotate(90deg)'
								}
								}
							})

						}
					})
				}
			})
		})
	})
}
// Multiple Page Collapse End


// Menu Start
// let MENU_CREATE_URL = `${HOST_URL}/administrator/menu-create`
// let GET_ALL_MENU_URIL =`${HOST_URL}/administrator/menus`
// let DELETE_MENU_URL = `${HOST_URL}/administrator/menu-delete`
// let UPDATE_MENU_URL = `${HOST_URL}/administrator/menu-update`

let MENU_CREATE_URL = '/administrator/menu-create'
let GET_ALL_MENU_URIL ='/administrator/menus'
let DELETE_MENU_URL = '/administrator/menu-delete'
let UPDATE_MENU_URL = '/administrator/menu-update'

let alertMenuBox = document.getElementById('alert-menu-box')
let parentMenuElement = document.getElementById('menu_tbody')
let emptyMenuMessageContainer = document.getElementById('menu-empty-message-container')

let allDataLength

// Empty Data Message
let textContainer = document.createElement('h5')
textContainer.innerText = 'There is nothing to show'
textContainer.className = 'text-center text-muted'
textContainer.style.fontWeight = 'bold'
textContainer.style.height = '100px'
textContainer.style.lineHeight = '100px'
textContainer.style.fontFamily = 'Arial black'
// Lodding Data Message
let loadingMessage = document.createElement('h5')
loadingMessage.innerText = 'Loading...'
loadingMessage.className = 'text-center text-muted'
loadingMessage.style.fontWeight = 'bold'
// Start Show All Menu
let everyData
axios
	.get(GET_ALL_MENU_URIL)
	.then(res => {
		everyData = res.data

		allDataLength = res.data.length
		if (res.data.length === 0) {
			emptyMenuMessageContainer.appendChild(textContainer)
		} else {
			res.data.forEach((data, index) => {
				if (parentMenuElement) {
					createMenuTable(parentMenuElement, data, index + 1)
				}
			})
		}
		loadingMessage.remove()
	})
	.catch(error => {
		console.log(error)
	})
// End Show All Menu

if (!everyData) {
	if (emptyMenuMessageContainer) {
		emptyMenuMessageContainer.appendChild(loadingMessage)
	}
}
// Start Create Menu Request
let menuName = document.getElementById('menu_name')
let menuAction = document.getElementById('menu_action')
let menuCreateBtn = document.getElementById('menu_create')
let createMenuModalBox = document.getElementById('create-menu-modal-box')

if (menuCreateBtn) {
	menuCreateBtn.addEventListener('click', createMenuHandler)
}

function createMenuHandler() {
	let name = menuName.value
	let action = menuAction.value

	if (name.length === 0) {
		menuName.classList.add('is-invalid')
	}
	if (action.length === 0) {
		createMenuModalBox.appendChild(alertMessage('fail', 'Invalid Creadentials', 700, 'py-1'))
		return menuAction.classList.add('is-invalid')
	}

	axios
		.post(MENU_CREATE_URL, {
			name,
			action,
		})
		.then(res => {
			let { data } = res
			createMenuTable(parentMenuElement, data, 'New')
			createMenuModalBox.appendChild(alertMessage('success', 'Successfully Created New Menu', 2000, 'py-1'))
			menuName.value = ''
			menuAction.value = ''
			menuName.classList.remove('is-invalid')
			menuAction.classList.remove('is-invalid')
			textContainer.remove()
		})
		.catch(error => {
			console.log(error)
		})
}
// End Create Menu Request

function editMenuHandler(TR, editBtnParent, editBtn, data, name, action) {
	name.innerText = ''
	let nameField = document.createElement('input')
	nameField.setAttribute('type', 'text')
	nameField.setAttribute('name', 'name')
	nameField.setAttribute('value', data.name)
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
	actionField.setAttribute('value', data.href)
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
		updateBtnHandler(editBtn, updateBtn, nameField, actionField, data, name, action)
	})
}

function updateBtnHandler(editBtn, updateBtn, nameField, actionField, data, name, action) {
	let nameUpValue = nameField.value
	let actionUpValue = actionField.value
	if (nameUpValue.length === 0 || actionUpValue.length === 0) {
		return alertMenuBox.appendChild(alertMessage('fail', "Can't Be Empty Field", 1000, 'w-50 py-1 m-auto'))
	}

	axios
		.put(`${UPDATE_MENU_URL}/${data._id}`, {
			name: nameUpValue,
			action: actionUpValue,
		})
		.then(res => {
			let { updatedMenu } = res.data
			name.innerText = updatedMenu.name
			action.innerText = updatedMenu.href
			nameField.remove()
			actionField.remove()
			updateBtn.remove()
			editBtn.style.display = 'block'
			alertMenuBox.appendChild(alertMessage('success', res.data.message, 1000, 'w-50 py-1 m-auto'))
		})
		.catch(error => {
			console.log(error)
		})
}
// Start Delete Menu Handler
function deleteMenuHandler(data, TR) {
	allDataLength--

	axios
		.delete(`${DELETE_MENU_URL}/${data._id}`)
		.then(res => {
			let { data } = res
			TR.remove()
			alertMenuBox.className = 'w-50 m-auto'
			alertMenuBox.appendChild(alertMessage('success', data.message, 1000, 'mt-1 py-1'))
			if (allDataLength === 0) {
				emptyMenuMessageContainer.appendChild(textContainer)
			}
		})
		.catch(error => {
			console.log(error)
		})
}

// Sart Create Menu Element
function createMenuTable(parentElement, data, index) {
	let TR = document.createElement('tr')
	TR.className = 'text-center'

	let id = document.createElement('th')
	id.setAttribute('scope', 'row')
	id.className = index === 'New' ? 'text-danger' : ''
	id.innerHTML = index
	TR.appendChild(id)

	let emptyIndex = document.createElement('td')
	TR.appendChild(emptyIndex)
	// Name
	let name = document.createElement('td')
	name.innerHTML = data.name ? data.name : 'N/A'
	TR.appendChild(name)

	let emptyName = document.createElement('td')
	TR.appendChild(emptyName)
	// Action
	let action = document.createElement('td')
	action.innerHTML = data.href ? data.href : 'N/A'
	TR.appendChild(action)

	let emptyAction = document.createElement('td')
	TR.appendChild(emptyAction)
	// Create At
	let createdAt = document.createElement('td')
	createdAt.innerHTML = data.createdAt ? data.createdAt.slice(0,10) : 'N/A'
	createdAt.className = 'text-muted'
	TR.appendChild(createdAt)

	let emptyCreatedAt = document.createElement('td')
	TR.appendChild(emptyCreatedAt)
	// DropDown
	let dropDown = document.createElement('td')
	dropDown.innerHTML = data.dropDown.length === 0 ? 'N/A' : 'Available'
	TR.appendChild(dropDown)

	let emptyDrop = document.createElement('td')
	TR.appendChild(emptyDrop)
	// Controlling
	TR.appendChild(menuControlling(data, TR, name, action))

	let emptyMenuControl = document.createElement('td')
	TR.appendChild(emptyMenuControl)
	// DropDownControlling
	TR.appendChild(dropDownControlling(data))

	parentElement.appendChild(TR)
}

// End Create Menu Element

// Start Menu Controlling Element
function menuControlling(data, TR, name, action) {
	let TD = document.createElement('td')
	TD.className = 'd-flex'

	let deleteBtn = document.createElement('button')
	deleteBtn.className = 'btn btn-sm'
	let deleteIcon = document.createElement('i')
	deleteIcon.className = 'fas fa-trash-alt text-danger'
	deleteBtn.appendChild(deleteIcon)
	TD.appendChild(deleteBtn)

	let editBtn = document.createElement('button')
	editBtn.className = 'btn btn-sm'
	let editIcon = document.createElement('i')
	editIcon.className = 'fas fa-edit text-info'
	editBtn.appendChild(editIcon)
	TD.appendChild(editBtn)

	editBtn.addEventListener('click', function () {
		editMenuHandler(TR, TD, editBtn, data, name, action)
	})
	deleteBtn.addEventListener('click', function () {
		deleteMenuHandler(data, TR)
	})
	return TD
}
// End Menu Controlling Element

// Start DropDown Controlling Element
// let GET_ALL_DROP_MENU_URI = `${HOST_URL}/administrator/dropdown-create`
let GET_ALL_DROP_MENU_URI = '/administrator/dropdown-create'

function dropDownControlling(data) {
	let TD = document.createElement('td')
	let showBtn = document.createElement('a')
	showBtn.className = 'btn btn-secondary btn-sm mr-1'
	showBtn.innerHTML = 'Show'
	showBtn.style.fontSize = '12px'
	showBtn.setAttribute('href', `${GET_ALL_DROP_MENU_URI}/${data._id}`)
	TD.appendChild(showBtn)
	return TD
}
// End DropDown Controlling Element

// Menu End
