var http = require('http')

http.get('http://www.xcu.edu.cn/',function(res){
    // console.log(res.headers)

    var body = [];
    var i = 1
    res.on('data', function(data){
        body.push(data)
    })

    res.on('end', function(){
        body = Buffer.concat(body);
        console.log(body.toString());
    })
})