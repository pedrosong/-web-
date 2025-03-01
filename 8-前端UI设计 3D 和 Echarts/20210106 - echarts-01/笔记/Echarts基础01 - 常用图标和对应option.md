# Echarts基础01 - 常用图表和对应option

> 写在前面：
>
> 1. 本文是单纯的个人学习总结和课堂笔记整理，大部分知识点来自“开课吧”线上直播课程，以及官方资料。
> 2. 由于目前仍处于前端学习、入门阶段，因此对于知识的掌握和理解难免会有偏差，因此该文章仅仅是个人记录，请查阅者不要以此作为资料依据。

# 入门

基于我们的需求，可以利用echarts库生成丰富多样的图表，我们只需做到如下几步：

1. 需要设置好生成echarts的容器，并设置好容器的样式（至少要设置width和height）这样后续才可以显示出来我们绘制的图表。
2. 引入echarts
3. 基于准备好的容器，初始化echarts实例
4. 指定我们想要绘制的图表，并声明图表的配置项和数据
5. 利用setOption() ，基于上述声明的配置和数据生成我们想要的图表。

```html
<style>
    #main{
        width: 600px;
        height: 500px;
    }
</style>
<!--建立dom 容器-->
<div id="main"></div>
<!--引入echarts-->
<script src="https://lib.baomitu.com/echarts/4.7.0/echarts.min.js"></script>
<script>
    /* 基于准备好的dom，初始化echarts实例 */
    const chart=echarts.init(document.querySelector('#main'))

    /*指定图表的option 配置项和数据
    *   这里不需要知道配置项的含义，下一节会详细解释
    * */
    const option={
        xAxis:{
            data:['html','css','js']
        },
        yAxis:{name:'人数'},
        series:{
            type:'bar',
            data:[30,20,40]
        }
    }

    /*使用刚指定的配置项和数据显示图表
    *   setOption(option)
    * */
    chart.setOption(option)
</script>
```

# 常用配置项及相关参数

配置项option通常是以对象的方式声明，并在对象内声明数据源，最后通过`chart.setOption(option)`的方式启用配置。下面列举了一些常用的配置项，如标题、坐标轴、图例等，更多的配置项还是需要在遇到项目实际需求的时候查阅[官方文档](https://echarts.apache.org/en/api.html)。

## 图表标题 title

- 主标题：text
- 副标题：subtext
- 位置：left，预设关键字如下
  - left 左对齐
  - right 右对齐
  - center 居中
- 主标题样式：textStyle，其配置项如下，
  - 颜色：color
  - 字体大小：fontsize
- 可见性：show
  - true 可见，默认
  - false 不可见

```javascript
title:{
    text:'大前端',
    left:'center',
    // left:'50%',
    // left:50,
    subtext:'我们在学习的大前端',
    textStyle:{
        fontSize:24,
        color:'maroon'
    },
    subtextStyle:{
        fontSize:14,
        color:'orange'
    },
    show:false,
    // show:true,
}
```

## 提示框 tooltip

- trigger 提示框触发方式
  - item 图形触发，主要在散点图，饼图等无类目轴的图表中使用
  - axis 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表
  - none 什么都不触发

```javascript
tooltip:{
    // trigger:'item',
    // trigger:'none',
    trigger:'axis',
}
```

## 绘图区 grid

绘图区在容器内的边距，通过`left right bottom right`控制

```javascript
grid:{
    top:80
}
```

## 图例 legend

用来显示图例数据源中每一个系列的name值，可以通过`left right bottom right`控制图例在图表内的边距

```javascript
legend:{
    left:0
}
```

## 工具栏 toolbox

- feature{} 工具配置项
  - saveAsImage{} 保存为图片
  - dataView{} 数据视图工具
  - restore{} 配置项还原
  - dataZoom{} 数据区域缩放
  - magicType{} 动态类型切换
    - type[] 动态类型：line 折线图，bar 柱状图，stack 堆叠

```javascript
toolbox:{
    feature:{
        saveAsImage:{type:'jpeg'},
        dataView:{},
        restore:{},
        dataZoom:{},
        magicType:{
            type:['line','bar','stack']
        }
    }
}
```

## 坐标轴

### x轴 xAxis

- name 坐标轴名称
- data 类目数据 []

```javascript
xAxis:{
            name:'前端语言',
            data:['html','css','js']
        }
```

### y轴 yAxis

- name 坐标轴名称

- splitNumber 分割段数
- interval 强制设置坐标轴分割间隔
- minInterval 坐标轴最小间隔
- maxInterval 坐标轴最大间隔

```javascript
yAxis:{
    name:'人数',
    // splitNumber:10,
    // interval:5,
    // maxInterval:5,
    // minInterval:20
}
```

## 系列列表 series

- 列表类型 type
- 系列名 name ：用于提示tooltip，图例legend 筛选，数据更新
- 数据 data []
- 标记点 markPoint {}
  - data [] 标记的数据数组
    - {type:'max'} 最大值
    - {type:'min'} 最小值
    - {value:'值',coord:[x,y]} 坐标位
- 标记线 markLine
  - data[] 标记数据
    - name 名称
    - type 类型 'average', 'min', 'max'
    - coord 点位

```javascript
series:[
    {
        name:'学习人数',
        type:'bar',
        data:[30,20,40],
        markPoint:{
            data:[
                // {type:'max'},
                {value:'40',coord:[2,40]},
                {type:'min'},
                {value:'kkb',coord:[0,30]}
            ]
        },
        markLine:{
            data:[
                [
                    {coord:[0,0]},
                    {coord:[2,40]},
                ]
            ]
        }
    },
    {
        name:'就业人数',
        type:'bar',
        data:[40,30,50],
        markLine:{
            data:[
                {type:'max'},
                {type:'min'},
                {type:'average'},
                [
                    {coord:[0,0]},
                    {coord:[2,50]},
                ]
            ]
        }
    }
]
```

# 常用图表

常用图表有很多，如柱形图、折线图、散点图、饼图、K线图等等，因为很多功能都类似，所以建议还是在用到时候查询官网文档，这里不再一一展开，这里只以折线图、饼图和地图三类举例。

## 柱形图

如下是折线图的相关配置，其中关于提示框、坐标轴的配置在这不做赘述。主要还是说一下关于`series`的配置：

- 首先通过type声明图表类型
- 然后，因为声明的是折线图，因此可以通过smooth设置线条是平滑曲线还是折线
- 通过itemStyle和areaStyle可以设置每一个项目的颜色和透明度
- 每一个数据对应的坐标点，可以用symbol声明该点的标记图形，主要有三类
  - echarts内置形状，circle、rect等
  - 通过url引入图片作为标记图形：`'image://url'`
  - 使用SVG作为标记图形：`'path://'`

```html
<body>
<!--建立dom 容器-->
<div id="main"></div>
<!--引入echarts-->
<script src="https://lib.baomitu.com/echarts/4.7.0/echarts.min.js"></script>
<script>
    /*基于准备好的dom，初始化echarts实例*/
    const myChart = echarts.init(document.getElementById('main'));
    /*图表配置项*/
    const option = {
        tooltip:{},
        xAxis:{
            data:['html','css','js','svg'],
            boundaryGap:2
        },
        yAxis:{
            axisLabel:{
                margin:20
            }
        },
        series:{
            type:'line',
            data:[30,20,40,100],
            smooth:true,
            itemStyle:{
                color:'#00acec'
            },
            areaStyle:{
                color:'#00acec',
                opacity:0.2
            },
            symbolSize:30,
            // symbol:'none',
            // symbol:'image://./images/bs.png',
            symbol:'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z'}
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
</script>
```

## 饼图

如下是关于饼图的相关配置，这里用到了一个参数`visualMap`，我觉得很有必要记一下，`visualMap`是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。翻译成人话，就是把数据转化成图例，并把图例与图表对应起来。![image-20210109135634200](C:\Users\songchenghao\Desktop\image-20210109135634200.png)

其中关于`visualMap`相关的配置在这里稍作解释：

- min 是图例的最小值
- max 是图例的最大是
- inRange 定义在选中范围中的视觉元素
  - `colorLightness:[0,1]` 前面是最小值，后面是最大值，`1` 代表颜色最深。

```javascript
<!--建立dom 容器-->
<div id="main"></div>
<!--引入echarts-->
<script src="https://lib.baomitu.com/echarts/4.7.0/echarts.min.js"></script>
<script>
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    const option = {
        visualMap:{
            min:0,
            max:100,
            inRange:{
                colorLightness:[0,1]
            },
            show:true
        },

        /*饼图 pie
        *   type 图表类型
        *   roseType 玫瑰图类型
        *       radius 半径
        *       area 面积
        *   radius 半径，[起始半径，结束半径]可生成环形
        *   itemStyle 项目样式
        *       color 颜色
        * */
        series:{
            type:'pie',
            data:[
                {name:'html',value:30},
                {name:'css',value:20},
                {name:'js',value:40},
                {name:'svg',value:50},
            ],
            roseType:'radius',
            // roseType:'area',
            // radius:'40%',
            radius:['40%','70%'],
            itemStyle:{
                color:'#00acec'
            }
        },

    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
</script>
```

## 地图

### 请求json文件生成地图数据源

使用此方式生成地图类图表的时候，需要保证在数据源中声明好地图图表需要的所有必要配置项，如下，需要声明类型、省份名称、边界经纬度等等。

```json
// 数据源示例
			"type": "Feature",
      "properties": {
        "adcode": "120000",
        "name": "天津市",
        "center": [117.190182, 39.125596],
        "centroid": [117.347019, 39.28803],
        "childrenNum": 16,
        "level": "province",
        "parent": { "adcode": 100000 },
        "subFeatureIndex": 1,
        "acroutes": [100000],
        "adchar": null
      },
      "geometry": {...}
```

确保数据源没有问题之后，就可以通过fetch或者ajax等数据请求方式，获取到json文件中的数据，然后将其返回结果转换为json字符串，这样就获取到了我们想要的数据。最后，绘制地图类图标也就水到渠成了，只需要在option里面声明好图标类型和地图注册名即可。

```html
<script>
    //初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));

    /*获取接送文件*/
    fetch('./data/China.json') //文件存放在该相对路径下
        .then((res) => res.json())
        .then(data => {
            //通过registerMap把数据源注册成地图注册名，这样之后`China`就代表了来自data的数据
            echarts.registerMap('china',data);
            //echarts 配置文件
            const option = {
                title: {
                    text: '中国地图',
                    left:'center'
                },
                /*
                * 地图 map
                *   type 图表类型
                *   map 地图注册名
                * */
                series:{
                    type:'map',
                    map:'china'
                }
            };
            //基于配置文件显示图表
            myChart.setOption(option);
        })
</script>
```

### 通过geo绘制地图

可见，如果采用上述在项目内存储 `json` 数据源，当我们要绘制一个详细的地图（比如具体到中国的每一个村庄、每一条乡村小路）的时候，项目中的 `json` 数据源就会变得非常庞大、冗余。为了解决这个问题，geo组件应运而生，`geo.map` 属性提供了两种方式，一种是可以直接 `script` 标签引入的 `js` 文件，引入后会自动注册地图名字和数据。还有一种是 `json` 文件，需要通过 `ajax` 异步加载后手动注册，从而减少项目本身代码的体积。

`geo` 是地理坐标系组件。地理坐标系组件用于地图的绘制，支持在地理坐标系上绘**制散点图**、**线集**。

```html
<script>
  const myChart = echarts.init(document.getElementById("main"));
  /*获取接送文件*/
  fetch("./data/China.json")
    .then((res) => res.json())
    .then((data) => {
      echarts.registerMap("china", data);
      const option = {
        title: {
          text: "中国地图",
          left: "center",
          textStyle: {
            color: "rgba(255,255,255,0.8)",
          },
          top: 24,
        },
        geo: {
          map: "china", // 引入注册号的地图名字
          roam: true, // 开启鼠标缩放和平移漫游
          zoom: 1, // 当前视角的缩放比例
          itemStyle: { // 默认情况下图形的样式
            areaColor: "#004981", // 地图区域的颜色
            borderColor: "#029fd4", // 图形的描边颜色
          },
          emphasis: { // 高亮状态下图形的样式
            itemStyle: {
              color: "#029fd4",
            },
            label: {
              color: "#fff",
            },
          },
        },
        series: [
          {
            name: "pm2.5",
            type: "scatter", // 散点图
            coordinateSystem: "geo", // 该系列使用的坐标系: geo地理坐标系
            data: [
              {
                name: "海门",
                value: [121.15, 31.89, 9],
              },
              {
                name: "鄂尔多斯",
                value: [109.781327, 39.608266, 12],
              },
              {
                name: "招远",
                value: [120.38, 37.35, 18],
              },
            ],
            /*散点标记的大小
            *		1.可以设置成固定的值；
            *		2.可以利用回调函数，如下，每一个每一个系列下值的标记大小取决于该数据对						*			象value下的第三个值		
            */ 
            symbolSize: function (val) { 
              return val[2];
            },
          },
        ],
      };
      myChart.setOption(option);
    });
</script>

```



