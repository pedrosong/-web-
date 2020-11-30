let btns = document.querySelectorAll('button');

/**
 * 当前发送请求的域：
 *  http://localhost:8881
 *      域：协议+主机（域名/ip）+端口
 * 
 * 如果发送请求所在的域与接收请求所在的域相同，那么就是同域请求，如果不同，则称为：跨域请求
 * 跨域：
 *  当请求与被请求的域不一样的时候，只要域中的协议或主机（域名/ip）或端口其中一个不一样，那么就跨域了
 * http://baidu.com:80/index.html => https://badiu.com:80/data
 */
btns[0].onclick = function() {
    let xhr = new XMLHttpRequest();

    xhr.open('get', '/pony', true);

    xhr.onload = function() {
        console.log(this.responseText);
    }

    xhr.send();
}