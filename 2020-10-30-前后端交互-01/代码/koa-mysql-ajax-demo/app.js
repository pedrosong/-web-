const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('@koa/router');
const mysql = require('mysql2');
const KoaBody = require('koa-body');
const cookie = require('cookie-parse');

/**
 * 后端不在关注页面渲染的问题
 *  只负责返回数据（纯数据）
 *  渲染的工作由客户端（浏览器）在请求到纯数据以后，通过js的dom操作来更新页面
 *  数据的请求不再通过浏览器本身来完成，而是通过js来发送请求，数据也是返回给来js
 */

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'kkb_12'
});

const app = new Koa();

app.keys = ['kkb', '123'];

app.use(KoaStaticCache('./public', {
    prefix: '/public',
    dynamic: true,
    gzip: true
}));

const router = new KoaRouter();

// 商品首页
router.get('/', getCategories, async ctx => {

    let [{count}] = await query(
        'select count(*) as count from `items`',
    );

    let page = Number(ctx.query.page) || 1;
    let prepage = 4;
    let start = (page - 1) * prepage;
    
    let pages = Math.ceil(count / prepage);

    let data = await query(
        'select * from `items` limit ? offset ?',
        [
            prepage,
            start
        ]
    );

    // 如果body赋了一个对象的值，那么koa会自动的把这个对象转成json，并设置头信息为：application/json
    // ctx.body = {
    //     categories: ctx.state.categories,
    //     data,
    //     page,
    //     pages
    // };

    return new Promise((resolve) => {
        setTimeout(() => {
            ctx.body = {
                categories: ctx.state.categories,
                data,
                page,
                pages
            };
            resolve();
        }, 1000);
    });
});


app.use(router.routes());

app.listen(8888, () => {
    console.log(`服务启动成功：http://localhost:8888`);
});


async function getCategories(ctx, next) {
    ctx.state.categories = await query(
        'select * from `categories`'
    );
    await next();
}


function query(sql, data) {
    return new Promise( (resolve, reject) => {
        connection.query(sql, data, function(err, ...data) {
            if (err) {
                reject(err);
            } else {
                resolve(...data);
            }
        })
    } );
}