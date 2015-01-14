var express = require('express'),
    register = require('./routes/register'),
    login = require('./routes/login'),
    user = require('./routes/user'),
    message = require('./routes/message'),
    app = express(),
    bodyParser = require('body-parser');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.info('Express server listening on port ' + app.get('port'));
});

app.use(bodyParser.json());


app.post('/create', register.createUser);

app.get('/getusers', user.getUser);
app.get('/getuser', user.getUserInfo);

app.post('/message', message.saveMessage);
app.get('/messages', message.getAllMessages);

app.post('/login', login.login);