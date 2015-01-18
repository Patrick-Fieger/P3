var mongoose = require("mongoose");

var User = mongoose.model('user');

exports.login = function(req, res) {
    var body = req.body;

    User.findOne({email: body.email}, function(err, doc) {
        if(doc == 'null'||doc == null){
            res.status(404).end();
        }else{
            if(body.password === doc.password){
                res.status(200).end();
            }else{
                res.status(401).end();
            }
        }
    });
}