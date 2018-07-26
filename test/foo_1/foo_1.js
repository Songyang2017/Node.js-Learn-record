var str_1 = '这是foo_1模块'

exports.print = function(str){
	console.log(str);
	console.log(str_1)
	console.log(this);
	console.log('--------------');
}