var token = "6085eff8-6f7f-4b90-9606-19769a785c5a";
var db = require('orchestrate')(token);



exports.getUserInfo = function(req, res) {
	console.log(req.body)

    db.get('users', req.body.email).then(function(response) {
        res.status(200).end(response.body);
    }).fail(function(err) {
        res.status(404).end();
    })
}


exports.getUser = function(req, res, next) {
    db.list('users').then(function(result) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result.body.results));
    });
}