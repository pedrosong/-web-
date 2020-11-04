const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const http = require('http');
const koaServerHttpProxy = require('koa-server-http-proxy');

const app = new Koa();
const router = new KoaRouter();

app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}))

// 我们服务器一般会有自己的请求资源的情况
// 又或者，我们需要代理的目标对象有多个
app.use(koaServerHttpProxy('/api', {
    target: 'http://localhost:8881',
    // 把委托的url中不需要的部分给去掉
    pathRewrite: { 
        '^/api': ''
    }
}));

router.get('/tencent', async ctx => {
    // ctx.body = '腾讯';

    // 做这个请求中做代理请求的转发工作
    ctx.body = await getTencent();
})

app.use(router.routes());

app.listen(8882);


function getTencent() {
    return new Promise((resolve, reject) => {
        const options = {
            protocol: 'http:',
            hostname: 'localhost',
            port: 8881,
            path: '/pony',
            method: 'GET'
        };
        const req = http.request(options, res => {
            res.setEncoding('utf8');
            let responseData = '';
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
                responseData += chunk.toString();
            });
            res.on('end', () => {
                console.log('No more data in response.');
                resolve(responseData);
            });
        });
        req.write('');
        req.end();
    });
}