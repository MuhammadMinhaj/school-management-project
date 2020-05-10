// Setting Toogler Button

let settingBtn = document.querySelector('.setting')
let settingMenu = document.querySelector('.setting-menu')



if(settingBtn){
    settingBtn.addEventListener('click',function(){
        let settingMenuCss = getComputedStyle(settingMenu)
        if(settingMenuCss.display==='none'){
            settingMenu.style.display='block'
        }else{
            settingMenu.style.display='none'
        }
    })
}