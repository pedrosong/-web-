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

// router.get('/', async ctx => {
//     ctx.body = '我是 Tencent';
// })

router.get('/pony', async ctx => {
    // console.log('有人想要钱');

    ctx.set('Access-Control-Allow-Origin', 'http://localhost:8882');

    ctx.body = '100,000,000$';
});

router.options('/money', async ctx => {
    console.log('需预检的请求');

    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');

    ctx.body = '';
})

router.post('/money', KoaBody(), async ctx => {
    // * 通配
    ctx.set('Access-Control-Allow-Origin', '*');

    console.log('送钱了', ctx.request.body);

    ctx.body = 'thx';
})

app.use(router.routes());

app.listen(8881);