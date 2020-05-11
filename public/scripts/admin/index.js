// toggler
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
// Short Selector By Js
function $(selector){
    return document.querySelector(selector)
}


// Setting Menu Toggler
toggler($('.setting'),$('.setting-menu'))

