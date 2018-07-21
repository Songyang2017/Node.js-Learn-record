var express = require('express')

var app = express();

app.get('/', function(req,res){
	res.send('Hello World')
})

app.listen(3000, function(){
	console.log('app is listening at port 3000');
})

// 将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了。
// 例如，假设在 public 目录放置了图片、CSS 和 JavaScript 文件，你就可以：
// 以下均可访问到静态文件
// http://localhost:3000/images/kitten.jpg
// http://localhost:3000/css/style.css
// http://localhost:3000/js/app.js
// http://localhost:3000/images/bg.png
// http://localhost:3000/hello.html

app.use(express.static('public'))

// 或者指定一个‘虚拟’挂载路径
// 你希望所有通过 express.static 访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，
// 可以通过为静态资源目录指定一个挂载路径的方式来实现，如下所示

// app.use('/static', express.static('public'))
// 访问路径变成：http://localhost:3000/static/images/kitten.jpg
// 

