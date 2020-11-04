const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('@koa/router');
const mysql = require('mysql2');
const KoaBody = require('koa-body');
const fs = require('fs');

const app = new Koa();
const router = new KoaRouter();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 's0ngchenghao,',
    database: 'kkb'
})
app.use(KoaStaticCache('./public', {
    prefix: './public',
    dynamic: true,
    gzip: true
}))
router.get('/upload', KoaBody(), async ctx => {
    // ctx.body = fs.readFileSync('./public/upload.html','utf-8');
    ctx.body = fs.readFileSync('./public/upload.html', 'utf-8');
})
let addItemKoaBodyOptions = {
    multipart: true,
    formidable: {
        uploadDir: './attachments',
        keepExtensions: true
    }
};
router.post('/upload', KoaBody(addItemKoaBodyOptions), async ctx => {
    let fileObject = ctx.request.files.uploadFile;
    let filename = fileObject.name;
    let type = fileObject.type;
    let size = fileObject.size;
    if (size != 0 && filename != " ") {
        let rs = await query(
            "insert into `attachments` (`filename`,`type`,`size`) values (?,?,?)",
            [
                filename,
                type,
                size
            ]
        );
        ctx.body = '上传成功';
    } else {
        ctx.body = '上传失败';
    }
})

app.use(router.routes());
app.listen(8888, () => {
    console.log('服务器启动成功');
})

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