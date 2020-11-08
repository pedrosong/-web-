const Koa = require('koa');
const KoaRouter = require('koa-router');

const app = new Koa();
const router = new KoaRouter();

let users = [
    {id: 1, name: 'HaiZi'},
    {id: 2, name: 'zMouse'},
    {id: 3, name: 'xiaorui'},
    {id: 4, name: 'TM'},
    {id: 5, name: 'WeiGe'},
    {id: 6, name: 'XuanJie'}
];

/**
 * 如果后端的数据更新了，比如users数据变动了，那么前端（客户端）想要看到新的数据内容，需要重新发送一次请求，来拉取新的数据
 */
router.get('/', async ctx => {
    ctx.body = users;
});

app.use(router.routes());
app.listen(8888);