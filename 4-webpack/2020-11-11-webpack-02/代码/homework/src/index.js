import fn from './fn.js';
import logo from './images/logo.png';
import './css/css.css';

console.log('fn', fn);

let img = new Image();
img.src = logo;
document.body.appendChild(img);