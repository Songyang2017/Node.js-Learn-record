var https = require('https')

https.get('https://www.zhihu.com/',function(res){
    // console.log(res.headers)
    var body = [];

    res.on('data', function(d){
        body.push(d)
        // console.log(d)
    })

    res.on('end', function(){
        body = Buffer.concat(body);
        console.log(body.toString());
    })
})