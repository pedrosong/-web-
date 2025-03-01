const Koa = require("koa");

const Router = require("koa-router");

const serve = require("koa-static");

const views = require("koa-views");

const koaBody = require("koa-body");

const app = new Koa();

app.use(serve(__dirname + "/static"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

app.use(
  koaBody({
    multipart: true,
  })
);

const router = new Router();
router.get("/", (ctx) => {
  ctx.body = "hello test-koa-setup";
});
app.use(router.routes());

app.listen(8080, () => {
  console.log("open server localhost:8080");
});
