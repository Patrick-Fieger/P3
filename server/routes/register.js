/**
 * Route zum anlegen eines neuen Nutzers in der Datenbank
 * 
 */
var mongoose = require("mongoose");
var User = mongoose.model('user',
    {
        email: String,
        password: String,
        readed: [],
        messages : []
    }
);

/**
 * Funktion zum anlegen eines neuen Nutzers in der Datenbank
 * @param  {JSON}   req
 * @param  {JSON}   res
 * @return status 
 */
exports.createUser = function(req, res) {
    var d = req.body;

    var user = new User(
        { 
            email: d.email,
            password: d.password,
            readed: [],
            messages : []
        }
    );
    
    user.save(function (err) {
        if (err) res.status(400).end();
        res.status(200).end();
    });
}
