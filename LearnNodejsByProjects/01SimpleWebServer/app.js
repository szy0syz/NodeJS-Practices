//require modules
var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');

//Array of Mime Types
var mimeTypes = {
	"html":"text/html",
	"jpeg":"image/jpeg",
	"jpe":"image/jpeg",
	"png":"image/png",
	"js":"text/javascript",
	"css":"text/css"
};

var server = http.createServer(function(req,res){
	var uri = url.parse(req.url).pathname; // ex:http://szy4.com/index.html,pathname='/index.html'
	//process.cwd() = return the current working directory of the process.
	//Note: Do not use unescape to decode URIs, use decodeURI instead.
	//var fileName = path.join(prcess.cwd(),unescape(uri));
	var fileName = path.join(process.cwd(),decodeURI(uri));
	console.log('Loding: ' + uri);
	var stats;

	try{
		stats = fs.lstatSync(fileName); //放入文件的绝路路径
	} catch (e) {
		res.writeHead(404,{'Content-type':'text/plain'});
		res.write('<h1>404 Not Found</h1>');
		res.end();
		return;
	}

	// Check if file/directory
	if(stats.isFile()){              //LowwerCase
		var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
		//写res的相应报表头
		res.writeHead(200,{'Content-type':mimeType});
		var fileStream = fs.createReadStream(fileName);
		fileStream.pipe(res);
	}else if(stats.isDirectory()){
		//http 302 重定向 index.html
		res.writeHead(302,{'Loaction' : 'index.html'});
		res.end();
	}else{
		res.writeHead(500,{'Content-type':'text/plain'});
		res.write('500 Internal Error \n');
		res.end();
	}
});

server.listen(3000);
console.log('server running on %j',3000);



