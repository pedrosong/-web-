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


router.get('/pony', async ctx => {
    ctx.body = '100,000,000$';
});

router.post('/money', KoaBody(), async ctx => {

    console.log('送钱了', ctx.request.body);

    ctx.body = 'thx';
})

app.use(router.routes());

app.listen(8881);