const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const mysql2 = require('mysql2');
const parsePath = require('parse-filepath');
const KoaStaticCache = require('koa-static-cache');
const jwt = require('jsonwebtoken');

const app = new Koa();
const router = new KoaRouter();

const connection = mysql2.createConnection({
    user: 'root',
    password: '12345678',
    database: 'kkb'
});

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

router.post('/upload', KoaBody({
    multipart: true,
    formidable: {
        uploadDir: './static/upload',
        keepExtensions: true
    }
}), async ctx => {

    // 验证是否登陆
    let authorization = ctx.get('authorization');
    console.log('authorization', authorization);

    let token = jwt.verify(authorization, 'kkb');
    console.log('token', token);


    let {attachment} = ctx.request.files;

    let fileInfo = parsePath(attachment.path);

    let filename = fileInfo.basename;
    let fileType = attachment.type;
    let fileSize = attachment.size;


    // console.log('fileInfo', filename, fileType, fileSize);

    let rs = await query(
        "insert into `attachments` (`filename`, `type`, `size`) values (?, ?, ?)",
        [
            filename, fileType, fileSize
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

router.get('/getPhotos', async ctx => {
    // 从数据库获取上传后的所有图片数据，通过json格式返回给客户端
    // todos
    let rs = await query(
        // 作业中要求数据存储在 photos 表中，但是这里我就不去这么做，大家懂就可以了
        "select * from `attachments`"
    );
    // console.log('rs', rs);

    ctx.body = rs;
})

router.post('/login', KoaBody(), async ctx => {
    let {username, password} = ctx.request.body;

    // console.log('username, password', username, password);

    // 数据库验证过程

    const token = jwt.sign({
        name: username
    }, 'kkb', { expiresIn: '2h' });
    
    ctx.set('Authorization', token);
    ctx.body = '登陆成功';
});

app.use( router.routes() );


app.listen(8888, () => {
    console.log(`服务启动成功 http://localhost:8888`);
})

function query(sql, data) {
    return new Promise( ( resolve, reject) => {
        connection.query(
            sql,
            data,
            function(err, ...result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(...result);
                }
            }
        );
    } )
}