document.querySelector('.log_btn').addEventListener('click', function (event) {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;


  const savedUser = JSON.parse(localStorage.getItem(username));
  if (savedUser && savedUser.password === password) {
    alert('Успешная авторизация!');
    localStorage.setItem("Last", JSON.stringify(savedUser));
    window.location.href = 'index.html';
  } else {
    alert('Неверное имя пользователя или пароль.');
  }
});

document.querySelector('.reg_btn').addEventListener('click', function (event) {
  const newUsername = document.getElementById('newUsername').value;
  const newPassword = document.getElementById('newPassword').value;
  console.log(newPassword);
  if (newPassword.length > 5) {
    if (localStorage.getItem(newUsername)) {
      alert('Пользователь с таким именем уже существует.');
    } else {
      const newUser = {
        username: newUsername,
        password: newPassword
      };
      localStorage.setItem(newUsername, JSON.stringify(newUser));
      alert('Аккаунт создан успешно!');
      signupForm.style.display = "none"
      loginForm.style.display = "flex"
    }
  }
  else{
    document.querySelector('.eror_5').style.display = "block"
  }

});

let reg___btn = document.querySelector(".reg___btn")
let signupForm = document.querySelector("#signupForm")
let loginForm = document.querySelector("#loginForm")
let log___btn = document.querySelector(".log___btn")
reg___btn.addEventListener('click', () => {
  signupForm.style.display = "flex"
  loginForm.style.display = "none"
})
log___btn.addEventListener('click', () => {
  signupForm.style.display = "none"
  loginForm.style.display = "flex"
})
