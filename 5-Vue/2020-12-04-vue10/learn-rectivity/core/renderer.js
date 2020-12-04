// 和我们在 custom renderer 里面实现的是不是一样？
function createElement(type) {
  return document.createElement(type);
}

// 专门处理 prop
function patchProp(el, key, prevValue, nextValue) {
  if (nextValue === null) {
    el.removeAttribute(key);
  } else {
    el.setAttribute(key, nextValue);
  }
}

// 把 vnode 转换成真实的 dom 节点
export function mountElement(vnode, container) {
  const { type, props, children } = vnode;

  const el = (vnode.el = createElement(type));

  // props
  // {}
  if (props) {
    for (const key in props) {
      const val = props[key];
      patchProp(el, key, null, val);
    }
  }

  // 处理 children
  if (typeof children === "string") {
    // 创建一个 text
    const text = document.createTextNode(children);
    el.append(text);
  } else if (Array.isArray(children)) {
    children.forEach((v) => {
      mountElement(v, el);
    });
  }

  // insert
  container.append(el);
}

export function diff(v1, v2) {
  // v1 -> old vnode
  // v2 -> new vnode
  console.log("v1", v1);
  console.log("v2", v2);

  // type p -> type div
  // 直接替换节点即可
  if (v1.type !== v2.type) {
    v1.el.replaceWith(createElement(v2.type));
  } else {
    // props ???
    const el = (v2.el = v1.el);
    const newProps = v2.props;
    const oldProps = v1.props;

    // {id:1} -> {id:2}
    if (newProps) {
      Object.keys(newProps).forEach((key) => {
        if (newProps[key] !== oldProps[key]) {
          patchProp(el, key, oldProps[key], newProps[key]);
        }
      });
    }

    // 老的有，新的没有了
    // {id:1, class:2} -> {id:2}
    if (oldProps) {
      Object.keys(oldProps).forEach((key) => {
        if (!newProps[key]) {
          patchProp(el, key, oldProps[key], null);
        }
      });
    }

    // children
    // new children -> string | array
    // old children -> string | array
    // 4 种情况
    const newChildren = v2.children || [];
    const oldChildren = v1.children || [];

    if (typeof newChildren === "string") {
      if (typeof oldChildren === "string") {
        if (newChildren !== oldChildren) {
          el.textContent = newChildren;
        }
      } else if (Array.isArray(oldChildren)) {
        el.textContent = newChildren;
      }
    } else if (Array.isArray(newChildren)) {
      if (typeof oldChildren === "string") {
        el.innerHTML = ``;
        // 创建新的dom element
        // mountElement
        newChildren.forEach((vnode) => {
          mountElement(vnode, el);
        });
      } else if (Array.isArray(oldChildren)) {
        // array -> array
        //
        const length = Math.min(oldChildren.length, newChildren.length);

        for (let index = 0; index < length; index++) {
          const oldVnode = oldChildren[index];
          const newVnode = newChildren[index];
          diff(oldVnode, newVnode);
        }

        // 新的比老的长的话
        // 应该创建
        if (newChildren.length > length) {
          for (let index = length; index < newChildren.length; index++) {
            const vnode = newChildren[index];
            mountElement(vnode, el);
          }
        }

        // 老的比新的长的话
        // 应该删除
        if (oldChildren.length > length) {
          for (let index = length; index < oldChildren.length; index++) {
            const vnode = oldChildren[index];
            el.removeChild(vnode.el);
          }
        }
      }
    }
  }
}
