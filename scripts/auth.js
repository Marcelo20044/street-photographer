function getUsers() {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
}

function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}

function checkAuthStatus() {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const authButtons = document.getElementById("auth-buttons");

    if (isAuthenticated === "true") {
        authButtons.innerHTML = `
            <button class="auth-link logout" onclick="logoutUser()">Sign Out</button>
        `;
    } else {
        authButtons.innerHTML = `
            <button class="auth-link" onclick="loginUser()">Sign In</button>
            /
            <button class="auth-link" onclick="registerUser()">Sign Up</button>
        `;
    }
}

function registerUser() {
    // fire - функция sweatalert2 для открытия попапа
    // Параметры:
    // title - название попапа
    // html - внутренний html попапа(используется вместо text если оба указаны)
    // confirmButtonText - текст на кнопке подтверждения
    // showCancelButton - будет ли показываться кнопка закрытия попапа
    // cancelButtonText - текст кнопки закрытия
    // preConfirm - функция, которая будет вызываться перед подтверждением
    // icon - иконка фнутри попапа
    Swal.fire({
        title: "Регистрация",
        html:
            '<input id="swal-username" class="swal2-input" placeholder="Имя пользователя">' +
            '<input id="swal-password" type="password" class="swal2-input" placeholder="Пароль">',
        confirmButtonText: "Зарегистрироваться",
        showCancelButton: true,
        cancelButtonText: "Отмена",
        preConfirm: () => {
            const username = document.getElementById("swal-username").value;
            const password = document.getElementById("swal-password").value;
            if (!username || !password) {
                // showValidationMessage показывает строку с описанием ошибки валидации
                Swal.showValidationMessage("Пожалуйста, введите имя пользователя и пароль");
            } else {
                const users = getUsers();
                if (users.find(user => user.username === username)) {
                    Swal.showValidationMessage("Пользователь с таким именем уже существует");
                } else {
                    return { username, password };
                }
            }
        },
    }).then(result => {
        if (result.isConfirmed && result.value) {
            saveUser(result.value);
            Swal.fire("Успех!", "Вы успешно зарегистрировались", "success");
        }
    });
}

function loginUser() {
    Swal.fire({
        title: "Вход",
        html:
            '<input id="swal-username" class="swal2-input" placeholder="Имя пользователя">' +
            '<input id="swal-password" type="password" class="swal2-input" placeholder="Пароль">',
        confirmButtonText: "Войти",
        showCancelButton: true,
        cancelButtonText: "Отмена",
        preConfirm: () => {
            const username = document.getElementById("swal-username").value;
            const password = document.getElementById("swal-password").value;
            const users = getUsers();
            const user = users.find(
                user => user.username === username && user.password === password
            );
            if (!user) {
                Swal.showValidationMessage("Неверное имя пользователя или пароль");
            } else {
                return user;
            }
        },
    }).then(result => {
        if (result.isConfirmed) {
            localStorage.setItem("isAuthenticated", "true");
            checkAuthStatus();
            Swal.fire("Успех!", "Вы успешно вошли в систему", "success");
        }
    });
}

function logoutUser() {
    Swal.fire({
        title: "Вы уверены, что хотите выйти?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Выйти",
        cancelButtonText: "Отмена"
    }).then(result => {
        if (result.isConfirmed) {
            localStorage.removeItem("isAuthenticated");
            checkAuthStatus();
            Swal.fire("Выход", "Вы успешно вышли из системы", "success");
        }
    });
}

document.addEventListener("DOMContentLoaded", checkAuthStatus);
