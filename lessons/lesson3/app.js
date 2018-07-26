// 使用 superagent 与 cheerio 完成简单爬虫
var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var url = require('url')

var app = express();

app.get('/', function(req,res,next){
	var codeUrl = 'https://cnodejs.org';
	// 用 superagent 去抓取 https://cnodejs.org/ 的内容
	superagent.get(codeUrl).end(function(error, conts){
		if(error){
			return next(error)
		}
		var $ = cheerio.load(conts.text);
        var items = [];
        $('#topic_list .topic_title').each(function (idx, element){
        	var $element = $(element);
        	items.push({
				title: $element.attr('title'),
				url:  url.resolve(codeUrl, $element.attr('href'))
			})
		})
        res.json(items)
	})
})

app.listen(3002,function(){
	console.log('lesson3:使用 superagent 与 cheerio 完成简单爬虫 is runing at port 3002');
})