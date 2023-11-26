const exit_account = document.querySelector('.exit__account')
const name_acc = document.querySelector('.name')
const account__logo = document.querySelector('.account__logo')
if (localStorage.getItem('Last')) {
    const localStorageData = localStorage.getItem('Last');
    const lastData = JSON.parse(localStorageData);
    if (lastData) {
        name_acc.innerHTML = lastData.username
    }
}

exit_account.addEventListener('click', () => {
    if (name_acc.innerHTML == "Войдите в аккаунт") {
        alert("Сначало войдите в Аккаунт")
    }
    else {
        name_acc.innerHTML = "Войдите в аккаунт"
        localStorage.Last = ""
    }
})
account__logo.addEventListener('click', () => {
    if (name_acc.innerHTML == "Войдите в аккаунт") {
        window.location.href = 'auto.html';
    }
})
name_acc.addEventListener('click', () => {
    if (name_acc.innerHTML == "Войдите в аккаунт") {
        window.location.href = 'auto.html';
    }
})
