var express = require('express');
var router = express.Router();

var crypto = require('crypto'),
    User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'szy_blog' });
});

router.get('/reg', function(req, res, next) {
  res.render('reg', { title: 'Reg' });
});

router.post('/reg', function(req, res, next) {
  console.log('post~~');
  var uname = req.body.name,
      password = req.body.password,
      password_re = req.body['password-repeat'];
  //检验用户两次输入的密码是否一致
  if (password_re != password) {
    req.flash('error', '两次输入的密码不一致!'); 
    res.redirect('/reg');//返回注册页
  } else {

    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');

    //检查用户名是否已经存在 
    User.get(uname, function (err, user) {
      console.log('get,coming!');
      console.log("user__:" + user);
      if (err) {
        req.flash('error', err);
        res.redirect('/');
      }
      else if (user) {
        req.flash('error', '用户已存在!');
        res.redirect('/reg');//返回注册页
      } else {
        console.log('else~~~');
        //如果不存在则新增用户
        // User.uname = req.body.name;
        // User.password = req.body.password;
        // User.email = req.body.email;
        // console.dir(User);
        User.save(function(err,user){
          console.log("user**__:" + user);
          req.session.user = user;
          req.flash('success', '注册成功了!');
          res.redirect("/");
        });
        
        // newUser.save(function (callback) {
        //   console.log('newUser_');
        //   console.log(user);
        //   //req.session.user = user;//用户信息存入 session (old code,err~~~~~) 如何存session研究
        //   req.flash('success', '注册成功了!');
        //   console.log(res.redirect);
        //   //res.redirect('/');//注册成功后返回主页
        //   res.render('index', { title: user });
        //   // if (err) {
        //   //   req.flash('error', err);
        //   //   res.redirect('/reg');//注册失败返回主册页
        //   // } else {
        //   //   console.log('-----ss------' + Date.now());
        //   //   console.log(user.insertedCount); //为什么要执行两次？
        //   //   console.log('-----ss------' + Date.now());
        //   //   req.session.user = user;//用户信息存入 session (old code,err~~~~~) 如何存session研究
        //   //   req.flash('success', '注册成功了!');
        //   //   // res.render('index', { title: req.flash('success') });
        //   //   // res.render('index', { title: user });

        //   //   res.redirect('/');//注册成功后返回主页
        //   // }
        // }); 
      };

      })
      

  }
  

});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/login', function(req, res, next) {
  
});

router.get('/logout', function(req, res, next) {
  
});

router.get('/flash', function(req, res, next) {
  req.flash('info', 'Flash is back!' + "__" + Date.now());
  res.redirect('/test');
});

router.get('/test', function(req, res, next) {
  res.render('index', { title: req.flash('info') });
});

module.exports = router;
