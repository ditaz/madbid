/**
 * Created by Ditas on 9/1/16.
 */
var express = require('express'),
    app = express(),
    server = require('http').createServer(app);

app.use(function(req, res, next) {
    var allowedOrigins = ['http://localhost'],
        origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

// POST method route
app.post('/', function (req, res) {
    res.send(req.body);
});

// GET method route
app.get('/', function (req, res) {
    res.send('GET request to the homepage');
});

server.listen(process.env.PORT || 5000);