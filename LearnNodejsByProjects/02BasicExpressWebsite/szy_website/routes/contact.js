var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'contact' });
});

router.post('/',function(req,res,next){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth:{
			user: 'szy0syz@gmail.com',
			pass: '7y7szy7?'
		}
	});

	mailOptions = {
		from: 'szyQQ <185505508@qq.com>',
		to: 'szy0syz@gmail.com',
		subject: 'SZY_Website Submission',
		text: 'You have a new Submission with the following details... Name: ' + req.body.name + ' Eamil: ' + req.body.email + ' Message: ' + req.body.message,
		html: '<p>You got a new Submission with the following details</p><ul><li>Name: '+ req.body.name +'</li><li>Eamil: '+ req.body.email +'</li><li>Message: '+ req.body.message +'</li></ul>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: ' + info.response);
			res.redirect('/')
		}
	});

});

module.exports = router;
