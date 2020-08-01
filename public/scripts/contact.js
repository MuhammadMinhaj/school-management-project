import axios from 'axios'

// const HOST_URL = `http://localhost:8080`

let feedback = document.getElementById('contactFeedBack')

let name = document.getElementById('contactName')
let email = document.getElementById('contactEmail')
let subject = document.getElementById('contactSubject')
let message = document.getElementById('contactMessage')

let submit = document.getElementById('contactSubmitBtn')

let nameError = document.getElementById('contactNameError')
let emailError = document.getElementById('contactEmailError')
let subjectError = document.getElementById('contactSubjectError') 
let messageError = document.getElementById('contactMessageError')



if(submit){
name.addEventListener('keypress',()=>{
    name.classList.contains('is-invalid')?name.classList.remove('is-invalid'):''
})
email.addEventListener('keypress',()=>{
    email.classList.contains('is-invalid')?email.classList.remove('is-invalid'):''
})
subject.addEventListener('keypress',()=>{
    subject.classList.contains('is-invalid')?subject.classList.remove('is-invalid'):''
})
message.addEventListener('keypress',()=>{
    message.classList.contains('is-invalid')?message.classList.remove('is-invalid'):''
}) 

submit.addEventListener('click',(event)=>{
    event.preventDefault()
    let valueOfName = name.value 
    let valueOfEmail = email.value 
    let valueOfSubject =  subject.value 
    let valueOfMessage = message.value 
    
    let error = {}
    
    valueOfEmail.includes('@')?null:error.email = 'Please Provied Valid Email'
    valueOfName?null:error.name = 'Please Provied Your Name'
    valueOfEmail?null:error.email = 'Please Provied Your Email'
    valueOfSubject?null:error.subject = 'Please Provied Subject'
    valueOfMessage?null:error.message = 'Please Provied Your Opinion'
    

    if(Object.keys(error).length>0){
        nameError.innerText = error.name || ''
        emailError.innerText = error.email || ''
        subjectError.innerText = error.subject||''
        messageError.innerText = error.message||''
        error.name?name.classList.add('is-invalid'):null
        error.email?email.classList.add('is-invalid'):null 
        error.subject?subject.classList.add('is-invalid'):null 
        error.message?message.classList.add('is-invalid'):null
        return false
    }
    let data = {
        name:valueOfName,
        email:valueOfEmail,
        subject:valueOfSubject,
        message:valueOfMessage
    }
    // axios.post(`${HOST_URL}/web/contact`,data)
    axios.post('/web/contact',data)
        .then(res=>{
            if(res.data.error){
                feedback.innerHTML = res.data.error 
                feedback.className = 'form-group text-danger'
            }else{
                feedback.innerHTML = res.data.message 
                feedback.className = 'form-group text-success'
            }

            
            name.value = ""
            email.value = ""
            subject.value= ""
            message.value = ""
            setTimeout(()=>{
                feedback.className = ''
                feedback.innerText = ''
            },5000)
            
        })
        .catch(e=>{
            console.log(e)
        })
})

}
