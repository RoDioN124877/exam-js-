let cards_arr = []
const cont = document.querySelector('.container__cotolog')

function get_pet_id() {
    const promises = [];
    for (let i = 0; i < 10; i++) {
        promises.push(
            fetch("https://api.thecatapi.com/v1/images/search?has_breeds=1")
                .then(data => data.json())
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
        .then(data => data.json())
        .then(res => {
            cards_arr.push(res);
        });
}

async function push_pet() {
    await get_pet_id();
    console.log(cards_arr);
    render_all(cards_arr)
}

async function render_all(elem){
    await elem.forEach(e=>{
        cont.innerHTML+=`
        <div class = "card">
            <img src = ${e.url} class = "card_img">
            <p>${e.breeds[0].name}</p>
            <div>
                <p>${ Math.floor(Math.random() * (120000 - 5000) + 5000)} ₸</p>
                <button class = "buy_btn">buy</button>
            </div>
        </div>
    `
    })
    a()
}

push_pet();


