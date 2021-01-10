# ECharts基础02 - 进阶应用

> 写在前面：
>
> 1. 本文是单纯的个人学习总结和课堂笔记整理，大部分知识点来自“开课吧”线上直播课程，以及官方资料。
> 2. 由于目前仍处于前端学习、入门阶段，因此对于知识的掌握和理解难免会有偏差，因此该文章仅仅是个人记录，请查阅者不要以此作为资料依据。

通过第一堂课我们学习到了如何使用ECharts库绘制常见的图表，包括比较简单且常见的柱形图、饼图，以及稍微复杂一些的地图，并且学习了一些常见的配置项。第二堂课以及本篇笔记中主要介绍ECharts的进阶用法，以便适应项目中遇到的复杂场景。

# 多坐标轴

关于上一篇笔记中柱形图的绘制，可以回忆道该图表只有一个x轴和y轴，但是如果每个类目下面有两组系列的数据呢？假设两系列数据又相差了好几个数量级，那么显然一个y轴就不能准确的表示两组数据。

这时候多坐标轴也就应运而生。其实整体来说，多坐标轴的参数配置基本没有太大的差别，我们先看一下最简单的多坐标轴。

## 简单多坐标轴

假设我们想要实现下图所示的坐标轴，那么仅仅只需要声明好两个坐标轴即可。

![Snipaste_2021-01-10_12-36-58](/Users/songchenghao/Pictures/截图/Snipaste_2021-01-10_12-36-58.png)

声明两个坐标轴的方式也很简单，只需要用数组的方式声明好两个y轴的配置即可

```javascript
yAxis:[
    {max:50},
    // {interval:10},
    {}
]
```

然后在配置`series` 的时候以数组的方式，声明好每个系列对应的坐标轴即可，这样就可以生成上面图片那样的图表

```javascript
series:[
    {
        name:'学习人数',
        type:'bar',
        data:[30,20,40],
        yAxisIndex:0 // => 对应上述第一个y轴配置项
    },
    {
        name:'就业人数',
        type:'bar',
        data:[330,450,850],
        yAxisIndex:1 //	对应上述第二个y轴配置项
    }
]
```

## 需要数据处理的多坐标轴

上面的那个例子因为两组数据量都比较小，因此我们可以一眼看出来哪个是最大值哪个是最小值，因此不需要进行数据的处理，

下面我们来看一个进行数据处理的例子，主要处理内容就是通过计算两组数据的极大值和极小值，算出来图表的行数，并保证两个系列下行数、行高保持一致。

```html
<script>

    const myChart = echarts.init(document.getElementById('main'));

    /*
    * data1 销售量的系列数据
    * data2 盈利额的系列数据
    */
    const data1=[50, 12, 16, 11, 16, 20];
    const data2=[-150, 120, 160, -110, 160, 1000];

    //理想行数（实际行数会有浮动）
    const rowNum=6;

    /*数据极值
    *   max1 销售量数据的最大值
    *   max2 盈利额数据的最大值
    *   min1 销售量数据的最小值
    *   min2 盈利额数据的最小值
    * */
    let max1=Math.max(...data1);
    let max2=Math.max(...data2);
    let min1=Math.min(...data1);
    let min2=Math.min(...data2);

    /*极值比例
    * 因为两个y轴之间是有比例关系的，通过这个比例尺就可以算出来
    */
    const rat1=min1/max1;
    const rat2=min2/max2;

    /*比例大小对比*/
    const ratState=rat1>rat2;
    /*设置极小值
    *   如果系列1的最小比最大大于系列2的最小比最大，让系列1的极小值等于自身的极大值乘以系列2的极值比例
    *   否则，让系列2的极小值等于自身的极大值乘以系列1的极值比例
    * 	最终结果就是，令两组数据的机制比例一致，方便后续令行高保持一致。
    *  */
    if(ratState){
        min1=rat2*max1;
    }else{
        min2=rat1*max2;
    }

    /*
    * inter1 销售量的行高取整
    * inter2 盈利额的行高取整
    * */
    let inter1=Math.ceil((max1-min1)/rowNum);
    let inter2=Math.ceil((max2-min2)/rowNum);
    console.log(inter1,inter2);

    /*对极值微调*/
    min1=Math.floor(min1/inter1)*inter1;
    max1=Math.ceil(max1/inter1)*inter1;
    min2=Math.floor(min2/inter2)*inter2;
    max2=Math.ceil(max2/inter2)*inter2;

    /*求行数*/
    const maxRowNum=Math.max(max1/inter1,max2/inter2);
    const minRowNum=Math.min(min1/inter1,min2/inter2);

    /*极值微调*/
    min1=inter1*minRowNum;
    max1=inter1*maxRowNum;
    min2=inter2*minRowNum;
    max2=inter2*maxRowNum;

    /*配置项*/
    const option = {
        tooltip: {},
        legend: {
            data: ['销售量', '盈利额']
        },
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: '销售量',
                min: min1,
                max: max1,
                interval: inter1,
            },
            {
                type: 'value',
                scale: true,
                name: '盈利额',
                min: min2,
                max: max2,
                interval: inter2,
            }
        ],
        series: [
            {
                name: '销售量',
                type: 'bar',
                yAxisIndex: 0,
                data: data1,
            },
            {
                name: '盈利额',
                type: 'bar',
                yAxisIndex: 1,
                data: data2
            }
        ]
    };
    myChart.setOption(option);
</script>
```

可见上述对于数据的处理才是此类多坐标轴图表的核心，最终就可以实现如下的图像效果。

![Snipaste_2021-01-10_13-03-53](/Users/songchenghao/Pictures/截图/Snipaste_2021-01-10_13-03-53.png)



# 异步数据

在当初绘制地图时，需要向json文件请求数据，因为数据本身存在本地，因此加载起来非常快，但是在实际项目中，往往这些数据是存在后端的，那么加载数据就有一定的延迟。如果需要等待把所有数据都加载完之后，才会进行图表渲染，那么显然当遇到网络不好的情况下，用户体验会相对较差。

为了解决这个问题，我们可以使用异步请求的方式获取数据。说白了就是，先配置并启用能配置的option，等异步请求之后再把获取到 `data` 加到option里面就好了。

```html
<script>
    const myChart = echarts.init(document.getElementById('main'));
    /*有什么先配置什么*/
    myChart.setOption({
        title: {
            text: '中国地图',
            left:'center'
        }
    });
  
    /*显示loading*/
    myChart.showLoading()
  
  	/*请求数据*/
    fetch('./data/China.json')
        .then((res) => res.json())
        .then(data => {
            myChart.hideLoading();
            /*注册地图*/
            echarts.registerMap('china', data);
            /*等请求到数据后，追加配置*/
            myChart.setOption({
                series: {
                    type:'map',
                    map:'china',
                }
            });
        })
</script>
```



# 数据集

> 下述关于数据集的引入背景，基本摘录自ECharts官网。

ECharts 4 以前，数据只能声明在各个系列 `series` 中，例如：

```javascript
option = {
    xAxis: {
        type: 'category',
        data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie']
    },
    yAxis: {},
    series: [
        {
            type: 'bar',
            name: '2015',
            data: [89.3, 92.1, 94.4, 85.4]
        },
        {
            type: 'bar',
            name: '2016',
            data: [95.8, 89.4, 91.2, 76.9]
        },
        {
            type: 'bar',
            name: '2017',
            data: [97.7, 83.1, 92.5, 78.1]
        }
    ]
}
```

这种方式的优点是，直观易理解，以及适于对一些特殊图表类型进行一定的数据类型定制。

但是**缺点**是，为匹配这种数据输入形式，常需要有数据处理的过程，把数据分割设置到各个系列（和类目轴）中。此外，不利于多个系列共享一份数据，也不利于基于原始数据进行图表类型、系列的映射安排。

于是，ECharts 4 提供了 数据集 `dataset` 组件来单独声明数据，它带来了这些效果：

- 能够贴近这样的数据可视化常见思维方式：

  -  提供数据，

  - 指定数据到视觉的映射，从而形成图表。
- 数据和其他配置可以被分离开来。数据常变，其他配置常不变。分开易于分别管理。
- 数据可以被多个系列或者组件复用，对于大数据量的场景，不必为每个系列创建一份数据。
- 支持更多的数据的常用格式，例如二维数组、对象数组等，一定程度上避免使用者为了数据格式而进行转换。

`dataset` 可以使用多维数组或者数组对象的形式声明数据。

```javascript
// 多维数组
option = {
    legend: {},
    tooltip: {},
    dataset: {
        source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
        ]
    },
  	// 声明X轴为类目轴（category）。
  	// 默认情况下，类目轴对应到 dataset 第一列。
    xAxis: {type: 'category'},
    yAxis: {},
  	// 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
    series: [
        {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'}
    ]
};
```

```javascript
option = {
  legend: {},
  tooltip: {},
  dataset: {
    // 用 dimensions 指定了维度的顺序。
    // 直角坐标系中，默认把第一个维度映射到 X 轴上，后续的维度映射到 Y 轴上。
    dimensions: ["product", "2015", "2016", "2017"],
    source: [
      { product: "Matcha Latte", '2015': 43.3, '2016': 85.8, '2017': 93.7 },
      { product: "Milk Tea", '2015': 83.1, '2016': 73.4, '2017': 55.1 },
      { product: "Cheese Cocoa", '2015': 86.4, '2016': 65.2, '2017': 82.5 },
      { product: "Walnut Brownie", '2015': 72.4, '2016': 53.9, '2017': 39.1 },
    ],
  },
  xAxis: { type: "category" },
  yAxis: {},
  series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
};

```

## 行列映射

如下代码，可以在多维数组中通过 `seriesLayoutBy` 控制数据映射类型。

行列映射中有几个知识点：

1. `dataset` 默认是列映射，也就说说，一个多维数组，默认第一个维度会映射到X轴，然后之后的每个维度对应的一列，都会生成一个数据系列。
2. 假设容器内声明了多个图表 `grid` ，如果不加以限制，`series`会以默认参数渲染到第一个 `grid` 里面，即默认`xAxisIndex和yAxisIndex` 默认为 `0`。
3. 通过 `seriesLayoutBy` 属性声明到底是用行渲染还是列渲染。

```html
<script>
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));
    //数据源
    const source=[
        ['大前端','学习人数', '就业人数'],
        ['html',  20,   25],
        ['css',   10,   15],
        ['js',    30,   40]
    ];

    // 指定图表的配置项和数据
    const option = {
        legend: {},
        tooltip: {},
        dataset: {
            source,
        },
        // grid [{},{}] 在一个echarts 实例中建立多个grid，并设置其位置
        grid:[
            {bottom:'55%'},
            {top:'55%'},
        ],

        // 建立两个 X 轴，分属两个网格
        xAxis: [
            {type: 'category',gridIndex:0},
            {type: 'category',gridIndex:1}
        ],
        // 建立两个 Y 轴，分属两个网格
        yAxis:[
            {type:'value',gridIndex:0},
            {type:'value',gridIndex:1}
        ],
        series: [
          	// 前两个默认以 列映射 的方式渲染到第一个网格中，
          	// 因为数据只有两列，所以只声明两个即可
            {type: 'bar'},
            {type: 'bar'},
          	// 后面三个，通过Index控制，以 行映射 的方式渲染到第二个网格中
            {type: 'bar',
             xAxisIndex:1,
             yAxisIndex:1,
             seriesLayoutBy:'row'
            },
          	{type: 'bar',
             xAxisIndex:1,
             yAxisIndex:1,
             seriesLayoutBy:'row'
            },
          	{type: 'bar',
             xAxisIndex:1,
             yAxisIndex:1,
             seriesLayoutBy:'row'
            },
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
</script>
```

## 维度映射

> 维度：维度指的就是 dataset 的一行/列。

上述行列映射，因为我们需要在 `series` 中配置映射关系，所以通过行列映射来控制数据与坐标轴的映射关系其实还是有些麻烦的。

因此，可以使用 `dimensions` 属性来控制映射维度，也就是在配置 `dataset` 的时候就声明好该以何种维度渲染图表，而不需要在每一个系列中告诉人家要怎么映射。

```html
<script>
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));
    //数据源
    const source=[
        // 定义系列的数据源
        ['html',  20,   25],
        ['css',   10,   15],
        ['js',    30,   40]
    ];

    // 设置维度映射 dimensions
  	// 默认会将 dimensions[0] 映射到 X 轴，后续的 dimensions 映射到 Y 轴
  	// 也就是说，会将 name 为‘大前端’的系列放到 X 轴作为类目数据，将 后面两个：
  	// ‘学习人数’ 和 ‘上课人数’ 放到 Y 轴，作为数值数据
    const dimensions=['大前端','学习人数','上课人数']

    // 指定图表的配置项和数据
    const option = {
        legend: {},
        tooltip: {},
        dataset: {source,dimensions}, // 声明数据源和映射维度
        xAxis: {type: 'category'}, // 声明 X 轴是类目型
        yAxis: {}, // 声明 Y 轴是数值型
        series: [
            {type: 'bar',},
            {type: 'bar',},
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
</script>
```

## 编码映射

编码映射同样也是声明维度来告诉图表如何渲染的。可以通过 `series.encode` 属性来声明 data 中的第几个维度要被渲染成什么。

还以上面维度映射的代码为例，其中数据源和维度不变。

```javascript
const source = [
  ["html", 20, 25],
  ["css", 10, 15],
  ["js", 30, 40],
];
const dimensions = ["大前端", "学习人数", "上课人数"];
```

但是在设置 `series` 的时候，通过 `encode` 声明映射的方式。`encode`可以通过数组或者数字的方式声明。

```javascript
const option = {
  legend: {},
  tooltip: {},
  dataset: { dimensions, source },
  // 设置类目轴和数值轴
  xAxis: { type: "category" },
  yAxis: { type: "value" },
  series: {
    type: "bar",
    encode: {
      x: 0, // data中的第一个维度被映射到 X 轴，即 html css js
      y: 2, // data中的第三个维度被映射到 Y 轴，即上课人数中下面的 25 15 40 
      tooltip: [1, 2], // data中的第二、三个维度都被映射到提示框里
    },
  },
};

```

# 区域缩放

图表的缩放一共有三种：

- 工具栏里的缩放工具
- 鼠标中间的滚轮缩放
- 滑动条缩放

### 工具栏的缩放工具

工具栏 `toolbox` 其实已经在上一篇文章里提到了，其中 `feature{}` 是工具配置项， `dataZoom{}` 是框选性缩放工具。

```json
toolbox: {
  feature: {
    dataZoom: {
    }
  }
}
```

### 滚轮缩放

滚轮缩放就是在图表内部，通过滑动鼠标中间的滚轮实现缩放。配置如下：

```json
dataZoom: [
  {
    type: "inside", 
  },
];

```



### 滑动条缩放

滑动条缩放就是在图表下面添加一个滑动条，通过拖动滑动条，来实现图表的缩放。

```json
dataZoom:[
  {
    type: "slider", // slider 代表滑动条缩放
    start: 50, // 初始值 百分数
    end: 80,  // 结束值 百分数
  },
]

```



# 视觉映射

`visualMap` 是视觉映射组件，用于进行视觉编码，也就是将数据映射到视觉元素（视觉通道）。已经在上一篇笔记中介绍了该配置的作用：将数据映射到图例上，同时将图例与图表中的标记进行绑定，下面详细罗列一下常用配置。

- `type` 映射方式
  - `continuous` 连续型
  - `piecewise` 分段型
- `min` 映射区间的起始位置，如0
- `max` 映射区间的接收位置，如90
-  `calculable` 是否显示拖拽用的手柄，只适用于连续型
-  `range []` 显示此范围内的项目，百分比类型，只适用于连续型,如[0,100]
-  `dimension` 基于哪个维度的数据进行视觉映射
- `inRange` 自定义取色范围
  -  `color[]` 颜色映射
  -  `symbolSize[]` 大小映射

```javascript
// 连续性示例
visualMap:{
  type:'continuous', 
  min:0,
  max:10,
	calculable:true,
	// range:[0,50],
	dimension:1,
  inRange: {
    color:['#00acec','green','orange'],
    symbolSize:[5,50],
    // colorSaturation:[0,1]
  }
}
```

```javascript
// 分段型示例
visualMap:{
  type:'piecewise',
  min:0,
  max:100,
  inRange: {
    color:['#00acec','green','orange'],
    symbolSize:[5,50],
  }
}
```



# 事件

通过 ` echartsInstance.on` 可以绑定事件（off解绑），事件的触发方式主要有两种：鼠标事件和  `dispatchAction` 触发的事件。

### 鼠标事件

所有鼠标事件相关的 API 请参考[官方文档](https://echarts.apache.org/zh/api.html#events)，这里仅用鼠标事件中的 `click` 事件和 `legendselectchanged` 事件举例。

- `click` 事件：当事件触发时，回调函数可以接收到一个param参数传入，该参数包含触发事件的对象所包含的各类属性。

```javascript
myChart.on('click',(param)=>{
  console.log(param);
})
```

- `legendselectchanged`事件：该事件是切换图例选中状态后的事件，通过on绑定上之后，用户就可以通过点击图例触发**交互行为**

```javascript
myChart.on('legendselectchanged',(param)=>{
  console.log(param);
  console.log("点击之后，您就触发了图例开关点击事件")
})
```



### 	dispatchAction 触发

所有可以通过 `dispatchAction` 触发的动作请参考官方文档，这里仅用其中的高亮行为 `highlight` 举例。

可以通过 `seriesIndex` 和 `seriesName` 选择应用于哪个或哪几个系列。

也可以更具体，通过 `dataIndex` 和 `name` 选择应用于哪个或哪几个数据上。

```javascript
echartsInstance.dispatchAction({
    type: 'highlight',
    // 可选，系列 index，可以是一个数组指定多个系列
    seriesIndex: number|Array,
    // 可选，系列名称，可以是一个数组指定多个系列
    seriesName: string|Array,
    // 可选，数据的 index
    dataIndex: number,
    // 可选，数据的 名称
    name: string
})
```



# 富文本

ECharts提供了 `rich` 属性，在这里面可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

关于下面代码中用到的 `label` 标签属性，下面简单说一下其中的配置项和含义：

- `formatter` 文本片段，以 `{样式名|文字内容}\n 换行` 的形式声明。
- `textBorderColor` 文本描边颜色
- `extBorderWidth` 文本描边宽度
- `rich` 富文本，在其中写入所以相关样式
  - `width` 宽
  - `height` 高
  - `backgroundColor` 背景色，可以是直接写颜色 `backgroundColor:'#123234'`，也可以插入图片
    - `image` 背景图
  - `fontSize` 文字大小
  - `lineHeight` 行高
  - `fontWeight` 文本加粗

```html
<script>
  const myChart = echarts.init(document.getElementById("main"));
  // 数据
  const data = [
    { name: "杨戬", value: 80, img: "./images/yj.jpg" },
    { name: "鲁班", value: 60, img: "./images/lb.jpg" },
    { name: "沈梦溪", value: 40, img: "./images/smx.jpg" },
    { name: "诸葛亮", value: 30, img: "./images/zgl.jpg" },
  ];
  // 遍历 data 设置每一个data的 label 属性
  data.forEach((item) => {
    item.label = {
      textBorderColor: "#fff",
      textBorderWidth: 3,
      formatter:
      	// image name val 都是样式名称，如果需要设置样式，就在下面的 rich 内设置
      	// 如果不需要设置样式，也可以啥都不管
        "{image|}\n{name|" + item.name + "}\n{val|实力：" + item.value + "}",
      rich: {
        image: {
          width: 60,
          height: 60,
          backgroundColor: {
            image: item.img,
          },
        },
        name: {
          fontSize: 18,
          lineHeight: 32,
        },
      },
    };
  });

  myChart.setOption({
    title: { text: "英雄战力" },
    series: {
      type: "pie",
      data,
      radius: "70%",
    },
  });
</script>
```

最后的最后，我们肯定不能背下来所有API，因此学会查文档、看文档才是最重要的。