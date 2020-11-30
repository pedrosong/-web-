let btns = document.querySelectorAll('button');

/**
 * 同源策略 : 
 *  https://baike.baidu.com/item/%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5/3927875?fr=aladdin
 * CORS : 
 *  https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS
 * 
 * 
 * 跨源资源共享 (CORS) （或通俗地译为跨域资源共享）是一种机制，该机制使用附加的 HTTP 头来告诉浏览器，准许运行在一个源上的Web应用访问位于另一不同源选定的资源。 当一个Web应用发起一个与自身所在源（域，协议和端口）不同的HTTP请求时，它发起的即跨源HTTP请求。
 * 
 * 
 * 
 * https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods
 */
btns[0].onclick = function() {
    let xhr = new XMLHttpRequest();

    xhr.open('get', 'http://localhost:8881/pony', true);

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

    // xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('content-type', 'application/json');
    // xhr.send('rmb=200000000');
    xhr.send(`{"rmb": 200000000}`);
}