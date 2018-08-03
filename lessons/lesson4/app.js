//使用 eventproxy 控制并发
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
// url 模块是 Node.js 标准库里面的
// http://nodejs.org/api/url.html
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

// 获取首页所有的链接
superagent.get(cnodeUrl).end(function(err,res){
	if(err){
		return console.error(err);
	}

	var topicUrls = [];
    var $ = cheerio.load(res.text);

    $('#topic_list .topic_title').each(function (idx, element) {
      var $element = $(element);
      // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
      // 我们用 url.resolve 来自动推断出完整 url，变成
      // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
      // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
      var href = url.resolve(cnodeUrl, $element.attr('href'));
      topicUrls.push(href);
    });
    // console.log(topicUrls);

    // 得到一个 eventproxy 的实例
	var eq = new eventproxy();

	// 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
	eq.after('topic_html', topicUrls.length, function(list){
		// topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair
		console.log('-----list------');
		list = list.map(function (topicPair) {
	        var topicUrl = topicPair[0];
	        var topicHtml = topicPair[1];
	        var $ = cheerio.load(topicHtml);
	        return ({
	          title: $('.topic_full_title').text().trim(),
	          href: topicUrl,
	          comment1: $('.reply_content').eq(0).text().trim(),
	        });
		})
		console.log(list);
	})	

	topicUrls.forEach(function(v){
		superagent.get(v).end(function(err, conts){
			// console.log('fetch ' + v + ' successful');
			eq.emit('topic_html', [v, conts.text])
		})
	})
})
