const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaStaticCache = require('koa-static-cache');

const app = new Koa();
const router = new KoaRouter();

let users = [
    {id: 1, name: 'HaiZi'},
    {id: 2, name: 'zMouse'},
    {id: 3, name: 'xiaorui'},
    {id: 4, name: 'TM'},
    {id: 5, name: 'WeiGe'}
];

app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}));

router.get('/', async ctx => {
    ctx.body = users;
});

app.use(router.routes());
app.listen(8888);