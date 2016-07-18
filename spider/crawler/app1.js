var Crawler = require("crawler");
var url = require('url');
var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect('mongodb://szy0syz:afjwdbxp@localhost/yngp');
var schema = new mongoose.Schema({
    id: String,
    title: String,
    district: String,
    publishDate: Date
});

var Bulletin = mongoose.model('bulletins', schema);

var c = new Crawler({
    maxConnections : 10,
    forceUTF8 : true //转换到utf8格式
});




// Queue URLs with custom callbacks & parameters
c.queue(
    [{ 
    uri: config.uri, //每次get请求有20条公告消息
    jQuery: true,

    // The global callback won't be called
    callback: function (error, result, $) {
    	var resList = [];
        $('#bulletinstable_table_body').find('tr').each(function(index,tr){
        	var result = new Object();
        	$(tr).find('td').each(function(index,td){
        		if(index == 0){
        			$(td).find('font').each(function(index,font){
        				//console.log($(font).attr('title'),'\n',$(font).attr('value'),'\n');
        				result.title = $(font).attr('title');
        				result.id = $(font).attr('value');
        			});
        		}
        		if(index == 1){
        			result.district = $(td).html();
        			//console.log($(td).html());
        		}
        		if(index == 2){
        			result.publishDate = $(td).html();
        			//console.log($(td).html());
        		}
        	});
        	//console.log(result);
        	resList.push(result) 
        });
        //console.log('Body:\n', result.body);

        // filting   如果可以写入mongoDB
        resList.forEach(function(item,index){
        	var assert = false;
            // 循环过滤字符串数组中的字符串，只要包含其中一个字符串就assert:true
        	config.filterString.forEach(function(filter,f_index){   
        		if(assert) {
                    // 处理完后直接跳出该item的title循环检查，指向下一个。
                    return;   
                }
                // 检查tile是否包含关键字
        		if(item.title.search(filter) != -1){
        		console.log(item.title);
        		assert = true; // 设置跳过这个item的检查
                ////
                //写入mongoDB
                    Bulletin.findOne({'id': item.id},'title',function(err,finding_bul){ //其实这里的bul等于select id这个字段
                        if(err) {
                            console.log(err)
                            return;
                        }
                        // 如果已存了这个公告则直接返回！
                        if(finding_bul) return;
                        // 数据库没存就存入mongoDB
                        var bul = new Bulletin(item);
                        bul.save(function(err){
                            if(err) {
                                console.log(err);
                            } else {
                                console.log("mongoose written 1 bulletin : ", item.title);
                            }
                        })
                        //
                    });
                ////
                }
        	})

        	
        });

    }
    }]
);

// http://www.yngp.com/bulletin_zz.do?method=showBulletin&bulletin_id=516af8c0.155d5b7c9a6.-725a
// 优化查询完后为什么不退出，占用磁盘读写的问题！！！
// 研究闭关mongoDB链接的问题
// 研究crawler的细节问题，如执行后退出问题。