const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    let url = req.urll;
    let content = " ";
    if (url.includes('.ico')) {
        res.end('');
    } else {
        if (url.startsWith('/public')) {
            let filePath = '.' + url;
            res.writeHead(200, 'ok', {
                'content-type': 'text/html; charset=utf-8'
            })
            content = fs.readFileSync(filePath);
            res.end(content);
        } else {
            if (url === '/quote') {
                res.writeHead(200, 'ok', {
                    'content-type': 'text/html; charset=utf-8'
                });
                res.end(new Quote().toString())
            }
        }
    }
})

server.listen(8888, () => {
    console.log('服务器启动成功：http://localhost:8888')
})

function Quote() {
    let quote = [
        '11111111',
        '22222222',
        '33333333'
    ];
    let n = Math.floor(Math.random() * quote.length);
    return alert(quote[n]);
}