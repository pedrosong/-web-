const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const mysql2 = require('mysql2');
const parsePath = require('parse-filepath');
const KoaStaticCache = require('koa-static-cache');
const fs = require('fs');

const app = new Koa();
const router = new KoaRouter();

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 's0ngchenghao,',
    database: 'kkb'
})
// 静态代理
app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}));
app.use(KoaStaticCache('./attachments', {
    prefix: '/attachments',
    gzip: true,
    dynamic: true
}));
app.use(KoaStaticCache('./static/upload', {
    prefix: '/static/upload',
    gzip: true,
    dynamic: true
}));
// post请求,上传图片保存到./static/upload/目录下
router.post('/upload', KoaBody({
    multipart: true,
    formidable: {
        uploadDir: './static/upload/',
        keepExtensions: true
    }
}), async ctx => {
    let {
        attachment
    } = ctx.request.files;

    let fileInfo = parsePath(attachment.path);

    let filename = fileInfo.basename; //上传后存储到服务器上的文件信息
    let fileType = attachment.type;
    let fileSize = attachment.size;

    console.log('fileInfo', filename, fileType, fileSize);

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
    let rs = await query(
        "select `filename` from attachments"
    );
    ctx.body = rs;
    console.log(rs);
})

app.use(router.routes());


app.listen(8881, () => {
    console.log(`服务启动成功 http://localhost:8888`);
})

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