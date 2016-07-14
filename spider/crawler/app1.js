var Crawler = require("crawler");
var url = require('url');

var c = new Crawler({
    maxConnections : 10,
    forceUTF8 : true //转换到utf8格式
});

var config = require('./config');


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
        	//console.log(item.title);
        	var assert = false;
        	filterString.forEach(function(filter,f_index){   
        		if(assert) {
                    //写入mongoDB

                    return;   
                }

        		if(item.title.search(filter) != -1){
        		console.log(item.title);
        		assert = true;}
        	})

        	
        });

    }
    }]
);

// http://www.yngp.com/bulletin_zz.do?method=showBulletin&bulletin_id=516af8c0.155d5b7c9a6.-725a