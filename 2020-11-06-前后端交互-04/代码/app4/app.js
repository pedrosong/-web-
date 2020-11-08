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
    {id: 5, name: 'XuanJie'}
];

app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}));

router.get('/', async ctx => {
    // 1、EventSource 必须返回 text/event-stream 的 content-type 头
    ctx.set('content-type', 'text/event-stream');

    // 注意：如果返回event-stream头，就不要返回对象格式的数据，否则koa会自动把header设置成json格式


    // ctx.body = 'users';

    // event-stream 的格式是有要求的，如下
    // https://developer.mozilla.org/zh-CN/docs/Server-sent_events/Using_server-sent_events
    ctx.body = `event: ping\ndata: ${JSON.stringify(users)}\n\n`;
});

app.use(router.routes());
app.listen(8888);