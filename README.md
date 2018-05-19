`node index.js`

port: 8000

Slowing the request down with setTimeouts

Streams seem to have affected the setTimeout so I had to use different numbers


## index.html

Without streams, this will load the css after the html download is finished.

![No Streams](https://github.com/Askoth/learning-node-streams/raw/master/src/img/standard.png)

## index-stream.html

With streams, this will start delivering content as soon as possible and the css download starts the link tag is sent, before the exampe above.

![No Streams](https://github.com/Askoth/learning-node-streams/raw/master/src/img/streams.png)
