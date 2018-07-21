var express = require('express');
var birdsRouter = express.Router();

// 该路由使用的中间件
birdsRouter.use(function timeLog(req, res, next) {
  console.log('Time: ', new Date().toLocaleString());
  next();
});

// 定义网站主页的路由
birdsRouter.get('/', function(req, res) {
  res.send('Birds home page');
});

// 定义 about 页面的路由
birdsRouter.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = birdsRouter;