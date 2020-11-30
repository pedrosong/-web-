import fn from './fn.js';
import logo from './images/logo.png';
import './css/css.css';
import fn2 from './fn2';

console.log('fn', fn);

let img = new Image();
img.src = logo;
document.body.appendChild(img);


document.onclick = function() {
    fn2();
}


if (module.hot) {//如果开启 HMR
    module.hot.accept('./fn.js', function() {
        // 更新逻辑
        console.log('fn', fn); 
    });
    module.hot.accept('./fn2.js', function() {
        // 更新逻辑
        document.onclick = fn2;
    }); 
}