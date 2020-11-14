export default function() {
    console.log('开课吧!!!!');

    let xhr = new XMLHttpRequest();
    xhr.open('get', '/api/info', true);

    xhr.onload = function() {
        console.log('data', this.responseText);
    }
    xhr.send();
}