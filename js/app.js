let showOrHide = (attr, status) => document.querySelector(attr).style.display = status;

let borderColor = (id, color) => document.querySelector('#' + id).style.border = "1px solid " + color;

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

        if (userObject.username === user.value && userObject.password === pass.value) {
            isMatch = true;
            sessionStorage.setItem(userObject.username, userObject.password);
        }
    }

    if (isMatch) {
        showOrHide('#menu', 'block');
        showOrHide('.container-app', 'block');
        showOrHide(".register-container", "none");
        showOrHide(".login-container", "none");
        menu.style.display = "flex";
    } else {
        // window.confirm('Username and password not correct!');
        borderColor('userId', 'red');
        borderColor('passId', 'red');
    }

    // cannot empty
    let userMessage = document.querySelector('#userMessage');
    if (user.value == "") {
        userMessage.style.display = "block";
        userMessage.textContent = "Username cannot empty";
        userMessage.style.color = 'red';
    } else {
        userMessage.style.display = "block";
        userMessage.textContent = "Invalid username";
        userMessage.style.color = 'orange';
    }

    let passMessage = document.querySelector('#passMessage');
    if (pass.value == "") {
        passMessage.style.display = "block";
        passMessage.textContent = "Password cannot empty";
        passMessage.style.color = 'red';
    } else {
        passMessage.style.display = "block";
        passMessage.textContent = "Invalid password";
        passMessage.style.color = 'orange';
    }

    // clear
    user.value = "";
    pass.value = "";

}


let isLogin = () => {
    let displayName = document.querySelector('#displayName');
    let welcome = document.querySelector('h1');
    let output = "";
    if (sessionStorage.length > 0) {
        showOrHide('#menu', 'block');
        showOrHide('.container-app', 'block');
        showOrHide(".register-container", "none");
        showOrHide(".login-container", "none");
        menu.style.display = "flex";
        for (let i = 0; i < sessionStorage.length; i++) {
           if (sessionStorage.key(i).length < 25) {
               output = sessionStorage.key(i);
           }else {
               output = "Default User";
           }
        }
    }
    
    displayName.textContent = output;
    welcome.textContent = "Welcome ! " + output;
}
let isLogout = () => {
    if (sessionStorage.length > 0) {
        sessionStorage.clear();
        showOrHide(".register-container", "none");
        showOrHide(".login-container", "block");

        menu.style.display = "flex";
    }
    userMessage.style.display = "none";
    passMessage.style.display = "none";
    borderColor('userId', 'grey');
    borderColor('passId', 'grey');
    showOrHide('#menu', 'none');
}


let btnCreate = document.querySelector('#createId');
let btnRegister = document.querySelector('#registerId');
let btnLogin = document.querySelector('#loginId');
let logout = document.querySelector('#logout');
let btnClearUser = document.querySelector('#clearUser');



// add event
btnCreate.addEventListener('click', registerForm);
btnRegister.addEventListener('click', addUser);
btnLogin.addEventListener('click', (e) => {
    login();
    // location.reload();
    e.preventDefault();
});

logout.addEventListener('click', isLogout);


isLogin();