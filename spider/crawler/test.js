var Crawler = require("crawler");
var url = require('url');

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, result, $) {
        // $ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server
        $('a').each(function(index, a) {
            var toQueueUrl = $(a).attr('href');
            c.queue(toQueueUrl);
        });
    }
});

//c.queue('http://ynamp.com/news/');

// Queue URLs with custom callbacks & parameters
c.queue(
    [{
    uri: 'http://ynamp.com/news/',
    jQuery: true,

    // The global callback won't be called
    callback: function (error, result, $) {
        $('.listbox').find('a').each(function(index, a) {
            console.log($(a).attr('href'));
        });
    }
    }]
);