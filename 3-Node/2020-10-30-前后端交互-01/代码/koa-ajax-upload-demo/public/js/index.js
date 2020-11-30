let btnElement = document.querySelector('.btn');
let fileElement = document.querySelector('#file');
let contentList = document.querySelector('.content-list');
let taskPanel = document.querySelector('.task_panel');
let taskBody = document.querySelector('.task_body');
let btn2 = document.querySelector('.btn2');
let xhr = new XMLHttpRequest();
let contentTatolList = document.querySelector('.content-tatol-list');



btnElement.onclick = function () {
    fileElement.click();
}

fileElement.onchange = function () {
    // 通过ajax来上传
    xhr.open('post', '/upload', true);

    let li = document.createElement('li');
    let span = document.createElement('span');
    let taskProgressStatusdiv = document.createElement('div');
    taskProgressStatusdiv.classList.add('task-progress-status');
    let progressDiv = document.createElement('div');
    progressDiv.classList.add('progress');
    progressDiv.style.width = '0%';
    li.appendChild(span);
    li.appendChild(taskProgressStatusdiv);
    li.appendChild(progressDiv);

    taskBody.appendChild(li);

    xhr.onload = function () {
        console.log(xhr.responseText);
        let data = JSON.parse(xhr.responseText);
        let img = new Image();
        img.src = '/static/upload/' + data.filename;
        contentList.appendChild(img);
    }

    // 我们还可以通过ajax这个对象来监控上传的数据进度
    xhr.upload.onload = function () {
        taskPanel.style.display = 'none';
    }

    xhr.upload.onloadstart = function () {
        taskPanel.style.display = 'block';
    }

    xhr.upload.onprogress = function (e) {
        // 上传过程中不断触发
        // console.log(e);
        taskProgressStatusdiv.innerHTML = (e.loaded / e.total).toFixed(2) + '%';
        progressDiv.style.width = (e.loaded / e.total) + '%';
    }

    // 请求的正文数据，需要通过send方法的参数传入
    // xhr.send('a=1&b=2');

    // formData: 可以通过js内置的formData对象来构建formData格式的数据
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FormData
    let fd = new FormData();
    // fd.append('a', 1);
    // fd.append('b', 2);
    fd.append('attachment', fileElement.files[0]);
    console.log(fileElement.files[0]);
    xhr.send(fd);

}

// 作业暗号：ajax
xhr.open('get', "/getPhotos", true);

xhr.responseType = 'json';

xhr.onload = function () {
    let data = xhr.response;
    for (let i in data) {
        // let imgs = data[i].filename;
        let img = new Image();
        img.src = '/static/upload/' + data[i].filename;
        contentTatolList.appendChild(img);
    }
}

xhr.send();

// done：后端查询到数据库中所有数据，并传给前端。前端通过/getPhotos接口查询到所有图片
// todo：页面每次重新载入或者刷新的时候，获取所有已经上传的图片，并显示在页面

