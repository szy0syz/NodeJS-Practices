var fs = require('fs');

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

var filesList = getFileList("D:/123");

console.log(filesList.length);