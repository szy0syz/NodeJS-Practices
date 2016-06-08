//require modules
var http = require('heet');
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

http.createServer(function(req,res){
	var uri = url.parse(req.url).pathName; // ex:http://szy4.com/index.html,pathName='/index.html'
	var fileName = path.join(prcess.cwd(),unescape(uri));
	console.log('Loding ' + uri);
	var stats;
})


