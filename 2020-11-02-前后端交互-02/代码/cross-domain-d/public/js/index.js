let btns = document.querySelectorAll('button');

/**
 * 后端代理
 *  跨域
 *      同源策略 - 依赖于浏览器，通过脚本(js：XMLHttpRequest、fetch)的形式发送的请求
 * 
 * 后端是能够做网络编程，提供了网络编程方法
 *  node不仅仅只能做响应的服务器，还能做发请求的客户端，同时又没有通源策略的限制问题
 */

btns[0].onclick = function() {
    let xhr = new XMLHttpRequest();

    // xhr.open('get', '/tencent', true);

    xhr.open('get', '/api/pony', true);

    xhr.onload = function() {
        console.log(this.responseText);
    }

    xhr.send();
}


btns[1].onclick = function() {
    let xhr = new XMLHttpRequest();

    xhr.open('post', 'http://localhost:8881/money', true);

    xhr.onload = function() {
        console.log(this.responseText);
    }

    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(`{"rmb": 200000000}`);
}