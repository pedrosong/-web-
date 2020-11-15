class Vue extends EventTarget{
    constructor(opts){
        super();
        this.opts = opts;
        this._data = opts.data;
        this.observe(this._data);
        this.compile(opts.el);
    }
    observe(data){
        let keys = Object.keys(data);
        keys.forEach(key=>{
            let value = data[key];
            let dep = new Dep();
            Object.defineProperty(data,key,{
                configurable:true,
                enumerable:true,
                get(){
                    // 收集订阅者；
                    if(Dep.target){
                        // Dep.traget --->this -->wathcher
                        dep.addSub(Dep.target);
                    }
                    
                    // dep.addSub();
                    return value;
                },
                set:newValue=>{
                    // console.log("set");
                    // //触发自定义事件编译视图；
                    // this.dispatchEvent(new CustomEvent(key,{
                    //     detail:newValue
                    // }))
                    // 发布--》触发update
                    dep.notify(newValue);
                    value = newValue;
                }
            })
        })
    }
    compile(el){
        let ele = document.querySelector(el);
        this.compileNodes(ele);
        console.log(ele);
    }
    compileNodes(el,ele){
        let childNodes = ele.childNodes;
        childNodes.forEach(node=>{
            if(node.nodeType===1){
                let attrs = node.attributes;
                console.log(attrs);
                [...attrs].forEach(attr=>{
                    let attrName = attr.name;
                    let attrValue = attr.value;
                    if(attrName==="v-html"){
                        console.log("执行了");
                        node.value = this._data[attrValue];
                        console.log(node.value);
                        node.addEventListener("click",e=>{
                            this._data[attrValue] = e.target.value;
                            // let res = document.createTextNode(this._data[attrValue]);
                            // let foo = document.getElementsByTagName(div);
                            // foo.appendChild(res);
                            console.log("添加了事件监听");
                            console.log(this._data[attrValue]);
                        })
                    }
                    if(attrName==="v-model"){
                        node.value = this._data[attrValue];
                        node.addEventListener("input",e=>{
                            // 触发set
                            this._data[attrValue] = e.target.value;
                        })
                    }
                })

                if(node.childNodes.length>0){
                    this.compileNodes(node);
                }
            }else if(node.nodeType===3){
                let textContent = node.textContent;
                // 查找特殊大胡子语法；
                let reg =  /\{\{\s*([^\{\}]+)\s*\}\}/g;
                // new RegExp();
                // Promise.resolve()
                if(reg.test(textContent)){
                    let $1 = RegExp.$1;
                    node.textContent = node.textContent.replace(reg,this._data[$1]);

                    // 绑定事件
                    // this.addEventListener($1,e=>{
                    //     // console.log("旧值:",this._data[$1]);
                    //     // console.log( "新值:",e.detail);
                    //     let newValue = e.detail;
                    //     let oldValue = this._data[$1];
                    //     // 旧值替换成新值；
                    //     let reg = new RegExp(oldValue,"g");
                    //     node.textContent  = node.textContent.replace(reg,newValue);
                    // })

                    // 人为触发get 来收集 watcher
                    new Watcher(this._data,$1,(newValue)=>{
                        console.log("更新了。。。",newValue);
                        let oldValue = this._data[$1];
                        let reg = new RegExp(oldValue,"g");
                        node.textContent  = node.textContent.replace(reg,newValue);
                    });


                }
            }
        })

    }
}

// 管理器
class Dep{
    constructor(){
        this.subs = [];
    }
    // 收集订阅者
    addSub(sub){
        this.subs.push(sub);
    }
    // 发布
    notify(newValue){
        this.subs.forEach(sub=>{
            sub.update(newValue);
        })
    }
}

// 订阅者；
class Watcher{
    constructor(data,key,cb){
        this.cb = cb;
        // 先定义 watcher实例this  然后在收集watcher
        Dep.target = this;
        data[key]; //触发get 收集watcher；
        Dep.target = null;
    }
    update(newValue){
        this.cb(newValue);
    }
}

// 作业实现 v-html方法；

