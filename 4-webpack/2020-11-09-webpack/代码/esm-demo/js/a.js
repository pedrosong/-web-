// 静态导入 - 无论该模块的代码是否会在运行期间被使用，该模块都会被导入
// import 语法是只能在非逻辑代码中导入中使用
import bf from './b.js';

bf();

b();
function b() {
    console.log('a 文件中的 b');
}

document.onclick = async function() {
    // 导入需要的模块（按需导入） - 动态导入
    // import d from './d.js';
    // 要使用 import 方法来进行动态导入
    // import('./d.js').then(d => {
    //     // d ： 返回的模块对象
    //     console.log('d', d);
    // });
    let d = await import('./d.js');
    console.log('d', d);
}