var express = require('express');
var fs = require("fs");
var path = require("path");
var Buffer = require('buffer').Buffer;
const StringDecoder = require('string_decoder').StringDecoder;

var app = express();

// app.use(express.static());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/config/:name', function (req, res) {

    var options = {
        root: __dirname + '/config/',
        headers: {
            "Content-Type": 'arraybuffer'
        }
    };
    var fileName = req.params.name;
    let dataBuf;
    fs.readFile(path.resolve(__dirname, 'config/', fileName), (err, datas)=>{
        if(err) {
            console.log(err);
        } else {
            dataBuf = Buffer.from(datas);
            res.set({
                'Content-Type': 'arraybuffer',
                'Access-Control-Allow-Origin': '*',
                'Content-Length': datas.length
            });
            res.send(datas);
        }

    });
});

app.post('/upload', (req, res) => {
    let datas= null;
    let writeStream = null;
    let uploadFileName = null;
    let boundary = null;
    const decoder = new StringDecoder('utf8');

    req.on("readable", ()=>{
        let chunk = req.read();
        if(!chunk) {
            return;
        }
        if(!writeStream) {
            if(!datas) {
                datas = Buffer.from(chunk);
            } else {
                datas = Buffer.concat([datas, chunk]);
            }
            let str = decoder.write(datas);
            if(str.indexOf("\r\n\r\n")) {
                uploadFileName = str.match(/filename="(.*)"/)[1];

                let fileName = path.resolve(__dirname, "temp/", uploadFileName);
                let fd = fs.openSync(fileName, "a+");
                writeStream = fs.createWriteStream(fileName, {
                    fd: fd
                });

                boundary = str.split("\r\n")[0];

                writeStream.write(Buffer.from(str.split("\r\n\r\n")[1]));

            }
        } else {
            let str = decoder.write(chunk);
            if(str.indexOf(boundary)>0) {
                writeStream.write(Buffer.from(str.split(boundary)[0]));
            } else {
                writeStream.write(chunk);
            }
        }
    });
    req.on("end", ()=>{
        writeStream.end();
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'content-type'
        });
        res.send("success");
    });
});

//for cross domain preflight request
app.options('/upload', (req, res)=>{
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'content-type'
    });
    res.send('');
});

app.post('/login', (req, res) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'content-type'
    });
    res.json({status: 'success'});
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});