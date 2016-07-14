var Crawler = require("crawler");
var url = require('url');

var c = new Crawler({
    maxConnections : 10,
    forceUTF8 : true //转换到utf8格式
});

var filterString = ['医院','福贡'];

// Queue URLs with custom callbacks & parameters
c.queue(
    [{ 
    uri: 'http://www.yngp.com/bulletin.do?method=moreList&sign=0&districtCode=all', //每次get请求有20条公告消息
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
        				result.value = $(font).attr('value');
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

        //console.log(resList);
        resList.forEach(function(item,index){
        	//console.log(item.title);
        	var assert = false;
        	filterString.forEach(function(filter,index){   
        		if(assert) return;   		
        		if(item.title.search(filter) != -1){
        		console.log(item.title);
        		assert = true;}
        	})

        	
        });

    }
    }]
);