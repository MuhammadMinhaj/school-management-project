import result from './result';
import contact from './contact'




let btns = document.querySelectorAll('.dropDownToggler')
let dropMenus = document.querySelectorAll('.dropDown-style')

btns.forEach((btn, indBtn) => {
	let isEnabled = false
	btn.addEventListener('click', function () {
		dropMenus.forEach((dropMenu, dropInd) => {
			if (indBtn === dropInd) {
				let cssDrop = getComputedStyle(dropMenu)
				if (cssDrop.display === 'none') {
					dropMenu.classList.add('drop-show')
					dropMenu.classList.remove('drop-hide')
					isEnabled = true
				} else {
					dropMenu.classList.remove('drop-show')
					dropMenu.classList.add('drop-hide')
				}
			} else {
				dropMenu.classList.remove('drop-show')
				dropMenu.classList.add('drop-hide')
			}
			if (indBtn === dropInd) {
				
					window.ondblclick = () => {
						if (isEnabled) {
							dropMenu.classList.remove('drop-show')
							dropMenu.classList.add('drop-hide')
						}
					}
				
			}
		})
	})
})

let showText = document.querySelectorAll('.showText')
if(showText){
	showText.forEach(text=>{
		text.innerHTML = text.dataset.content
	})
}

$(function () {
	$('[data-toggle="popover"]').popover()
})


