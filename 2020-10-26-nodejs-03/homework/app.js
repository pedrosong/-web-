const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('@koa/router');
const Mysql = require('mysql2');
const fs = require('fs');
const koaBody = require('koa-body');

// 连接数据库‘kkb’
const connection = Mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 's0ngchenghao,',
    database: 'kkb'
})
const app = new Koa();
const router = new KoaRouter();

app.use(KoaStaticCache('./public', {
    prefix: '/public',
    dynamic: true,
    gzip: true
}))
// 使用router.get渲染注册界面
router.get('/register', async ctx => {
    ctx.body = fs.readFileSync('./register.html', 'utf-8');
})
// 使用router.post处理注册信息，并提示是否注册成功
router.post('/register', koaBody(), async ctx => {
    let username = ctx.request.body.username;
    if (typeof (username) === 'string') {
        let rs = await query(
            "insert into `users` (`username`) values (?)", [username]
        );
        ctx.body = '注册成功';
    } else {
        ctx.body = '注册失败';
    }

})
app.use(router.routes());

// webserver服务器端口为8888
app.listen(8888, () => {
    console.log('服务器启动成功')
})

// 封装数据库查询指令
function query(sql, data) {
    return new Promise((resolve, reject) => {
        connection.query(sql, data, function (err, ...data) {
            if (err) {
                reject(err);
            } else {
                resolve(...data);
            }
        })
    });
}