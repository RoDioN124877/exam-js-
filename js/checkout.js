document.addEventListener('DOMContentLoaded', function () {
    // Загрузка корзины из локального хранилища
    const cartItems = JSON.parse(localStorage.getItem('корзина')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalQuantity = document.getElementById('total-quantity');
    const totalPrice = document.getElementById('total-price');

    function displayCartItems() {
        cartContainer.innerHTML = '';
        let total = 0;
        let quantity = 0;

        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');

            const itemImage = document.createElement('img');
            itemImage.src = item.src;
            itemImage.alt = item.название;
            itemElement.appendChild(itemImage);

            const itemName = document.createElement('p');
            itemName.textContent = item.название;

            const itemPrice = document.createElement('p');
            itemPrice.textContent = `Цена: ${item.цена} x ${item.количество}`;

            itemElement.appendChild(itemName);
            itemElement.appendChild(itemPrice);

            cartContainer.appendChild(itemElement);

            total += parseFloat(item.цена) * parseInt(item.количество);
            quantity += parseInt(item.количество);
        });

        totalQuantity.textContent = quantity;
        totalPrice.textContent = `$${total.toFixed(2)}`;
    }

    displayCartItems();

    const orderForm = document.getElementById('order-form');
    orderForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const email = document.getElementById('email').value;
        const paymentMethod = document.getElementById('payment-method').value;

        if (name && address && email && paymentMethod) {
            alert('Спасибо за покупку!');
            localStorage.removeItem('корзина');
            localStorage.removeItem('общее_количество');
            localStorage.removeItem('общая_цена');
            window.location.href = 'index.html';
        } else {
            alert('Пожалуйста, заполните все поля формы.');
        }
    });
});