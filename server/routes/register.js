var token = "6085eff8-6f7f-4b90-9606-19769a785c5a";
var db = require('orchestrate')(token);
var uuid = require('node-uuid');
db.ping().then(function() {
    console.log('API KEY IS VALID!')
}).fail(function(err) {
    console.log('API KEY IS INVALID!')
});

exports.createUser = function(req, res, next) {
    var d = req.body;

    db.put('users', d.email, d, false).then(function(response) {
        res.status(200).end();
    }).fail(function(err) {
        res.status(400).end();
    });

    db.put('messages', d.email, {
     messages:[]
    }, false);
}

// function registerUser(data, req, res, next) {}
exports.getUser = function(req, res, next) {
    db.list('users').then(function(result) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result.body.results));
    });
}