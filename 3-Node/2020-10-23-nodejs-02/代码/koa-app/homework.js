const Koa = require('koa');
const staticCache = require('koa-static-cache');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

app.use(staticCache("./public", {
    prefix: '/static',
    dynamic: true,
    gzip: true
}));
router.get('/quote', async (ctx, next) => {
    const quotes = [
        '虽然我个子矮，但我发际线高啊！',
        '有些事情做不完，就留到明天做吧。运气好的话，明天死了就不用做了。',
        '善良没用，你得漂亮。',
        '好好活下去 每天都有新打击。',
        '活着的时候把自己搞得好看一点，这样你就不会死得太难看。',
        '世上无难事 只要肯放弃。',
        '加油，你是最胖的！'
    ];
    content = quotes.sort(() => Math.random() - .5)[0];
    ctx.body = content;
});
app.use(router.routes());

app.listen(8888, () => {
    console.log('服务器启动成功：http://127.0.0.0.1:8888')
});