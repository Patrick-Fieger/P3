var express = require('express'),
    mongoose = require("mongoose"),
    app = express(),
    register = require('./routes/register'),
    login = require('./routes/login'),
    message = require('./routes/message'),
    bodyParser = require('body-parser'),
    qt   = require('quickthumb'),
    db = mongoose.connection;

mongoose.connect("mongodb://patrickf_mongoadmin:ofvafwuvat@localhost:20799/p3",{auth:{authdb:"admin"}});    


db.on('error', function(){
 console.log('Connection failed');
});
db.once('open', function (callback) {
  console.log('MongoDB connected on Port 20799');
});


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.set('port', process.env.PORT || 71456);
app.listen(app.get('port'), function () {
    console.info('Express server listening on port ' + app.get('port'));
});

// app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(qt.static(__dirname + '/'));

app.post('/create', register.createUser);
app.post('/message', message.saveMessage);
app.post('/photo', message.uploadPhoto);

app.get('/allmessagesbylocation', message.getMessageByLocation);
app.post('/messagebyid', message.getMessageById);

app.post('/messageslocation', message.getMessageByNearest);

app.post('/login', login.login);