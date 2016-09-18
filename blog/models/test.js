var settings = require('../settings') , 
  MongoClient = require('mongodb').MongoClient;

var oneData = {title:"szy888" ,publishDate:"20160918"};

MongoClient.connect(settings.url, function(err, db) {
	if(err) return callback(err); //错误，返回 err 信息
	console.log("Connected correctly to server");
	var cols = db.collection('baseUnit');

	var r = db.collection('baseUnit').insertOne({oneData});
	if(r.insertedCount == 1) console.log("Inserted 1 document into collection...");

    cols.find({}).toArray(function(err,docs){
    	console.log(docs);
    });

    db.close();
});
