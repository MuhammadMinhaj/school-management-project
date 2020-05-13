

function id(selector) {
	return document.getElementById(selector)
}


// ANCHOR Button
let createbtn = id('createAdminBtn')

function formHandler(e) {
    // ANCHOR Input Fieled
	let name = id('adminName').value
	let username =  id('adminUsername').value
	let email = id('adminEmail').value
	let phone = id('adminPhone').value
	let password = id('adminPassword').value
	let birthday =  id('adminBirthday').value
    let radio = document.getElementsByName('gender')
    let gender = undefined
    for(let i = 0;i<radio.length;i++){
        if(radio[i].checked){
           gender = radio[i].value
        }
    }
    
    console.log(name)
    console.log(username)
    console.log(email)
    console.log(phone)
    console.log(password)
    console.log(birthday)
    console.log(gender)

  
    
}
createbtn.addEventListener('click', formHandler)
