function define(factory) {
    factory(require); 
}

function require(url) {
    // 通过js的script对象动态加载外部脚本，默认是 异步的
    let script = document.createElement('script');
    script.src = url;
    // ……
    console.log('as');
}