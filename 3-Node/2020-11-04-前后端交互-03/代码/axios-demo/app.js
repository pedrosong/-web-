const Koa = require('koa');
const KoaRouter = require('koa-router');
const staticCache = require('koa-static-cache');
const KoaStaticCache = require('koa-static-cache');

const app = new Koa();
const router = new KoaRouter();

app.use(staticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}));

router.get('/data', async ctx => {
    ctx.body = [
        'html',
        'css',
        'javascript'
    ]    
});

app.use(router.routes());

app.listen(8888);