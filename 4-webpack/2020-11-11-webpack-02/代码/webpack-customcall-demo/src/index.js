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