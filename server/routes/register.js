var mongoose = require("mongoose");

var User = mongoose.model('user',
    {
        email: String,
        password: String,
        messages : []
    }
);

exports.createUser = function(req, res, next) {
    var d = req.body;

    var user = new User(
        { 
            email: d.email,
            password: d.password,
            messages : []
        }
    );
    
    user.save(function (err) {
        if (err) res.status(400).end();
        res.status(200).end();
    });
}
