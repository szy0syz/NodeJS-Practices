var Crawler = require("crawler");
var url = require('url');

var c = new Crawler({
    maxConnections : 10
});

// http://www.yngp.com/login.do?method=gotoCGGG
// http://www.yngp.com/bulletin.do?method=moreList

// Queue URLs with custom callbacks & parameters
c.queue(
    [{ 
    //uri: 'http://www.yngp.com/login.do?method=gotoCGGG',
    uri: 'http://www.yngp.com/bulletin.do?method=moreList',
    jQuery: true,
    method: 'POST',
    form: {key: 'value0', key2: 'value1'},
    // The global callback won't be called
    callback: function (error, result, $) {
        // $('iframe').each(function(index, f) {
        //     console.log($(f).attr('src'));
        // });

        console.log('Body:\n', result.body);
    }
    }]
);

// http://www.yngp.com/bulletin.do?method=moreList&sign=0&disricetCode=all

//post text view
//ec_i=bulletinstable&bulletinstable_efn=&bulletinstable_crd=20&bulletinstable_p=1&bulletinstable_s_bulletintitle=&bulletinstable_s_codeName=&bulletinstable_s_finishday=&query_sign=1&listSign=1&findAjaxZoneAtClient=false&query_bulletintitle=&sign=0&disricetCode=all&flag=1&query_endTime=&query_startTime=&method=moreList&method=moreList&bulletinstable_totalpages=0&bulletinstable_totalrows=&bulletinstable_pg=1&bulletinstable_rd=20&districtCode=all