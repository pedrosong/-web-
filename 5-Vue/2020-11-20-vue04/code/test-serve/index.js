const Koa = require("koa");
const fs = require("fs");

const serve = require("koa-static");

const app = new Koa();

app.use(serve(__dirname + "/static"));

// 如果没有匹配到资源的话 ，那么我应该返回 index.html 给浏览器

app.use((ctx) => {
  //
  console.log("no found index.html");
  const indexHtml = fs.readFileSync("./static/index.html");
  ctx.set("content-type", "text/html");
  console.log(indexHtml.toString());
  ctx.body = indexHtml.toString();
});

app.listen(8080, () => {
  console.log("open server localhost:8080");
});
