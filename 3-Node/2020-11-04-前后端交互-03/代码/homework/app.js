const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const KoaJwt = require('koa-jwt');
const KoaStaticCache = require('koa-static-cache');
const jsonwebtoken = require('jsonwebtoken');

const app = new Koa();
const router = new KoaRouter();

// 它只在服务端加密token等时候使用，不会通过网络传输（HTTP）
let key = 'kkb';

/**
 * jwt
 *   server(数据通过HMACSHA256等加密算法进行加密生成token)=>header(Authorization头发送给前端)=>client(存储token)
 */

app.use( KoaJwt({
    secret: key
}).unless({path: [/^\/(public|users|login)/]}) );

app.use( KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}) );

router.get('/users', async ctx => {
    ctx.body = 'users';
})

router.get('/contents', async ctx => {

    
    // 如果某个路由逻辑中，需要用到token中解密后的登陆用户信息
    ctx.body = [
        'html',
        'css',
        'javascript'
    ]

    
});

router.post('/login', KoaBody(), async ctx => {
    let {username, password} = ctx.request.body;
    // console.log('user', username, password);

    // 按照业务逻辑，这里需要做用户验证，如果验证通过，则表示登陆成功，返回登陆后的token
    let tokenString = jsonwebtoken.sign({
        username
    }, key);
    // console.log(tokenString);
    ctx.set('Authorization', tokenString);
    ctx.body = '登陆成功';
});

app.use( router.routes() );

app.listen(8888);