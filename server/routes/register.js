var geo = require('./geo');
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
    geo.geocoder.geocode(d.city, function(err, ress) {
        delete d.city;
        d.city = ress[0];
        db.put('users', d.user, {
            "name": d.fullname,
            "email": d.user,
            "citydata": d.city,
            "password": d.password
        }, false).then(function(response) {
            res.status(200).end();
        }).fail(function(err) {
            res.status(400).end();
        });

        db.put('messages', data.user, {
         messages:[
          // {
          //   latitude:0,
          //   longitude:0,
          //   id:uuid.v4();
          //   story:"",
          //   tags: [],
          //   comments:[{
          //       name:"",
          //       message:""
          //   }]
          // }
         ]
        }, false);
    }, {
        language: 'de'
    });
}




// function registerUser(data, req, res, next) {}
exports.getUser = function(req, res, next) {
    db.list('users').then(function(result) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result.body.results));
    });
}