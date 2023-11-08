let basket_open = document.querySelector('.basket')
let basket_close = document.querySelector('.basket__exe')
let basket__all = document.querySelector('.basket__all')

basket_open.addEventListener("click",()=>{ 
    basket__all.style.display = "flex"
})

basket_close.addEventListener("click",()=>{ 
    basket__all.style.display = "none"
})
function a(){
    console.log("1");
}