/*获取main 容器*/
const main = d3.select("#main");
function Render(dom) {
  return function (shape, option) {
    const obj = dom.append(shape);
    for (let [key, val] of Object.entries(option)) {
      obj.attr(key, val);
    }
    return obj;
  };
}

const svg = Render(main)("svg", {
  version: 1.2,
  xmlns: "http://www.w3.org/2000/svg",
  width: "100%",
  height: "100%",
  viewBox: "-400 -400 800 800",
});
// 获取到创建DOM节点的方法
const draw = Render(svg);
/*绘制图形……*/
draw("rect", {
  x: -200,
  y: 0,
  width: 400,
  height: 200,
  fill: "red",
});
draw("rect", {
  x: -200,
  y: 0,
  width: 400,
  height: 200,
  fill: "none",
  stroke: "#000",
  "stroke-width": 40,
});
draw("rect", {
  x: -200,
  y: 50,
  width: 400,
  height: 60,
  fill: "antiquewhite",
});
draw("path", {
  d: `
            M
            -100 150
            L
            100 150
        `,
  fill: "none",
  stroke: "#000",
  "stroke-width": 40,
});
draw("circle", {
  cx: -100,
  cy: 80,
  r: 20,
  fill: "red",
});
draw("path", {
  d: `
            M
            80 90
            A
            20 20
            0
            0
            1
            120 90
        `,
  fill: "red",
});
draw("path", {
  d: `
            M
            -200 -200
            C
            -100 -200
            -100 0
            0 0
            S
            100 -200
            200 -200
        `,
  fill: "none",
  stroke: "#000",
  "stroke-width": 40,
});
