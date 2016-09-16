var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect('mongodb://localhost/test');

var testSchema = new mongoose.Schema({
    id: String,
    title: String,
    district: String,
    publishDate: Date
});


console.log("1");

var testModel = mongoose.model('test', testSchema);

var listData = [];

function testObj(id,title,district,publishDate){
	this.id = id;
	this.title = title;
	this.district = district;
	this.publishDate = Date.now();
}

console.log("2");

for(var i=0;i<100;i++){
	listData[i] = new testModel(testObj(i,"我是测试员#"+i.toString(),"昆明",null));
}

console.log("3");




//var tt = new testModel();

// Bulletin.findOne({'id': item.id},'title',function(err,finding_bul){ //其实这里的bul等于select id这个字段
//                         if(err) {
//                             console.log(err)
//                             return;
//                         }
//                         // 如果已存了这个公告则直接返回！
//                         if(finding_bul) return;
//                         // 数据库没存就存入mongoDB
//                         var bul = new Bulletin(item);
//                         bul.save(function(err){
//                             if(err) {
//                                 console.log(err);
//                             } else {
//                                 console.log("mongoose written 1 bulletin : ", item.title);
//                             }
//                         })
//                         //
//                     });