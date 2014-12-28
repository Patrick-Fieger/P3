var express = require('express'),
    register = require('./routes/register'),
    // geo = require('./routes/geo'),
    app = express(),
    path = require('path'),
    httpServer = require('http-server'),
    bodyParser = require('body-parser');

var root = path.join(__dirname, 'app', '');
var server = httpServer.createServer({
        root: root,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true'
        }
});
server.listen(8000);
console.info('Server is running on port 8000 \nPlease open your browser and navigate to http://localhost:8000');

// app.use(express.static('www'));



// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
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
app.put('/create', register.createUser);

