var express = require('express');
var utility = require('utility');

var app = express();

app.get('',function(req,res){
	
	//req.query 接收链接中传来的参数
	var q = req.query.q;
	var mdsValue = utility.md5(q);

	res.send('lesson2 is runing and '+ q + ' md5Value is '+ mdsValue)
})

app.listen(3001,function(){
	console.log('lesson2 is runing at port 3001');
})


//链接打开方式 http://localhost:3001/?q=任意值