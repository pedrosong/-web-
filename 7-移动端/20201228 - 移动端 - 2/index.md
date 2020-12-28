# 移动端事件-2
## 本节课目标
- 掌握 devicemotion 使用
- 掌握节流函数和防抖函数实现
- 掌握摇一摇功能实现

## 本节课知识点
- orientationchange 监听横竖屏切换
- window.orientation 检测手机横竖屏
- devicemotion 监听手机加速度发生变化
  - acceleration 手机加速度检测
  - accelerationIncludingGravity 手机重力加速度检测(加速度 + 重力-地心引力)
  - 案例: 方块移动
    - IOS 和 安卓的兼容处理
    `
      function getIos(){
          var u = window.navigator.userAgent;
          return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      }
    `
    - IOS 各个版本
      - 一般版本 https
      - 12.2 在 safari 设置
      - 13
        1)
        ```
          function permissionForShake() {
            // ios最新系统请求允许摇一摇 判断DeviceMotionEvent.requestPermission是否为函数
            if (typeof DeviceMotionEvent.requestPermission === 'function') {
                DeviceMotionEvent.requestPermission()
                    .then(permissionState => {
                        if (permissionState === 'granted') {
                            // 权限允许
                            window.addEventListener("devicemotion", () => {
                                alert(2);
                            },{once:true})
                        }
                    })
                    .catch();
            } else {
                // 非ios系统或安卓
                window.addEventListener("devicemotion", () => {
                    alert(3);
                },{once:true})
            }
        }
        ```
        2) IOS13.3 需要手动触发
- 扩展：函数防抖和函数节流
  - 函数防抖[debounce]
    - 希望函数只执行一次，哪怕我进行了多次调用
      ```
        function debounce(fn,delay=200,isStart = false){
            if(typeof fn !== "function"){
                return console.error("请传入一个函数");
            }
            let timer = 0;
            let isFirst = true; // 是不是第一次执行这个函数
            return function(...arg){
                let _this = this;
                if(isFirst&&isStart){ // 如果isStart 为 true 就在第一次执行时触发
                    fn.apply(_this,arg);
                }
                isFirst = false;
                clearTimeout(timer);
                timer = setTimeout(()=>{
                    if(!isStart){
                        fn.apply(_this,arg);
                    }
                    isFirst = true;
                },delay);
            }
        }
      ```
  - 函数节流[throttle]
    - 让函数保持在一个可接受的固定频率执行
      ```
        function throttle(fn,interval=200,start = true){
          if(typeof fn !== "function"){
              return console.error("请传入一个函数");
          }
          let timer = 0;
          return function(...arg){
              let _this = this;
              if(timer){
                  return ;
              }
              start&&fn.apply(_this,arg); 
              timer = setTimeout(() => {
                  (!start)&&fn.apply(_this,arg); 
                  timer = 0;
              }, interval);
          }
      }
      ``` 
- 案例：摇一摇功能实现

### 下节课内容 - 可视化及小程序
李伟，web前端专家讲师，7年工作经验，前京东高级前端工程师。
专注于前端图形动画，喜欢将程序和艺术相融合。
参与开发智能家居、地产、电商、物流等多个行业的可视化项目。
在设计方面擅长手绘、ps、ai、3dsmax、ae、edius、premiere；
在程序方面擅长canvas、svg、webgl、three.js、echarts、d3。
在二维图形方面，可以基于原生 canvas 架构图形渲染引擎，开发高度定制化的
图形项目；
在三维图形方面，熟悉GLSL着色语言、three.js架构原理和三维算法，开发过
三维家具模块化的开源项目。

### 本节课任务

任务1：参加直播课，学习时长需>=60%
任务2：
    - 完成 移动端 相关测试题
    - 本次测试题共计 5 道单项选择题
通过标准：
    正确3道及以上者方可通过




CNode 后端：
https://github.com/motao314/cnode-data-sql  记得 star 呀























