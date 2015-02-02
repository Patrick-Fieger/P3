/**
 * Hauptdatei Server
 * Hier werden alle Abhängigkeiten, Methoden und Routes geladen
 */
var express = require('express'),
    mongoose = require("mongoose"),
    app = express(),
    register = require('./routes/register'),
    login = require('./routes/login'),
    message = require('./routes/message'),
    bodyParser = require('body-parser'),
    qt   = require('quickthumb'),
    db = mongoose.connection;

// Stellt eine Verbindung zur MongoDB her
mongoose.connect("mongodb://patrickf_mongoadmin:ofvafwuvat@localhost:20799/p3",{auth:{authdb:"admin"}});    

// Checkt ob die Verbindung erfolgreich war
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

// Port für unseren Express-Server ist 71456
app.set('port', process.env.PORT || 71456);
app.listen(app.get('port'), function () {
    console.info('Express server listening on port ' + app.get('port'));
});

app.use(bodyParser.json());
app.use(qt.static(__dirname + '/'));


// HTTP-Requests
app.post('/create', register.createUser);
app.post('/message', message.saveMessage);
app.post('/photo', message.uploadPhoto);
app.post('/messagebyid', message.getMessageById);
app.post('/messageslocation', message.getMessageByNearest);
app.post('/login', login.login);

app.get('/allmessagesbylocation', message.getMessageByLocation);
app.get('/timelineavailable', message.isTimelineAvailable);

