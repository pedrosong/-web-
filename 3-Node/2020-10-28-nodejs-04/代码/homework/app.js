const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const fs = require('fs');
const mysql = require('mysql2');

const app  = new Koa();

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '12345678',
    database: 'kkb'
});


const router = new KoaRouter();

router.get('/register', async ctx => {
    ctx.body = fs.readFileSync('./template/register.html').toString();
});

router.post('/register', KoaBody(), async ctx => {
    // console.log('body', ctx.request.body);
    let username = ctx.request.body.username;

    if (!username) {
        return 
    }

    let rs = await query(
        "insert into `users` (`username`) values (?)",
        [
            username
        ]
    );

    // console.log('rs', rs);
    if (rs.affectedRows === 0) {
        ctx.body = '注册失败';
    } else {
        ctx.body = '注册成功';
    }

});

app.use( router.routes() );

app.listen(8888);


function query(sql, data) {
    return new Promise( (resolve, reject) => {
        connection.query(
            sql,
            data,
            function(err, ...args) {
                if (err) {
                    reject(err);
                } else {
                    resolve(...args);
                }
            }
        )
    } );
}