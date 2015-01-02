var token = "6085eff8-6f7f-4b90-9606-19769a785c5a";
var db = require('orchestrate')(token);
exports.login = function(req, res) {
    var body = req.body;
    db.get('users', body.email).then(function(response) {
        var user = response.body;
        if (user && body.password == user.password) {
            res.status(200).end();
        } else {
            res.status(401).end();
        }
    }).fail(function(err) {
        res.status(401).end();
    })
}