console.log('node web');

let loginPanelElement = document.querySelector('#loginPanel');
let contentPanelElement = document.querySelector('#contentPanel');
let usernameElement = document.querySelector('#username');
let passwordElement = document.querySelector('#password');
let loginBtnElement = document.querySelector('#loginBtn');

getContents();

loginBtnElement.onclick = function() {
    login();
}

// 获取数据
function getContents() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', '/contents', true);
    xhr.onload = function() {
        // console.log(xhr.status);
        if (xhr.status !== 200) {
            loginPanelElement.style.display = 'block';
            contentPanelElement.style.display = 'none';
        } else {
            contentPanelElement.style.display = 'block';
            loginPanelElement.style.display = 'none';
            let contents = JSON.parse(xhr.responseText);
            contents.forEach( content => {
                let li = document.createElement('li');
                li.innerHTML = content;
                contentPanelElement.appendChild(li);
            } );
        }
        
    }
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xhr.send();
}

function login() {
    let xhr = new XMLHttpRequest();
    xhr.open('post', '/login', true);
    xhr.onload = function() {
        console.log(xhr.responseText);
        let token = xhr.getResponseHeader('Authorization');
        // console.log('token', token);
        localStorage.setItem('token', token);

        getContents();
    }
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify({
        username: usernameElement.value,
        password: passwordElement.value
    }));
}