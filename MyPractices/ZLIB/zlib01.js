//使用zlib用gzip压缩123.txt成gz格式压缩包
var zlib = require('zlib');
const zgip = zlib.createGzip();
const fs = require('fs');
const inp = fs.createReadStream('123.txt');
const out = fs.createWriteStream('123.txt.gz');

inp.pipe(zgip).pipe(out);
