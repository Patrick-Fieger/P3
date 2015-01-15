var express = require('express'),
    app = express(),
    // register = require('./routes/register'),
    // login = require('./routes/login'),
    // user = require('./routes/user'),
    // message = require('./routes/message'),
    bodyParser = require('body-parser');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.set('port', process.env.PORT || 71456);
app.listen(app.get('port'), function () {
    console.info('Express server listening on port ' + app.get('port'));
});

app.use(bodyParser.json());



var mongoose = require("mongoose");
mongoose.connect("mongodb://patrickf_mongoadmin:OafecDyg,@localhost:20799/p3",{auth:{authdb:"admin"}});

var db = mongoose.connection;
db.on('error', function(){
	console.log('Connection failed');
});
db.once('open', function (callback) {
  console.log('MongoDB connected on Port 20799');
});


app.post('/test',function(){
	console.log('test!!!')
});



// app.post('/create', register.createUser);

// app.get('/getusers', user.getUser);
// app.get('/getuser', user.getUserInfo);

// app.post('/message', message.saveMessage);
// app.get('/messages', message.getAllMessages);

// app.post('/login', login.login);

// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
//   console.log('wefpomwefpom')

// }).listen(61000, "127.0.0.1");
// console.log('Server running at http://127.0.0.1:61000/');