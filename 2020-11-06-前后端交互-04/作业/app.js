const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaStaticCache = require('koa-static-cache');
const socketIo = require('socket.io');
const http = require('http');

const app = new Koa();
const router = new KoaRouter();

let users = [{
        id: 1,
        name: 'HaiZi'
    },
    {
        id: 2,
        name: 'zMouse'
    },
    {
        id: 3,
        name: 'xiaorui'
    },
    {
        id: 4,
        name: 'TM'
    },
    {
        id: 5,
        name: 'XuanJie'
    }
];

app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}));

// 创建一个 web socket 的 server
// socketIo => server.attach   http.createServer() => new http.Server()
// 这里的 app 是 Koa 对象，不是 http.Server
const server = http.createServer(app.callback()); // server => http.server => 代理了koa的http请求后的callback
const io = socketIo(server);
// 暗号：实时通信
io.on('connection', socket => {
    console.log(`有人通过 websocket 协议链接了`, socket.id);
    socket.on('data', data => {
        let time = new Date().toUTCString();
        let serverdata = {
            socketId: socket.id,
            value: data, //这个data就是前端传过来的input输入框的value值，有点绕
            time: time
        }
        socket.broadcast.emit('message', serverdata); //通过广播，将数据进行广播同步
        socket.emit("message", serverdata); //数据发给自己
    });
});


app.use(router.routes());

// 注意这里的app应该换成server
server.listen(8888);