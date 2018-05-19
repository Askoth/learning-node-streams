const fs = require('fs');
const server = require('http').createServer();
const { Readable } = require('stream');

let timer = 2000;
let timerOutsideStream = 14000; // for some reason in my machine the stream with setimeout is slower

server.on('request', (req, res) => {
    console.log(`[URL]: ${req.url}`);

    let urlRouter = {
        '/index.html': () => {
            fs.readFile('./src/index.html', (err, data) => {
                if (err) throw err;

                setTimeout(() => {
                    res.end(data)
                }, timerOutsideStream)
            });
        },
        '/index-stream.html': () => {
            fs.readFile('./src/index.html', (err, data) => {
                if (err) throw err;

                const htmlArr = data.toString().split('\n').filter((a) => {return a.length});

                const timerRatio = timer / htmlArr.length;
                let count = 0;

                // console.log('[HTML]', htmlArr)

                const inStream = new Readable({
                    read () {
                        const item = htmlArr[count];
                        const isLast = htmlArr.length - 2 < count;
                        const timer = parseInt(count*timerRatio);

                        setTimeout(() => {
                            console.log(item)
                            this.push(item);
                            if (isLast) {
                                this.push(null)
                            }
                        }, timer)

                        count++;
                    }
                });

                inStream.pipe(res);

            });
        },
        '/main.css': () => {
            fs.readFile('./src/main.css', (err, data) => {
                if (err) throw err;

                res.end(data)
            });
        },
        'default': () => {
            res.end('');
        },
    };

    (urlRouter[req.url] || urlRouter.default)();
});

server.listen(8000);
