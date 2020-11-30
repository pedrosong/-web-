const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const fs = require('fs');
const mysql2 = require('mysql2');
const parsePath = require('parse-filepath');

const app = new Koa();
const router = new KoaRouter();

const connection = mysql2.createConnection({
    user: 'root',
    password: '12345678',
    database: 'kkb'
});

router.get('/upload', async ctx => {
    ctx.body = fs.readFileSync('./template/upload.html').toString();
});

router.post('/upload', KoaBody({
    multipart: true,
    formidable: {
        uploadDir: './attachments',
        keepExtensions: true
    }
}), async ctx => {

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
        ctx.body = '上传成功';
    }

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