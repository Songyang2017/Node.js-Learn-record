var express = require('express')
var birds = require('./app/birds');
var _router = require('./router/router')
var app = express();

app.use('/birds', birds);
app.use('/router', _router)

app.get('/', function(req,res){
	res.send('Hello World')
})

app.listen(3000, function(){
	console.log('app is listening at port 3000');
})