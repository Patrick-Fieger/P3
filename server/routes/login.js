/**
 * Route für einen simplen Login-Mechanismus
 */
var mongoose = require("mongoose");
var User = mongoose.model('user');
exports.login = function(req, res) {
    var body = req.body;
    User.findOne({email: body.email}, function(err, doc) {
        if(doc == 'null'||doc == null){ // Wenn user nicht gefunden wurde
            res.status(404).end();
        }else{
            if(body.password === doc.password){ // Wenn user gefunden wurde, check ob die Passwörter übereinstimmen
                res.status(200).end();
            }else{
                res.status(401).end();
            }
        }
    });
}