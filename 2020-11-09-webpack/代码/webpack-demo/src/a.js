import {bf1, bf2} from './b.js';
import {cf1} from './c.js';
import kkb from './data/kkb.txt';
import img from './images/logo.png';
import cssText from './css/css.css';

bf1();
bf2();
cf1();

console.log('kkb', kkb);

console.log('img', img);

let images = new Image();
images.src = img;
document.body.appendChild(images);


// console.log('css', cssText.toString());
// let style = document.createElement('style');
// style.innerHTML = cssText.toString();
// document.head.appendChild(style);