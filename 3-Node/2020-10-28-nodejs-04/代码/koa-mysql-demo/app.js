const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('@koa/router');
const Nunjucks = require('nunjucks');
const mysql = require('mysql2');
const KoaBody = require('koa-body');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'kkb_12'
});

const app = new Koa();

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
    // ctx.params => 对象，是 router 中间件根据当前url解析后的数据，里面存储了路由中动态部分当前实际内容
    // console.log('ctx', ctx.params);
    let id = Number(ctx.params.id);

    let [item] = await query(
        'select * from `items` where `id`=?',
        [id]
    );
    // console.log('item', item);

    ctx.body = Nunjucks.render('item.html', {
        categories: ctx.state.categories,
        item
    });
});

// 渲染表单页面
router.get('/additem', getCategories, async ctx => {
    // let categories = await query(
    //     'select * from `categories`'
    // );

    ctx.body = Nunjucks.render('additem.html', {
        categories: ctx.state.categories
    });
});

// 处理提交数据请求
let addItemKoaBodyOptions = {
    // 能解析multipart格式提交过来的普通文本型数据，二进制数据不在这里设置
    multipart: true,
    // 设置处理二进制流数据，formidable使用了第三方库：https://github.com/node-formidable/formidable，通过这个库可以实现对文件的解析和保存处理
    formidable: {
        // 解析后的文件数据存储的路径
        uploadDir: './public/items/images',
        // 是否保存上传后的文件扩展名
        keepExtensions: true
    }
};
router.post('/additem', KoaBody(addItemKoaBodyOptions), async ctx => {

    // console.log('headers', ctx.headers);
    
    // let {category_id: categoryId, name, price, cover} = ctx.request.body;

    let {category_id: categoryId, name, price} = ctx.request.body;

    // multipart 提交的数据，普通文本数据存储在 ctx.request.body 中
    // multipart 提交的二进制数据，是存储在 ctx.request.files 中
    let coverObject = ctx.request.files.cover;    // cover 里面存储的每一个文件的 File 对象

    // 我们数据库中存储的是上传后的文件名称，而不是原始的文件名
    let lastIndexPoint = coverObject.path.lastIndexOf('/');
    
    let cover = coverObject.path.substring(lastIndexPoint + 1);

    // console.log(categoryId, name, price, cover);
    
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
        // ctx.body = Nunjucks.render('message.html', {
        //     categories: ctx.state.categories,
        //     message: '两次输入密码不一致'
        // });
    }
    // 去数据库中查询当前注册用户名是否已经存在了
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

    // 去数据库中查询当前注册用户名是否已经存在了
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

    
    ctx.body = '登录成功';
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