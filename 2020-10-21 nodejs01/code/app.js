const {
    readdirSync
} = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
    console.log("有人发送了请求");
    // console.log(req)
    res.write("<h1>hello</h1>");
    res.end();
});

server.listen(8787, () => {
    console.log('服务器启动成功：http://127.0.0.1:8787');

});