let cards_arrr = [];
const cont = document.querySelector('.container__cotolog');
let pets_value = 8;
const itemAddedPopups = document.querySelector('.item-added-popup');
function get_pet_id() {
    const promises = [];
    for (let i = 0; i < pets_value; i++) {
        promises.push(
            fetch("https://api.thecatapi.com/v1/images/search?has_breeds=1")
                .then(response => response.json())
                .then(res => {
                    res.forEach(e => {
                        return get_pet_by_id(e.id);
                    });
                })
        );
    }
    return Promise.all(promises);
}

function get_pet_by_id(id) {
    return fetch(`https://api.thecatapi.com/v1/images/${id}`)
        .then(response => response.json())
        .then(res => {
            cards_arrr.push(res);
        });
}

async function push_pet() {
    await get_pet_id();
    render_all(cards_arrr);
}

function render_all(elem) {
    cont.innerHTML = ''; 

    elem.forEach(e => {
        cont.innerHTML += `
        <div class="card">
            <img src="${e.url}" class="card_img">
            <p class="name">${e.breeds[0].name}</p>
            <div>
                <p class="price">${(e.breeds[0].name.length) * 3000} ₸</p>
                <button class="buy_btn">buy</button>
            </div>
        </div>`;
    });

    const buy_btn = document.querySelectorAll('.buy_btn');
    buy_btn.forEach(e => {
        e.addEventListener('click', () => {
            add_basket(e);
        });
    });

    

    const card_img = document.querySelectorAll(".card_img");
    card_img.forEach((e, i) => {
        e.addEventListener('click', () => {
            document.querySelector('.card_info').style.display = "flex";
            render_prosmotr(e, elem[i].breeds[0].origin, elem[i].breeds[0].temperament);
        });
    });
}
push_pet()

let show__all = document.querySelector('.show__all')
show__all.addEventListener('click',()=>{
    push_pet();
})