import result from './result';
import contact from './contact'


let showText = document.querySelectorAll('.showText')
if(showText){
	showText.forEach(text=>{
		text.innerHTML = text.dataset.content
	})
}

$(function () {
	$('[data-toggle="popover"]').popover()
})


// Conver Navigation Bar Normal Mode To Sticky Mode 
let __navbar = document.querySelector('header')
let sticky = __navbar.offsetTop

window.addEventListener('scroll',()=>{
	if(window.pageYOffset>=sticky){
		__navbar.classList.add('sticky')
	}else{
		__navbar.classList.remove('sticky')
	}	
})


// Navigation Handler

let toggle = document.getElementById('toggle')
let navBar = document.getElementById('__navbar')

toggle.addEventListener('click',()=>{
	if(navBar.classList.contains('__Active')){
		navBar.classList.remove('__Active')
	
		toggle.children[0].style.display = 'inline-block'
		toggle.children[1].style.display = 'none'
	}else{
		navBar.classList.add('__Active')
		toggle.children[0].style.display = 'none'
		toggle.children[1].style.display = 'inline-block'
	}
})

let dropToggler = document.querySelectorAll('.drop__toggle')
let dropdown = document.querySelectorAll('.__dropdown')

dropToggler.forEach((toggler,ind1)=>{
	toggler.addEventListener('click',()=>{

		if(toggler.children[0].children[0].classList.contains('drop-toggle-icon')){
			toggler.children[0].children[0].classList.remove('drop-toggle-icon')
		}else{
			toggler.children[0].children[0].classList.add('drop-toggle-icon')
		}
			dropdown.forEach((d,ind2)=>{
			if(ind1===ind2){
					if(d.classList.contains('__dropdown-active')){
					d.classList.remove('__dropdown-active')
					toggler.children[0].addEventListener('mouseover',()=>{
						toggler.children[0].style.borderBottom='1px dashed orange'
						
					})
					toggler.children[0].addEventListener('mouseout',()=>{
						toggler.children[0].style.borderBottom='none'
						
					})
					
				}else{
					toggler.children[0].addEventListener('mouseover',()=>{
						toggler.children[0].style.borderBottom='none'
						
					})
					d.classList.add('__dropdown-active')
				}
			}
			
		})
	})
	
})
