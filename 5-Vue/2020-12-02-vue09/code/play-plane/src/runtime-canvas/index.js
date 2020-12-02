// 实现基于 canvas 自定义的渲染器
import { createRenderer } from "vue";
import { Container, Texture, Sprite, Text } from "pixi.js";

const renderer = createRenderer({
  createElement(type) {
    // 创建元素
    let element;
    switch (type) {
      case "container":
        element = new Container();
        break;
      case "sprite":
        // 图片
        element = new Sprite();
        break;
    }

    return element;
  },

  insert(el, parent) {
    if (el) {
      // 插入
      parent.addChild(el);
    }
  },
  parentNode(node) {
    // 返回 node （element） 父级对象
    return node.parent;
  },
  remove(el) {
    // 删除一个元素的时候 会进行调用
    if (el && el.parent) {
      el.parent.removeChild(el);
    }
  },
  patchProp(el, key, prevValue, nextValue) {
    // 处理属性时进行调用
    // console.log(key);
    switch (key) {
      case "texture":
        el.texture = Texture.from(nextValue);
        break;
      case "onClick":
        // @click -> onClick
        el.on("pointertap", nextValue);
        break;
      default:
        el[key] = nextValue;
        break;
    }
  },
  createText(text) {
    // 创建一个文本
    // 注释
    return new Text(text);
  },

  // 必须要写 -》 vue 报错
  nextSibling() {},
  createComment() {},
});

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent);
}
