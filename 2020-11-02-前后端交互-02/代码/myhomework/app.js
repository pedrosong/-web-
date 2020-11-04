const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const mysql2 = require('mysql2');
const parsePath = require('parse-filepath');
const KoaStaticCache = require('koa-static-cache');
const jwt = require('koa-jwt');
const jsonwebtoken = require('jsonwebtoken');


const app = new Koa();
const router = new KoaRouter();
// 连接数据库
const connection = mysql2.createConnection({
    user: 'root',
    password: 's0ngchenghao,',
    database: 'kkb',
    host: 'localhost'
});
// 静态资源代理
app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}));
app.use(KoaStaticCache('./static', {
    prefix: '/static',
    gzip: true,
    dynamic: true
}));


// 上传/upload接口的post请求
router.post('/upload', KoaBody({
    multipart: true,
    formidable: {
        uploadDir: './static/upload',
        keepExtensions: true
    }
}), async ctx => {

    // 验证是否登陆
    // let authorization = ctx.get('authorization');
    // console.log('authorization', authorization);

    // let token = jwt.verify(authorization, 'kkb');
    // console.log('token', token);
    // 以上的解析数据过程koa-jwt内部实现了


    console.log('token', ctx.state.user);


    let {
        attachment
    } = ctx.request.files;

    let fileInfo = parsePath(attachment.path);

    let filename = fileInfo.basename;
    let fileType = attachment.type;
    let fileSize = attachment.size;
    let uid = ctx.state.user._id;


    // console.log('fileInfo', filename, fileType, fileSize);

    // todos
    let rs = await query(
        "insert into `attachments` (`filename`, `type`, `size`, `uid`) values (?, ?, ?,?)",
        [
            filename, fileType, fileSize, uid
        ]
    );

    if (rs.affectedRows < 1) {
        ctx.body = '上传失败';
    } else {
        ctx.body = {
            filename
        };
    }

});

// 除/public /static 和 /login 接口下的资源，其他都需要jwt鉴权
const secret = 'kkb';
app.use(jwt({
    secret
}).unless({
    path: [/^\/(public|static|login)/]
}));
// 查看所有图片/getPhotos接口的get请求 => 核查UID和token，根据核对结果显示对应的图片或401
router.get('/getPhotos', async ctx => {
    // let [rs] = await query(
    //     "select `filename` from `attachments` where 'uid' = ? ",
    //     [ctx.state.user._id]
    // );
    if (ctx.state.user) {
        let [rs] = await query(
            "select `filename` from attachments ",
        );
        console.log(ctx.state.user._id);
        console.log('rs', rs);
        ctx.body = rs;
    } else {
        ctx.state = 401;
    }

})

// 登陆/login接口的post请求 => 验证用户名和密码，成功后创建并返回token
router.post('/login', KoaBody(), async ctx => {
    let {
        username,
        password
    } = ctx.request.body;
    let [user] = await query(
        "select * from `users` where `username` = ? ",
        [username]
    )
    if (!username || !password) {
        return ctx.body = '用户名和密码必须填写';
    } else if (!user) {
        return ctx.body = '用户名不存在';
    } else if (user.password !== password) {
        return ctx.body = '密码错误';
    } else {
        // await setToken(user.username, user.id);
        const token = jsonwebtoken.sign({
            username: user.username,
            _id: user.id
        }, 'kkb', {
            expiresIn: '2h'
        })
        ctx.set('Authorization', token);
        ctx.body = '登陆成功';
    }
});



// router.routes中间件
app.use(router.routes());
// 创建8888端口的webserver
app.listen(8888)



















function query(sql, data) {
    return new Promise((resolve, reject) => {
        connection.query(
            sql,
            data,
            function (err, ...result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(...result);
                }
            }
        );
    })
}