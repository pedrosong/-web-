// 响应式
// 去实现一下 reactive / ref / effect

// const a = ref(0);

// effect(() => {
//   // 收集依赖
// });

// // 触发依赖
// a.value = 20;

// 响应式的核心： 收集依赖  触发依赖
// 表示依赖
let currentEffect;
class Dep {
  constructor() {
    // ?? set
    // 集合  array
    // 保证依赖是不重复
    this.effects = new Set();
    // this._val = val;
  }

  //   get value() {
  //     dep.depend();
  //     return this._val;
  //   }
  //   set value(newVal) {
  //     this._val = newVal;
  //     // 必须是先修改完成，然后在 notice
  //     dep.notice();
  //   }

  depend() {
    // 收集依赖
    if (currentEffect) {
      this.effects.add(currentEffect);
      //   console.log(this.effects);
    }
  }

  notice() {
    this.effects.forEach((effect) => {
      effect();
    });
  }
}

export function watchEffect(effect) {
  currentEffect = effect;
  effect();
  currentEffect = null;
}

// 使用的方式
// 777777777777777777777777777777777777

// const dep = new Dep(10);
// // ref 有什么区别嘛？

// let b;
// watchEffect(() => {
//   // 收集依赖
//   b = dep.value + 10;
//   console.log("b", b);
// });

// // 触发依赖
// dep.value = 20;

// 再次稍微扩展一下
// 值类型 number
// 如果是一个对象的话呢？
// {name:"xiaohong",age:18}
// 有多个值类型
// 1个值类型已经搞定了，那这里其实就是多个值类型
// 1个值类型，对应一个  dep
// reactive
// proxy
// 我们要知道这个值是什么时候改变的
// .value -> get set
// 存储 dep 的问题
const targetsMap = new Map();

function getDep(target, key) {
  let depsMap = targetsMap.get(target);
  // 第一次的话，depsMap?
  if (!depsMap) {
    depsMap = new Map();
    targetsMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }

  return dep;
}

export function reactive(raw) {
  // vue2 -> defineProperty
  // es6+ -> proxy
  return new Proxy(raw, {
    get(target, key) {
      const dep = getDep(target, key);

      // 我们就可以保证 dep 是肯定有的
      dep.depend();

      //   return target[key];
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      // 还是需要找到 dep

      const dep = getDep(target, key);
      // 先复制，在通知
      const result = Reflect.set(target, key, value);
      dep.notice();
      return result;
    },
  });
}

// const state = reactive({
//   count: 1,
// });

// watchEffect(() => {
//   // 1
//   console.log(state.count);
// });

// state.count++;
