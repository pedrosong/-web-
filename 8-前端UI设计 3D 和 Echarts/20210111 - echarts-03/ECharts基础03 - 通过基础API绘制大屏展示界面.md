ECharts基础03 - 通过基础API绘制大屏展示界面

> 写在前面：
>
> 1. 本文是单纯的个人学习总结和课堂笔记整理，大部分知识点来自“开课吧”线上直播课程，以及官方资料。
> 2. 由于目前仍处于前端学习、入门阶段，因此对于知识的掌握和理解难免会有偏差，因此该文章仅仅是个人记录，请查阅者不要以此作为资料依据。

大屏所要做的就是让**数据可视化**，数据可视化主要旨在借助于图形化手段，清晰有效地表达和传递信息。

说巧不巧，我现在就负责部门小组数据可视化的一项工作任务（我是发起人），正好可以借着这个学习的机会，回去拿公司的项目练练手。不过，因为公司的信息安全，下面的文章里用到的代码主要还是课程笔记。

# 分析页面结构

根据老师提供的示例（如下图），我们可以通过审查元素确定页面的DOM结构，页面主要分为两个大部分：

![示例页面](D:\MyDocument\104.coding\kaiKeBa_Code-Courseware\8-前端UI设计 3D 和 Echarts\20210111 - echarts-03\Snipaste_2021-01-13_14-59-00.png)

- header：内容很简单，就是一个大屏的标题
- cont：这部分就是整个数据可视化展示界面的容器，其中放置了2大模块，7个视图。
  - cont-edge模块：左侧三个视图和右侧三个视图的容器
    - chartL1、chartL2、chartL3 依次是左侧三个视图的容器
    - chartR1、chartR2、chartR3依次是右侧三个视图的容器
  - cont-center模块，中间一个视图的容器
    - centerImg 模块：背景图以及特效的容器
    - chartC模块：中间地图视图的容器

```html
<div id="header">西虹市经济情况可视化</div>
<div id="cont">
    <div class="cont-edge">
        <div id="chartL1" class="box"></div>
        <div id="chartL2" class="box"></div>
        <div id="chartL3" class="box"></div>
    </div>
    <div class="cont-center">
        <div class="center-tit">
            <div class="center-row">
                <div class="center-num">12345678</div>
                <div class="center-num">67890542</div>
            </div>
            <div class="center-row">
                <div class="center-text">2019年收入情况</div>
                <div class="center-text">2019年总支出情况</div>
            </div>
        </div>
        <div class="center-cont">
            <!--背景图-->
            <div class="centerImg">
                <!--网格点-->
                <img class="img1" src="./images/lbx.png" alt="">
            </div>
            <div class="centerImg">
                <!--流光-->
                <img class="img2" src="./images/jt.png" alt="">
            </div>
            <!--地图容器-->
            <div id="chartC"></div>
        </div>
    </div>
    <div class="cont-edge">
        <div id="chartR1" class="box"></div>
        <div id="chartR2" class="box"></div>
        <div class="box">
            <div id="chartR3"></div>
        </div>
    </div>
</div>
```

# 绘制大屏展示界面

## 配置主题颜色

ECharts有三款默认主题`light` 、`dark` 、`default`，在初始化`echarts`实例的时候声明在第二个参数。

```javascript
const myChart = echarts.init(document.getElementById('chartL1'),'light')
// 如果什么不写，就是默认default
```

默认自带的这三种主题显然并不能满足我们的需求，我们可以根据实际需要，下载官网上提供的主题或者自定义编写主题样式和配色。

主题下载地址如下：https://echarts.apache.org/zh/download-theme.html

下载主题有两种方式：① 下载`js`文件 ② 下载`json`文件。二者的区别比较简单，`js`文件已经帮我们注册了主题，可以直接饮用。但是`json`文件就需要我们自己手动注册主题了。因此最好就直接用`js`文件。

```javascript
echarts.registerTheme('chalk', {
    // 样式相关配置
})

// 注册之后，我们可以在init里面直接使用这个注册名来使用对应主题
```

## 绘制图表

准备工作：引入所有需要用到组件和数据。

```html
<!--引入echarts,需要注意ECharts版本-->
<script src="https://cdn.jsdelivr.net/npm/echarts@5.0.0/dist/echarts.min.js"></script>
<!--引入主题样式-->
<script src="./js/chalk.js"></script>
<!--引入百度地图api，我们后面有一个视图需要调用百度API-->
<script src="https://api.map.baidu.com/api?v=3.0&ak=EcMeTlWuNyyqL4GwZT5Nmlj9mtpvhE9Y"></script>
<!--引入bmap组件，类似geo，我们需要基于bmap绘制其他图形-->
<script src="https://cdn.jsdelivr.net/npm/echarts/dist/extension/bmap.min.js"></script>
<!--引入中国地图-->
<script src='./js/China.js'></script>
```



### 折线图

折线图这里没有太多弯弯绕绕，基本API和配置，唯一需要注意的一个坑：chalk主题和较老版本的echarts不兼容，因此如果出现折线无法正常显示的情况，需要检查一下引用的ECharts版本是不是最新的。

```javascript
const source = [
    ['年', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
    ['收入', 820, 932, 901, 934, 1290, 1330, 1520],
    ['支出', 200, 632, 601, 634, 850, 1000, 1100]
];


const chart = echarts.init(document.getElementById('chartL1'), 'chalk');

const option = {
    title: {
        text: '西虹市人民收入增长情况',
        left: 'center'
    },
    legend: {
        left: 'right'
    },
    dataset: {
        source
    },
    xAxis: {
        type: 'category',
    },
    yAxis: {
        type: 'value'
    },
    series: [{
            type: 'line',
            seriesLayoutBy: 'row'
        },
        {
            type: 'line',
            seriesLayoutBy: 'row'
        },
    ]

};

chart.setOption(option);
```

### 饼图

整体来说，饼图并没有什么难点。唯一的一个亮点是在`tooltip`中使用模板语法创建了提示栏的显示模板。

- `formatter`：可以接受一个回调函数，最终显示该函数的返回值。该回调函数接收的是数据的详细信息，可以通过`console.log`看到都有哪些项，这里不做赘述。

```javascript
const source=[
    {value:5000,name:'旅游'},
    {value:4500,name:'饮食'},
    {value:6500,name:'服装'},
    {value:3500,name:'电影'},
    {value:2500,name:'其它'}
];

const chart = echarts.init(document.getElementById('chartL2'), 'chalk');

const option = {
    title: {
        text: '西虹市人民衣食住行支出比',
        left: 'center'
    },
    tooltip: {
        formatter: function ({percent}) {
            return Math.round(percent) + '%'
        },
    },
    dataset: {
        source
    },
    series: {
        type: 'pie',
        center: ['50%', '57%'],
        roseType: 'radius',
        radius: ['35%', '70%']
    }
};

/*显示图表*/
chart.setOption(option);
```

### 散点图

散点图主要用来展示大量数据之间的相对关系，在下面的这个示例里面，主要有两个注意点分别是对于数据的处理小细节和配置散点图样式：

- 数据我们在实际项目上一般是后端给的数据，有时候可能并不会给我们完整的键值对，也许只有 `value`，这样的话我们就需要提前声明好每组数据中，每个 `value` 代表的是什么信息。这也就是维度映射里面 `dimensions` 的用处。
- 散点图当数据量很大之后，图表会看起来上面布满了点，给人一种很脏的视觉体验，因此可以通过修改颗粒度和透明度来改善：`symbolSize`和`itemStyle`

```javascript
const chart = echarts.init(document.getElementById('chartL3'), 'chalk');
/*维度*/
const dimensions = ['收入', '年龄', '人口', '住址', '时间'];

const option = {
    title: {
        text: '西虹市人民收入和年龄关系',
        left: 'center'
    },
    
    xAxis: {
        name: '年龄',
        type: 'value'
    },
    yAxis: {
        name: '收入',
        type: 'value'
    },

    dataset: {
        dimensions
    },

    series: {
        type: 'scatter',
        encode: {
            x: 1,
            y: 0,
            tooltip: [0, 1]
        },
        symbolSize: 3,
        itemStyle: {
            opacity: 0.4
        }
    }

};

/*异步请求数据*/
fetch('./lib/table.json')
    .then((res) => res.json())
    .then(data => {
        option.dataset.source = data;
        chart.setOption(option) // 所有数据请求结束之后启用配置
    });
```

### 雷达图

雷达图对于jo厨来说十分常见，雷达图需要根据数据的维度来声明坐标轴数量，坐标轴生面在 `indicator` 属性里面设置对应数量的坐标轴，其中

- `name` 该坐标中的名称
- `min、max` 数据区间，实际数据会在此区间内计算比值
- `color` 标签颜色

```javascript
const data = [{
        name: '预算分配',
        value: [43000, 45000, 42000, 45000, 40000, 49000],
    },
    {
        name: '实际开销',
        value: [30000, 34000, 55000, 35000, 32000, 31000],
    }
];

const indicator=[
            { name: '销售',min:0,max:60000},
            { name: '管理',min:0,max:60000},
            { name: '信息技术',min:0,max:60000},
            { name: '客服',min:0,max:60000},
            { name: '研发',min:0,max:60000},
            { name: '市场',min:0,max:60000}
        ];

/*实例化echarts*/
const chart = echarts.init(document.getElementById('chartR1'), 'chalk');

/*配置项*/
const option = {
    title: {
        text: '西虹市财务开销',
    },
    tooltip: {},
    legend: {
        left: 'left',
        top: 30,
        orient: 'vertical'
    },
    radar: {
        indicator 
        // 这里声明了坐标轴
        // 此外可以通过shape属性声明雷达图的形状
        //    polygon 多边形，默认
        //    circle  圆形  
    },
    series: {
        type: 'radar',
        data
    }
};
// 使用刚指定的配置项和数据显示图表。
chart.setOption(option);
```

### 柱状图

本身绘制柱状图并没有难度，但是这里需要给每个柱状体增加一张图片样式作为遮罩，所以需要等待这个图片加载完成之后才渲染对应柱状体，因此就需要用到异步处理这里的一个细节是：异步请求所有图片数据，当图片加载完成之后再进行绘图。

- 封装了一个 `imgPro()` 方法：
  - 初始化一个 `promise` 对象，并把图片作为参数传入
  - 当图片加载完成之后，执行 `resolve`
- Promise.all可以将多个Promise实例包装成一个新的Promise实例 
  - 当所有imgPro(img)实例成功运行并返回之后，也就意味着所有图片都加载成功之后，开始进行绘图


```javascript
const source = [
    ['时间', '小麦', '玉米', '高粱'],
    [2017, 1000, 800, 900],
    [2018, 500, 650, 800],
    [2019, 800, 900, 1200],
];

const chart = echarts.init(document.getElementById('chartR2'), 'chalk');

const option = {
    title: {
        text: '西虹市农作物收成',
        left: 'center'
    },
    tooltip: {},
    legend: {
        top: 30
    },
    grid: {
        top: 72,
        bottom: 28
    },
    dataset: {source},
    xAxis: {
        type: 'category'
    },
    yAxis: {
        type: 'value'
    },
    series: [{
            id: 'xm',
            type: 'bar',
        },
        {
            id: 'ym',
            type: 'bar',
        },
        {
            id: 'gl',
            type: 'bar',
        },
    ]

};
chart.setOption(option);

/*图像源*/
//小麦
const imgXm = new Image();
imgXm.src = './images/xm.jpg';
//玉米
const imgYm = new Image();
imgYm.src = './images/ym.jpg';
//高粱
const imgGl = new Image();
imgGl.src = './images/gl.jpg';

// Promise.all可以将多个Promise实例包装成一个新的Promise实例
// 当所有imgPro(img)实例成功运行并返回之后，也就意味着所有图片都加载成功之后，开始进行绘图
Promise.all([imgPro(imgXm), imgPro(imgYm), imgPro(imgGl), ]).then(() => {
    chart.setOption({
        series: [{
                id: 'xm',
                color: {
                    image: imgXm
                }
            },{
                id: 'ym',
                color: {
                    image: imgYm
                }
            },{
                id: 'gl',
                color: {
                    image: imgGl
                }
            },
        ]
    })
});

// 建立Promise对象，并传入img对象
// 当该 img 加载成功后，执行resolve
function imgPro(img) {
    return new Promise((resolve) => {
        img.onload = function () {
            resolve(img);
        }
    });
}
```

### 利用百度地图API绘制地图和散点图

首先，我们为什么要用百度地图API而不是啥高德、Google呢，那是因为ECharts就是百度出品的，因此官方文档里面介绍对接百度地图API的比较详细，因此就使用了百度地图API来开发和演示。

首先需要登录百度地图API官网，注册access key，后续在配置bmap时需要用到，这里不再展开，百度地图开发文档写的很详细。

上面我们在准备工作中已经引入了百度地图API和bmap。

```html
<script src="https://api.map.baidu.com/api?v=3.0&ak=EcMeTlWuNyyqL4GwZT5Nmlj9mtpvhE9Y"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts/dist/extension/bmap.min.js"></script>
```

`bmap` 组件配置项如下：

- `center[经度,纬度]` 地图中心点位，如[121.48, 31.22]
- `zoom` 缩放级别，如6
- `roam` 是否可以拖拽缩放
- `mapStyleV2` 地图样式
  - `styleId` 样式id

下面是代码实例，最后有一部分关于百度地图API的操作，比如设置缩放方式、设置标记等，这里不再展开，后面有精力的话会单独开一篇文章整理常用API。

```javascript
const chart = echarts.init(document.getElementById('chartR3'), 'chalk');

const center = [121.48, 31.22]
const option = {
    title: {
        text: '西虹市的空气质量',
        left: 'center',
        top: 12,
    },
    bmap: {
        center,
        zoom: 6,
        roam: true,
        mapStyleV2: {
            styleId: '5453dc64d711215271444d4abeaf6b44'
        }
    },
    // 系列列表
    // coordinateSystem => 设置坐标类型，这里需要以bmap坐标系绘制散点图
    // symbolSize 散点尺寸，同样，可以接收回调函数
    series: [{
            id: 's1',
            type: 'scatter',
            coordinateSystem: 'bmap',
            symbolSize: (param) => {
                return param[2] / 15
            }
        },
        {
            id: 's2',
            type: 'effectScatter', // 特效散点图
            coordinateSystem: 'bmap',
            symbolSize: (param) => {
                return param[2] / 15
            }
        }
    ]
};
chart.setOption(option);

// 获取数据并传入到option.series
fetch('./lib/pm.json')
    .then((res) => res.json())
    .then(data => {
        const len = data.length;
        const data2 = data.splice(len - 5, len)
        //绘图
        chart.setOption({
            series: [{
                    id: 's1',
                    data
                }, {
                    id: 's2',
                    data: data2
                }]
        })
    });

// 以下均为百度地图API，这里不做赘述，后面有精力的话会单独开一篇文章写
// 获取百度地图实例map
const map = chart.getModel().getComponent('bmap').getBMap();
// 初始化坐标点实例，并传入坐标
var point = new BMap.Point(...center);
// 创建标注
var marker = new BMap.Marker(point); 
map.addOverlay(marker);
// 添加地图的控制方式
map.addControl(new BMap.NavigationControl());
```

### geo地图

这里面涉及到的左右知识点在之前文章（dispatch和geo）都已经整理过了，这里不多赘述，整体思路如下：

- 引入中国地图
- 配置 `geo` 参数
- 配置 `series` 参数，并将坐标系设置为 `geo`
- 封装一个利用 `dispatchAction` 触发高亮的方法

```javascript
const chart = echarts.init(document.getElementById('chartC'), 'chalk');

const option = {
    title: {
        text: '西虹市不同地区的平均收入',
        textStyle: {
            fontSize: 24
        },
        left: 'center',
        top: 32,
    },
    tooltip: {},
    geo: {
        map: 'china',
        itemStyle: {
            areaColor: 'rgba(0,29,132,0.8)',
            borderColor: '#02c0ff'
        },
        emphasis: {
            itemStyle: {
                shadowColor: '#000',
                shadowOffsetY: 20,
                shadowBlur: 20
            }
        }
    },
    series: {
        id: 'scatter',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: (param) => {
            return param[2] / 15
        },
        emphasis: {
            itemStyle: {
                color: 'yellow'
            },
        }
    }

};
chart.setOption(option);

fetch('./lib/income.json')
    .then((res) => res.json())
    .then(data => {
        dataLen = data.length
        chart.setOption({
            series: [{
                id: 'scatter',
                data
            }]
        })
        setInterval(anim, 1000);
    });

let curInd = 0;
let dataLen = null;

function anim() {
    // 取消之前高亮的图形
    chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: curInd
    });
    // 当前索引递增，不能超过系列元素的总数
    curInd = (curInd + 1) % dataLen;
    // 高亮当前图形
    chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: curInd
    });
    // 显示 tooltip
    chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: curInd
    });
}}
```

## 完整代码

完整代码比较长，大约有600多行，因此不在这里再写一遍了，可以移步[github](https://github.com/pedrosong/kaiKeBa_Code-Courseware/blob/master/8-%E5%89%8D%E7%AB%AFUI%E8%AE%BE%E8%AE%A1%203D%20%E5%92%8C%20Echarts/20210111%20-%20echarts-03/06-%E6%A1%88%E4%BE%8B/05-%E5%A4%A7%E5%B1%8F.html)查阅。