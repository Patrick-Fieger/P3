var geo = require('./geo');
var token = "6085eff8-6f7f-4b90-9606-19769a785c5a";
var db = require('orchestrate')(token);
var qs = require('querystring');
var uuid = require('node-uuid');

db.ping()
.then(function () {
  console.log('API KEY IS VALID!')
})
.fail(function (err) {
  console.log('API KEY IS INVALID!')
});


exports.createUser = function(req, res, next){
    var d = req.body;
    geo.geocoder.geocode(d.city, function(err, res) {
        delete d.city;
        d.city = res[0];
        registerUser(d,req, res, next);
    },{ language: 'de' });
}

function registerUser(data,req, res, next){
    db.put('users', data.user, {
     "name": data.fullname,
     "email": data.user,
     "citydata": data.city,
     "password": data.password
    }, false)
    .then(function (res) {})
    .fail(function (err) {})


    db.put('messages', data.user, {
     messages:[{
        latitude:0,
        longitude:0,
        message:"",
        tags: [],
        votes: 0,
        comments:[{
            name:"",
            message:""
        }]
     }]
    }, false)
    .then(function (res) {})
    .fail(function (err) {})
}

exports.getUser = function(req, res, next){
  db.list('users')
  .then(function (result) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result.body.results));
  });
}