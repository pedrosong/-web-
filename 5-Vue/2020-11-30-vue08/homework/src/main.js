import {
    createRenderer
} from 'vue'
import {
    Container,
    Graphics

} from "pixi.js";
import App from './App.vue'
import {
    game
} from './init/index';

const renderer = new createRenderer({
    createElement(type) {
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

        return element
    },

    insert(el, parent) {
        parent.addChild(el)
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

//  const game = new Application({
//     width: 500,
//     height: 500
// });

document.body.append(game.view);

renderer.createApp(App).mount(game.stage);



// createApp(App).mount('#app')
