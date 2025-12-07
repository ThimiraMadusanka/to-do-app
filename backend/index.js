var http = require('http');
var app = require('./app');

const PORT = process.env.PORT || 5000;

// Create HTTP server.    
var server = http.createServer(app);

server.listen(PORT, function () {
    console.log('Backend RESTful API server');
    console.log("App is running on port " + PORT);
});
