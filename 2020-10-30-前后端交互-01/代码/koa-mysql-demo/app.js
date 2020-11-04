const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('@koa/router');
const Nunjucks = require('nunjucks');
const mysql = require('mysql2');
const KoaBody = require('koa-body');
const cookie = require('cookie-parse');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'kkb_12'
});

const app = new Koa();

app.keys = ['kkb', '123'];

Nunjucks.configure('./template', {
    noCache: true,
    watch: true
});

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
    // console.log('count', count);

    let page = Number(ctx.query.page) || 1;
    let prepage = 4;
    let start = (page - 1) * prepage;
    // let end = start + prepage;
    let pages = Math.ceil(count / prepage);

    let data = await query(
        'select * from `items` limit ? offset ?',
        [
            prepage,
            start
        ]
    );

    ctx.body = Nunjucks.render('index.html', {
        categories: ctx.state.categories,
        data,
        page,
        pages
    });
});


router.get('/item/:id(\\d+)', getCategories, async ctx => {
    let id = Number(ctx.params.id);

    let [item] = await query(
        'select * from `items` where `id`=?',
        [id]
    );

    ctx.body = Nunjucks.render('item.html', {
        categories: ctx.state.categories,
        item
    });
});


router.get('/additem', getCategories, async ctx => {

    // console.log('cookie', ctx.cookies.get('userInfo'));
    let loginUserInfo = {};
    if (ctx.cookies.get('userInfo')) {
        loginUserInfo = JSON.parse(ctx.cookies.get('userInfo'));
    }
    // console.log('loginUserInfo', loginUserInfo);

    if (loginUserInfo.id === undefined) {
        return ctx.body = '请先登陆';
    }
    

    ctx.body = Nunjucks.render('additem.html', {
        categories: ctx.state.categories
    });
});

// 处理提交数据请求
let addItemKoaBodyOptions = {

    multipart: true,

    formidable: {

        uploadDir: './public/items/images',

        keepExtensions: true
    }
};
router.post('/additem', KoaBody(addItemKoaBodyOptions), async ctx => {

    let {category_id: categoryId, name, price} = ctx.request.body;

    let coverObject = ctx.request.files.cover;  

    let lastIndexPoint = coverObject.path.lastIndexOf('/');
    
    let cover = coverObject.path.substring(lastIndexPoint + 1);
    
    let rs = await query(
        "insert into `items` (`category_id`, `name`, `price`, `cover`) values (?, ?, ?, ?)",
        [
            categoryId,
            name,
            price,
            cover
        ]
    );

    ctx.body = '添加成功';
});

// 注册页面
router.get('/register', getCategories, async ctx => {
    
    
    ctx.body = Nunjucks.render('register.html', {
        categories: ctx.state.categories
    });
});

router.post('/register', getCategories, KoaBody(), async ctx => {
    let {username, password, repassword}  = ctx.request.body;

    if (!username || !password) {
        return ctx.body = '用户名和密码必须填写';
    }

    if (password !== repassword) {
        return ctx.body = '两次输入密码不一致';
    }

    let user = await query(
        "select * from `users` where `username`=?",
        [username]
    );

    if (user.length) {
        return ctx.body = '该用户名已经被注册了';
    }

    let rs = await query(
        "insert into `users` (`username`, `password`) values (?, ?)",
        [
            username,
            password
        ]
    )
    
    ctx.body = '注册成功';
});

// 登录页面
router.get('/login', getCategories, async ctx => {
    
    
    ctx.body = Nunjucks.render('login.html', {
        categories: ctx.state.categories
    });
});

router.post('/login', KoaBody(), async ctx => {
    let {username, password}  = ctx.request.body;

    if (!username || !password) {
        return ctx.body = '用户名和密码必须填写';
    }

    let [user] = await query(
        "select * from `users` where `username`=?",
        [username]
    );

    if (!user) {
        return ctx.body = '该用户不存在';
    }

    if (user.password !== password) {
        return ctx.body = '密码错误';
    }

    // http: 无状态协议，每一次请求没有任何关联
    // 除了一些必要的数据以外，服务端可以把当前用户的一些能过标识他的身份相关数据的信息发送给客户端
    let userInfo = {
        id: user.id,
        username: user.username
    }
    // 这种身份信息是为了标识用户身份的一种额外信息
    // ctx.body = '登录成功';

    // cookie：存储用户数据的一个字段，通过头信息来进行传输的
    // set-cookie：服务端用来传输给客户端cookie信息的一个字段
    // 每一个cookie都是通过 key=value 的形式发送给客户端
    // 当客户端接收响应的时候，如果发现头信息中有 set-cookie 这个字段，那么就对它的值进行解析，并存储值客户端（浏览器）本地
    // 客户端每次请求的时候，会自动的去查询客户端本地与当前请求相关域（域名）下是否存储有cookie相关的一些数据，如果有，则自动会把这个数据通过 cookie 头发送给服务器
    // ctx.set('set-cookie', 'userInfo=' + JSON.stringify(userInfo));

    ctx.cookies.set('userInfo', JSON.stringify(userInfo), { signed: true });

    ctx.body = `登陆成功`;
})


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