var settings = require('../settings') , 
  MongoClient = require('mongodb').MongoClient;

var oneData = {title:"szy888" ,publishDate:"20160918"};

MongoClient.connect(settings.url, function(err, db) {

	// if(err) return callback(err); //错误，返回 err 信息
	// console.log("Connected correctly to server");
	// var cols = db.collection('baseUnit');

	// var r = db.collection('baseUnit').insertOne({oneData});
	// if(r.insertedCount == 1) console.log("Inserted 1 document into collection...");

 //    cols.find({}).toArray(function(err,docs){
 //    	console.log(docs);
 //    });

 	//--------------------------------------------
 	// var cols = db.collection('baseUnit');
 	// cols.findOne({title:"test"},{fields:{"title":"0","publishDate":"1"}},function(err,doc){
 	// 	console.log(doc);
 	// });
  //   db.close();

  	var user = {
      name: "szy111",
      password: "szy239999",
      email: "szy@125.com"
  	};
    //   //读取 users 集合
    // var col = db.collection('users');
    // col.insertOne(user,{w:1},function(err,res){
    //   if(err) console.log('inserted err...');
    //   console.log(res);
    //   db.close();
    // });

    //读取 users 集合
    var col = db.collection('users');
    col.findOneAndUpdate({name:user.name}
      , {$set: {password: user.password}}
      , function(err, res){
        if(err) {console.log(err);}
        
        //没有该用户
        if(res.value == null) {
        	col.insertOne(user,{w:1},function(err,res){
        		if(err) console.log('inserted err...');
        		// 返回新增的
        		console.log(res);
        		db.close();

        	});
        }

        // 现在这个res是没修改前的
        // console.log(res);

        col.findOne({name:user.name},function(err,res){
        	console.log(res);
        })

        db.close();
      });

});
