import { mountElement, diff } from "./renderer.js";
import { watchEffect } from "../core/reactivity/index.js";
export function createApp(rootComponent) {
  // app
  return {
    mount(rootContainer) {
      // 先调用 setup 拿到数据
      const setupResult = rootComponent.setup();
      let isMounted = false;
      let prevSubTree;

      // 还需要调用 render
      watchEffect(() => {
        if (!isMounted) {
          // 清除
          // rootContainer.innerHTML = ``;
          isMounted = true;
          const subTree = rootComponent.render(setupResult);
          mountElement(subTree, rootContainer);
          prevSubTree = subTree;
        } else {
          const subTree = rootComponent.render(setupResult);
          diff(prevSubTree, subTree);
          prevSubTree = subTree;
        }
      });
    },
  };
}
