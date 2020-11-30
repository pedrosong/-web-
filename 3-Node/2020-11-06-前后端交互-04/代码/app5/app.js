const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaStaticCache = require('koa-static-cache');
const socketIo = require('socket.io');
const http = require('http');

const app = new Koa();
const router = new KoaRouter();

let users = [
    {id: 1, name: 'HaiZi'},
    {id: 2, name: 'zMouse'},
    {id: 3, name: 'xiaorui'},
    {id: 4, name: 'TM'},
    {id: 5, name: 'XuanJie'}
];

app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}));

// 创建一个 web socket 的 server
// socketIo => server.attach   http.createServer() => new http.Server()
// 这里的 app 是 Koa 对象，不是 http.Server
const server = http.createServer(app.callback());   // server => http.server => 代理了koa的http请求后的callback
const io = socketIo(server);

io.on('connection', socket => { 
    console.log(`有人通过 websocket 协议链接了`, socket.id);

    // 数据都是通过 socket 对象来进行交互的，一个 socket 表示一个链接
    // socket.emit 发送给当前socket
    socket.emit('hello', '欢迎你的到来');

    socket.on('data', data => {
        console.log('data', data);

        // socket.broadcast 除了当前socket以外的其它socket对象
        socket.broadcast.emit('message', {
            socketId: socket.id,
            value: data
        });

        // 如果要发消息发送给其它人，也包括自己的话：
        // socket.emit('message', data);
    });

    
});

app.use(router.routes());

// 注意这里的app应该换成server
server.listen(8888);