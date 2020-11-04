const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');

const app = new Koa();
const router = new KoaRouter();

app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}))

router.get('/mayun', async ctx => {
    ctx.body = '100,000,000$';
});

app.use(router.routes());

app.listen(8882);