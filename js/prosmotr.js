let prosmotr = document.querySelector(".card_info")
let card_info_content = document.querySelector('.card_info_content')

document.querySelector('.card_info_exe').addEventListener("click", () => {
    prosmotr.style.display = "none";
});

function render_prosmotr(elem, origin, temperament) {
    card_info_content.innerHTML = `
    <div class = "card_info_all">
        <img class="card_info_img" src=${elem.parentNode.querySelector(".card_img").src}>
        <div class="card_info_detail">
            <p class="card_info_name">Имя: ${elem.parentNode.querySelector(".name").innerHTML}</p>
            <p class="card_info_count">Страна: ${origin}</p>
            <p class="card_info_temper">Темперамент: ${temperament}</p>
        </div>
        </div>
        <div class="card_info_bying">
            <p class="card_info_price">${elem.parentNode.querySelector(".price").innerHTML}</p>
            <button class="card_info_buy">Buy</button>
        </div>
    </div>
    `
    document.querySelector('.card_info_buy').addEventListener("click",()=>{
        add_basket(elem.parentNode.querySelector('.buy_btn')) 
    })
}