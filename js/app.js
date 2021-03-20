let showOrHide = (attr, status) => document.querySelector(attr).style.display = status;

let registerForm = () => {
    showOrHide(".register-container", "block");
    showOrHide(".login-container", "none");
}
let loginForm = () => {
    showOrHide(".register-container", "none");
    showOrHide(".login-container", "block");
}

let addUser = () => {
    let user = document.querySelector('#user');
    let pass = document.querySelector('#pass');
    let email = document.querySelector('#email');

    // add to localstorage
    let userId = localStorage.length;
    if (user.value !== "" && pass.value !== "" && email.value !== "") {
        let data = {
            username: user.value,
            password: pass.value,
            email: email.value
        }
        localStorage.setItem("id-" + userId, JSON.stringify(data));
        loginForm();
    }

    // clear 
    user.value = "";
    pass.value = "";
    email.value = "";

    // increment
    userId++;
}

let login = () => {
    let user = document.querySelector('#userId');
    let pass = document.querySelector('#passId');
    let menu = document.querySelector('#menu');

    // get user form local storage
    let isMatch = false;
    let size = localStorage.length;
    for (let i = 0; i < size; i++) {
        let data = localStorage.getItem('id-' + i);
        let userObject = JSON.parse(data);
        console.log(userObject.username);
        if (userObject.username === user.value && userObject.password === pass.value) {
            isMatch = true;
            sessionStorage.setItem(userObject.username, userObject.password);
        }
    }

    if (isMatch) {
        showOrHide('#menu', 'block');
        showOrHide(".register-container", "none");
        showOrHide(".login-container", "none");
        menu.style.display = "flex";
    }else {
        window.confirm('Username and password not correct!');
    }

}


let isLogin = () => {
    if (sessionStorage.length > 1) {
        showOrHide('#menu', 'block');
        showOrHide(".register-container", "none");
        showOrHide(".login-container", "none");
        menu.style.display = "flex";
    }
}

let isLogout = () => {
    if (sessionStorage.length > 1) {
        sessionStorage.clear();
        showOrHide(".register-container", "none");
        showOrHide(".login-container", "block");
        
        menu.style.display = "flex";
    }
    showOrHide('#menu', 'none');
}

let btnCreate = document.querySelector('#createId');
let btnRegister = document.querySelector('#registerId');
let btnLogin = document.querySelector('#loginId');
let logout = document.querySelector('#logout');


// add event
btnCreate.addEventListener('click', registerForm);
btnRegister.addEventListener('click', addUser);
btnLogin.addEventListener('click', (e) => {
    login();
    e.preventDefault();
});

logout.addEventListener('click', isLogout);

isLogin();