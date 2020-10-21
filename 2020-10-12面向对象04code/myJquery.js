// let cssConfig = {}
class Jq {
    constructor(arg, root) {
        if (typeof root === "undefined") {
            this['prevObject'] = [document];
        } else {
            this['prevObject'] = root;
        }
        if (typeof arg === "string") {
            // 情况一
            // console.log(arg);
            let eles = document.querySelectorAll(arg);

            // this.eles = eles
            // this[0] = ele
            // this[0] = ele1
            // this[1] = ele2
            // for (let i = 0; i < eles.length; i++) {
            //     this[i] = eles[i];
            // }
            // this.length = eles.length;

            this.addEles(eles);
        } else if (typeof arg === "function") {
            // 情况二
            document.addEventListener("DOMContentLoaded", arg);
        } else {
            // 情况三
            if (typeof arg.length === "undefined") {
                this[0] = arg;
                this.length = 1;
            } else {
                this.addEles(arg);
            }
        }
    }
    addEles(eles) {
        for (let i = 0; i < eles.length; i++) {
            this[i] = eles[i];
        }
        this.length = eles.length;
    }
    click(fn) {
        // fn ---  ()=>{console.log("点击了！！");}
        // console.log(this);
        for (let i = 0; i < this.length; i++) {
            this[i].addEventListener("click", fn);
        }
        return this;
    }
    on(eventName, fn) {
        let eventArr = eventName.split(" ");
        for (let i = 0; i < this.length; i++) { //多个节点
            // 多个事件
            for (let j = 0; j < eventArr.length; j++) {
                this[i].addEventListener(eventArr[j], fn);
            }
        }
    }
    eq(index) {
        // return this;
        // 返还实例化对象；
        //    return this[index]
        return new Jq(this[index], this);
    }
    get(index) {
        return this[index];
    }
    end() {
        return this['prevObject'];
    }
    css(...args) {
        //不定参 
        // console.log(arguments) 
        // console.log(args);
        if (args.length === 1) {
            // 字符串  、 对象   情况一 情况三
            if (typeof args[0] === "string") {
                // 字符串  获取样式
                // console.log(args[0]);
                return this.getStyle(this[0], args[0]);
            } else {
                // 对象  设置多个样式
                for (let i = 0; i < this.length; i++) {
                    for (let j in args[0]) {
                        this.setStyle(this[i], j, args[0][j]);
                        // console.log(this[i]);
                    }
                }
            }
        } else {
            // 2个参数；情况二   设置样式
            for (let i = 0; i < this.length; i++) { //循环元素；
                this.setStyle(this[i], args[0], args[1]);
            }
        }
    }
    getStyle(ele, styleName) {
        return window.getComputedStyle(ele, null)[styleName];
        // return document.defaultView.getComputedStyle(ele,styleName)[styleName];
    }
    setStyle(ele, styleName, styleValue) {
        if (typeof styleValue === "number" && !(styleName in $.cssNumber)) {
            styleValue = styleValue + "px";
        }

        ele.style[styleName] = styleValue;
    }

    animate(...args) {

        // 注：仅实现了(selector).animate({styles},speed,easing,callback)中的(selector).animate({styles}）
        // 没有实现变长变短的动画效果，且仅实现了写死的返还width。
        // 作业暗号：充


        for (let i = 0; i < this.length; i++) {
            for (let j in args[0]) {
                let tmp = parseInt(args[0][j]);
                let value = this[0].offsetWidth

                if (value > tmp) {
                    for (; value <= tmp + 1; value++) {
                        this.setStyle(this[i], j, value);
                    }
                } else {
                    for (; value > tmp + 1; value--) {
                        this.setStyle(this[i], j, value);
                    }
                }
            }
        }





    }

}




function $(arg) {
    // return {
    //     click(){
    //         console.log(123);
    //     }
    // }
    return new Jq(arg);

}

// axios();  axios.get(); axios.post();

$.cssNumber = {
    animationIterationCount: true,
    columnCount: true,
    fillOpacity: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    gridArea: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true,
    zoom: true
}

// cssHooks