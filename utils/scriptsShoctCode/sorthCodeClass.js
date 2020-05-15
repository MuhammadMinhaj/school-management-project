export class Short {
	constructor() {
		this.$ = value => {
			return document.querySelector(value)
		}
	}
	toggler(btn, dropDownMenu) {
	
		if (btn) {
			btn.addEventListener('click', toggleHandler)
			function toggleHandler() {
				let dropDownCss = getComputedStyle(dropDownMenu)

				if (dropDownCss.display === 'none') {
					dropDownMenu.style.display = 'block'
				
				} else {
					dropDownMenu.style.display = 'none'
				}
			}
			
		}
		
	}
}
