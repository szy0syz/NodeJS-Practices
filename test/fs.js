var fs = require('fs');
var zlib = require('zlib');
var path = require('path');
var unzip = require("unzip");

//fs.createReadStream('ormrpc.jar').pipe(unzip.Extract({ path: 'unarchive' }));

// const zgip = zlib.createGzip();

// const inp = fs.createReadStream('ormrpc.jar');
// const out = fs.createWriteStream('123.gz');

// inp.pipe(zgip).pipe(out);





function getFileList(path) {
	var filesList = [];
	readFile(path,filesList);
	return filesList;
}

function readFile(path,filesList) {
	files = fs.readdirSync(path); // Sync read
	files.forEach(walk);
	function walk(file) { 
		states = fs.statSync(path+'/'+file);   
		if(states.isDirectory()) {
			readFile(path+'/'+file,filesList);
		}
		else
		{ 
			//创建一个对象保存信息
			var obj = new Object();
			obj.size = states.size;//文件大小，以字节为单位
			obj.name = file;//文件名
			obj.path = path+'/'+file; //文件绝对路径
			filesList.push(obj);
		}  
 	}
}

var filesList = getFileList("C:/Users/Administrator/Documents/GitHub/NodeJS-Practices/test/data");

//console.log(filesList.length);


if(filesList.length<=0) {
	console.log("no files.");
}

filesList.forEach(function(item,index)
{
	console.log(item.path);
	fs.createReadStream(item.path)
	  .pipe(unzip.Parse())
	  .on('error',function(err){
	  	console.log('@@@@');
	  })
	  .on('entry', function (entry) {
	  	if(!entry){
	  		console.log("file is error.");
	  		return;
	  	}
	  	if(path.basename(entry.path) == 'MANIFEST.MF'){
	  		console.log(entry);
	  	}
	  	
    // var fileName = entry.path;
    // var type = entry.type; // 'Directory' or 'File'
    // var size = entry.size;
    // if (fileName === "this IS the file I'm looking for") {
    //   entry.pipe(fs.createWriteStream('output/path'));
    // } else {
    //   entry.autodrain();
    // }
  });
}
);
