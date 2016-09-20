var mongodb = require('./db');

var settings = require('../settings') , 
  MongoClient = require('mongodb').MongoClient;

function User(user) {
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
};

module.exports = User;

//存储用户信息
User.prototype.save = function(callback) {
  //要存入数据库的用户文档
  var user = {
      name: this.name,
      password: this.password,
      email: this.email
  };
  //打开数据库
  // mongodb.open(function (err, db) {
  //   if (err) {
  //     return callback(err);//错误，返回 err 信息
  //   }
  //   //读取 users 集合
  //   db.collection('users', function (err, collection) {
  //     if (err) {
  //       mongodb.close();
  //       return callback(err);//错误，返回 err 信息
  //     }
  //     //将用户数据插入 users 集合
  //     collection.insert(user, {
  //       safe: true
  //     }, function (err, user) {
  //       mongodb.close();
  //       if (err) {
  //         return callback(err);//错误，返回 err 信息
  //       }
  //       callback(null, user[0]);//成功！err 为 null，并返回存储后的用户文档
  //     });
  //   });
  // });

  MongoClient.connect(settings.url, function(err, db) {
    // if(err) return callback(err); //错误，返回 err 信息
    // console.log("Connected correctly to server");

    //读取 users 集合
    var col = db.collection('users');
    col.findOneAndUpdate({name:user.name}
      , {$set: {password: user.password}}
      , function(err, res){
          if(err) return callback(err);
          //没有该用户
          if(res.value == null) {
            col.insertOne(user,{w:1},function(err,res){
              if(err) return callback(err);
              // 返回新增的
              db.close();
              callback(null,res)         
            });

          //如果有该用户
          col.findOne({name:user.name},function(err,res){
            //返回修改后的该用户
            db.close();
            callback(null,res)
          })
          }
          db.close();         
        });

    // col.insertOne(user,{w:1},function(err,res){
    //   if(err) console.log('inserted err...');
    //   console.log('inserted:' + res.titel);
    //   db.close();
    // })
  });
};

//读取用户信息
User.get = function(name, callback) {
  MongoClient.connect(settings.url, function(err, db) {
    //读取 users 集合
    var col = db.collection('users');
    //以用户名来查找用户
    col.findOne({name},function(err,res){
      if(err) return callback(err);
      callback(null,res);
    });
  })};


// //打开数据库
  // mongodb.open(function (err, db) {
  //   if (err) {
  //     return callback(err);//错误，返回 err 信息
  //   }
  //   //读取 users 集合
  //   db.collection('users', function (err, collection) {
  //     if (err) {
  //       mongodb.close();
  //       return callback(err);//错误，返回 err 信息
  //     }
  //     //查找用户名（name键）值为 name 一个文档
  //     collection.findOne({
  //       name: name
  //     }, function (err, user) {
  //       mongodb.close();
  //       if (err) {
  //         return callback(err);//失败！返回 err 信息
  //       }
  //       callback(null, user);//成功！返回查询的用户信息
  //     });
  //   });
  // });