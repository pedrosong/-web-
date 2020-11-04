/**
 * 这个js文件是浏览器请求以后返回浏览器，然后在浏览器端执行的代码
 */
let btn = document.querySelector('#btn');
let itemsList = document.querySelector('.items-list');

let btnIValue = 1;
btn.onclick = function() {
    console.log(btnIValue++);
}

// console.log('ajax');

// 通过js发送请求，请求数据

// XMLHttpRequest 对象
// https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest

// 创建XMLHttpRequest对象（类似一个浏览器，可以发送请求）
let xhr = new XMLHttpRequest();

// 初始化一个请求（这个时候只是对需要的请求进行了一些初始化配置，还没有发送请求）
xhr.open('get', '/', true);
// false: 同步阻塞，阻塞所有的任务，比如ui渲染，事件处理……，被阻塞了

// 1、返回的数据存储在 xhr.responseText
xhr.onload = function() {
    // console.log('text', xhr.responseText);
    // xhr.responseText  存储的是字符串 

    console.log('headers', xhr.getResponseHeader('content-type'));

    let data;

    if (xhr.getResponseHeader('content-type').includes('application/json')) {
        data = JSON.parse(xhr.responseText);
    } else {
        data = xhr.responseText;
    }

    // 数组的forEach方法
    data.data.forEach(d => {
        itemsList.innerHTML += `
            <li class="panel">
                <img src="/public/items/images/${d.cover}" alt="" class="cover">
                <div class="name">${d.name}</div>
                <div class="price">¥${(d.price/100).toFixed(2)}</div>
            </li>
        `;
    })

    console.log('data', data);
}

// 发送请求
xhr.send();

// ajax一般是异步的请求，当25行的代码执行的时候，实际连请求都还没正式开始发送
// console.log('text', xhr.responseText);