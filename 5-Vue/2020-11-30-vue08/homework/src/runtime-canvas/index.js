import {
    createRenderer
} from 'vue'
import {
    Container,
    Graphics
} from "pixi.js";

const renderer = new createRenderer({
    createElement(type) {
        console.log(type)
        let element;
        // 创建元素并绘制小球
        switch (type) {
            case "container":
                element = new Container();
                break;
                // 绘制出黄色小球
            case "circle":
                element = new Graphics();
                element.beginFill(0xffff00);
                element.drawCircle(0, 0, 50);
                element.endFill();
                break;
        }

        return element;
    },

    insert(el, parent) {
        if (el) {
            parent.addChild(el)
        }
    },

    parentNode(node) {
        return node.parent;
    },


    patchProp(el, key, prevValue, nextValue) {
        switch (key) {
            case "x":
                el.x = nextValue
                break;
            case "y":
                el.y = nextValue;
                break;
            default:
                break;
        }
    },

    nextSibling() {},
    createComment() {},
});

export function createApp(arg) {
    return renderer.createApp(arg);
}