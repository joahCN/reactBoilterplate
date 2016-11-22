var express = require('express');
var fs = require("fs");
var path = require("path");
var Buffer = require('buffer').Buffer;
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
    let datas=Buffer.from("upload:");
    req.on("readable", ()=>{
        let chunk = req.read();
        if(chunk){
            datas = Buffer.concat([datas, chunk], chunk.length+datas.length);
        }
        // datas+=chunk;
    });
    req.on("end", ()=>{
        process.stdout.write(datas.toString());
        res.set({
            'Access-Control-Allow-Origin': '*'
        });
        res.send("success");
    });

    // res.set({
    //     'Access-Control-Allow-Origin': '*'
    // });
    // res.send("success");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});