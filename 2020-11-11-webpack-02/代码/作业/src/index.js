import logo from './images/logo.png';
import './css/css.css';
import fn2 from './fn2';
let buttonElement = document.querySelector("#btn1")

let img = new Image();
img.src = logo;
document.body.appendChild(img);
console.log("btn", buttonElement);

buttonElement.onclick = function () {
    fn2();
}


if (module.hot) { //如果开启 HMR
    module.hot.accept('./fn2.js', function () {
        // 更新逻辑
        buttonElement.onclick = fn2;
    });
}




