var token = "6085eff8-6f7f-4b90-9606-19769a785c5a";
var db = require('orchestrate')(token);
var uuid = require('node-uuid');



exports.saveMessage = function(req, res, next) {
    var d = req.body;
    var u = d.user;
    d.id = uuid.v4();
    delete d.user

   	db.get('messages', u)
	.then(function (result) {
		var update = result.body.messages;
		var arr =[];
		for( var i in update ) {
		    if (update.hasOwnProperty(i)){
		       arr.push(update[i]);
		    }
		}
		setTimeout(function(){
			arr.push(d);
			console.log(d)
			db.merge('messages', u, {
			  "messages": arr
			})
			.then(function (result) {
				console.log('Message SAVED!!!')
			})
			.fail(function (err) {
				console.log('Message FAIL!!!')
			});
		},100);
	});
}

exports.getAllMessages = function(req, res, next) {


	db.list('messages').then(function (result) {
	  res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result.body.results));
	})
	.fail(function (err) {
		console.log(err)
	})


}