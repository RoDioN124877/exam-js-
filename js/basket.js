let basket_open = document.querySelector('.basket')
let basket_close = document.querySelector('.basket__exe');
let basket__all = document.querySelector('.basket__all');
let basket__conteiner = document.querySelector('.basket__conteiner');
let all_price = document.querySelector('.all_price')
let all_price_num = 0
let basketValue = 0;
let allplus = []
let allminus = []
basket_open.addEventListener("click", () => {
    basket__all.style.display = "flex";
});

basket_close.addEventListener("click", () => {
    basket__all.style.display = "none";
});

function add_basket(e) {
    let card = e.parentNode.parentNode;
    basketValue++;
    basket_open.querySelector('.basket__logo').innerText = basketValue;
    let allcard = basket__conteiner.querySelectorAll(".card");
    if (allcard.length > 0) {
        let cartFound = false;
        allcard.forEach(existingCard => {
            if (existingCard.querySelector(".name").innerHTML == card.querySelector('.name').innerHTML) {
                let quantityInput = existingCard.querySelector('.que_cont').querySelector(".quee");
                quantityInput.innerHTML = parseInt(quantityInput.innerHTML) + 1;
                all_price_num += Number(card.querySelector('div').querySelector('p').innerHTML.slice(0, -1).slice(0, -1))
                all_price.innerHTML = `сумма: ${numMask(all_price_num)}`
                saveBasketToLocalStorage();
                cartFound = true;
            }
        });
        if (!cartFound) {
            renderAtBasket(card);
        }
    } else {
        renderAtBasket(card);
    }
}

function renderAtBasket(cart) {
    let itemName = cart.querySelector('.name').innerHTML;
    let сartItem = basket__conteiner.querySelector(`.card .name[data-name="${itemName}"]`);
    let quantity = 1;
    all_price_num += Number(cart.querySelector('div').querySelector('p').innerHTML.slice(0, -1).slice(0, -1))
    all_price.innerHTML = `сумма: ${numMask(all_price_num)}`
    if (сartItem) {
        let quantityInput = сartItem.querySelector('.que_cont').querySelector(".quee");
        quantity = +(quantityInput.innerHTML) + 1;
        quantityInput.innerHTML = quantity;
    } else {
        let newCartItem = document.createElement('div');
        newCartItem.classList.add('card');
        newCartItem.innerHTML = `
            <img src="${cart.querySelector('.card_img').src}" class="card_img">
            <p class="name" data-name="${itemName}">${itemName}</p>
            <p class="price">${cart.querySelector('div').querySelector('p').innerHTML}</p>
            <div class = "que_cont">
                <button class = "minus">-</button>
                <p class = "quee">${quantity}</p>
                <button class = "plus">+</button>
            </div>
        `;
        basket__conteiner.appendChild(newCartItem);

        let minusButtons = newCartItem.querySelectorAll(".minus");
        let plusButtons = newCartItem.querySelectorAll(".plus");
        allplus.push(plusButtons[plusButtons.length-1])
        allminus.push(minusButtons[minusButtons.length-1])
        
        minusButtons.forEach(elem => {
            elem.addEventListener('click', () => {
                let quantityInput = elem.parentNode.querySelector(".quee");
                all_price_num -= Number(cart.querySelector('div').querySelector('p').innerHTML.slice(0, -1).slice(0, -1));
                all_price.innerHTML = `сумма: ${numMask(all_price_num)}`;
                if (quantityInput.innerHTML > 1) {
                    quantityInput.innerHTML = parseInt(quantityInput.innerHTML) - 1;
                } else {
                    elem.parentNode.parentNode.remove();
                }
                updateBasketValue();
                saveBasketToLocalStorage();

            });
        });
    
        
        

        plusButtons.forEach(elem => {
            elem.addEventListener('click', () => {
                let quantityInput = elem.parentNode.querySelector(".quee");
                all_price_num += Number(cart.querySelector('div').querySelector('p').innerHTML.slice(0, -1).slice(0, -1))
                all_price.innerHTML = `сумма: ${numMask(all_price_num)}`
                quantityInput.innerHTML = parseInt(quantityInput.innerHTML) + 1;
                updateBasketValue();
                saveBasketToLocalStorage();

            });
        });
   
    }
    saveBasketToLocalStorage();

}
function updateBasketValue() {
    basketValue = 0;
    document.querySelectorAll('.quee').forEach(elem => {
        basketValue += parseInt(elem.innerHTML);
    });
    basket_open.querySelector('.basket__logo').innerText = basketValue;
    
}     
function numMask(num) {
    let num_str = num.toString();
    let ln = num_str.length;

    if (ln <= 3) {
        return num_str;
    }
    let resNum = '';
    for (let i = ln - 1; i >= 0; i--) {
        resNum = num_str.charAt(i) + resNum;
        if ((ln - i) % 3 === 0 && i !== 0) {
            resNum = ' ' + resNum;
        }
    }
    return resNum;
}

function saveBasketToLocalStorage() {
    let корзина = []; 

    let cartItems = basket__conteiner.querySelectorAll('.card');
    cartItems.forEach(item => {
        let itemName = item.querySelector('.name').getAttribute('data-name');
        let itemPrice = item.querySelector('.price').innerText;
        let itemQuantity = item.querySelector('.quee').innerText;
        let itemImageSrc = item.querySelector('.card_img').getAttribute('src');

        let cartItem = {
            название: itemName,
            цена: itemPrice,    
            количество: itemQuantity,
            src: itemImageSrc
        };
        корзина.push(cartItem);
    });

    localStorage.setItem('корзина', JSON.stringify(корзина));

    // Update the total quantity and total price separately
    let totalQuantity = корзина.reduce((acc, item) => acc + parseInt(item.количество), 0);
    let totalPrice = корзина.reduce((acc, item) => acc + (parseFloat(item.цена) * parseInt(item.количество)), 0);

    localStorage.setItem('общее_количество', totalQuantity);
    localStorage.setItem('общая_цена', totalPrice);
}

function loadBasketFromLocalStorage() {
    let корзина = localStorage.getItem('корзина');
    if (корзина) {
        корзина = JSON.parse(корзина);

        корзина.forEach(item => {
            let сartItem = basket__conteiner.querySelector(`.card .name[data-name="${item.название}"]`);
            if (!сartItem) {
                let newCartItem = document.createElement('div');
                newCartItem.classList.add('card');
                newCartItem.innerHTML = `
                    <img src="${item.src}" class="card_img">
                    <p class="name" data-name="${item.название}">${item.название}</p>
                    <p class="price">${item.цена}</p>
                    <div class="que_cont">
                        <button class="minus">-</button>
                        <p class="quee">${item.количество}</p>
                        <button class="plus">+</button>
                    </div>
                `;
                basket__conteiner.appendChild(newCartItem);
            }
            
        });
        
    }
    
    
    let savedTotalQuantity = localStorage.getItem('общее_количество');
    let savedTotalPrice = localStorage.getItem('общая_цена');
    if (savedTotalQuantity && savedTotalPrice) {
        basketValue = parseInt(savedTotalQuantity);
        all_price_num = parseInt(savedTotalPrice);
        all_price.innerHTML = `сумма: ${numMask(all_price_num)}`;
        basket_open.querySelector('.basket__logo').innerText = basketValue;
    }
       
    let minus = document.querySelectorAll(".minus");
    let plus = document.querySelectorAll(".plus");
    
    minus.forEach(elem => {
        elem.addEventListener('click', () => {
            let quantityInput = elem.parentNode.querySelector(".quee");
            all_price_num -= Number(elem.parentNode.parentNode.parentNode.querySelector('div').querySelector('.price').innerHTML.slice(0, -1).slice(0, -1))
            all_price.innerHTML = `сумма: ${numMask(all_price_num)}`;
            if (quantityInput.innerHTML > 1) {
                quantityInput.innerHTML = parseInt(quantityInput.innerHTML) - 1;
            } else {
                elem.parentNode.parentNode.remove();
            }
            updateBasketValue();
            saveBasketToLocalStorage();

        });
    });

    plus.forEach(elem => {
        elem.addEventListener('click', () => {
            let quantityInput = elem.parentNode.querySelector(".quee");
            all_price_num += Number(elem.parentNode.parentNode.parentNode.querySelector('div').querySelector('.price').innerHTML.slice(0, -1).slice(0, -1))
            all_price.innerHTML = `сумма: ${numMask(all_price_num)}`
            quantityInput.innerHTML = parseInt(quantityInput.innerHTML) + 1;
            updateBasketValue();
            saveBasketToLocalStorage();

        });
    });
    
}

document.querySelector('.zakazat').addEventListener('click',()=>{
    if(document.querySelector('.account').querySelector('.name').innerHTML != "Войдите в аккаунт"){
        window.location.href = 'checkout.html'; 
    }
    else{
        alert("Сначало войдите в аккаунт")
    }
})

window.addEventListener('load', loadBasketFromLocalStorage);
