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

app.use( KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}) );

router.get('/contents', async ctx => {
    // 这里是返回的数据内容，比如练习要求大家返回的所有图片的地址
    // 如果业务要求这组数据必须是有权限的用户才能看
    // 访问该接口的时候，把能够标识用户身份的数据发送过来
    // 我们这里使用 jwt ，在登陆的时候，返回给前端存储起来的tokenString

    let tokenString = ctx.get('Authorization');
    // 鉴别token是否合法，是不是后端在前端登陆验证通过以后发送的token
    let user = {};
    if (tokenString) {
        try {
            user = jsonwebtoken.verify(tokenString, key);
        } catch(e) {
            ctx.status = 403;
            ctx.body = '你还没有登陆';
            return;
        }
    }
    if (!user) {
        ctx.status = 403;
        ctx.body = '你还没有登陆';
    } else {
        ctx.body = [
            'html',
            'css',
            'javascript'
        ]
    }

    
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