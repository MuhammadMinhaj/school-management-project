import { Person } from '../../../utils/shortCode'
// Short Selector By Js
console.log(Person.print('Assalamu Alaikum'))

function $(selector){
    return document.querySelector(selector)
}
function toggler(btn,dropDown){
    if(btn){
        btn.addEventListener('click',function(){
            let itemCss = getComputedStyle(dropDown)
            if(itemCss.display==='none'){
                dropDown.style.display='block'
            }else{
                dropDown.style.display='none'
            }
        })
    }
}

// Setting Menu Toggler
toggler($('.setting'),$('.setting-menu'))

