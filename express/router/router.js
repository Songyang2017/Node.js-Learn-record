var express = require('express');
var axios = require('axios');
var multer = require('multer');
var mysql = require('mysql');
var fs = require('fs');
var upload = multer({dest: './public/imgs/'});
var router = express.Router();

// 解决跨域问题，CORS  调用http://localhost:3000/router/list.json
router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('query: ', req.query);
  next();
});

// respond with "hello world" when a GET request is made to the homepage
// 匹配根路径的请求
router.get('/', function(req, res) {
  res.send('router 模块化');
});
// 匹配 /about 路径的请求
router.get('/about', function(req,res){
	res.send('this is send by post')
})
// 匹配 /random.text 路径的请求(这就是个路径名)
router.get('/random.txt', function(req, res){
	res.send('random.txt')
})

// 多个回调函数处理路由 指定next对象
router.get('/example/b', function (req, res, next) {
  console.log('response will be sent by the next function ...');
  // res.send('Hello from B-1!');
  next();
}, function (req, res) {
  res.send('Hello from B-2!');
});

// 使用回调函数数组处理路由
var cb0 = function(req,res,next){
	console.log('cb0');
	next();
}

var cb1 = function(req,res,next){
	console.log('cb1');
	next();
}

var cb2 = function(req,res,next){
	res.send('Hello from cb2!');
}

router.get('/example/c', [cb0,cb1,cb2])



// 响应方法



// 可使用 app.route() 创建路由路径的链式路由句柄。由于路径在一个地方指定，这样做有助于创建模块化的路由，
// 而且减少了代码冗余和拼写错误。请参考 Router() 文档 了解更多有关路由的信息。
router.route('/book')
  .post(function(req, res) {
    res.send('Add a book');
  })
  .get(function(req, res) {
    // res.send('Get a random book');
    res.json({ desc: 'Get a random book' })
  })
  .put(function(req, res) {
    res.send('Update the book');
  });

// express.Router



//代理跨域
// var apiRouter = express.Router();
router.get('/topNews',function(req,res){
	var url = 'http://v.juhe.cn/toutiao/index';
	axios.get(url,{
		params: req.query
	}).then(function(response){
		res.json(response.data)
		// console.log('res', response);
	}).catch(function(error){
		console.log('error', error);
	})
})

//上传文件
router.post('/file', upload.any(), function(req, res, next) {
    console.log(req.files[0]);
     // 获得文件的临时路径
     var tmp_path = req.files[0].path;
    // 指定文件上传后的目录 - 示例为"images"目录。 
    var target_path = './public/imgs/' + req.files[0].originalname;
    // 移动文件
    fs.rename(tmp_path, target_path, function(err) {
      if (err) throw err;
      // 删除临时文件夹文件, 
      fs.unlink(tmp_path, function() {
         if (err) throw err;
         res.send('File uploaded to: ' + target_path + ' - ' + req.files[0].size + ' bytes');
      });
    });
  });

//mysql 连接

var msg = null;
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: 'ws',
  port:3306
});
connection.connect();
connection.query('SELECT * FROM `chat` WHERE 1', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].Cap);
  msg = rows[0]
});
connection.end();

router.get('/bolgText', function(req,res){
  res.json(msg)
})


router.use(express.static('public'))

module.exports = router;