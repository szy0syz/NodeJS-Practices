var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect('mongodb://localhost/yngp');
var schema = new mongoose.Schema({
    id: String,
    title: String,
    district: String,
    publishDate: Date
});

var Bulletin = mongoose.model('bulletins', schema);



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