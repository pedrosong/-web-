// function toUpperCase(str) {
//     return str.toUpperCase();
// }

// module.exports.toUpperCase = toUpperCase;

// define(function() {
// function toUpperCase(str) {
//     return str.toUpperCase();
// } 

//     return {
//         toUpperCase
//     }
// });



(function (root, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        // Node, CommonJS-like
        module.exports = factory();
    }
    else if (typeof define === "function" && define.amd) {
        // AMD 模块环境下
        define(factory);
    } else {
        // root.toUpperCase = factory().toUpperCase;
    }
}(this, function () { 

    function toUpperCase(str) {
        return str.toUpperCase();
    }

    // 模块导出数据
    return {
        toUpperCase
    }
}));