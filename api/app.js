/**
 * Biodags Server
 *
 * A node.js application implementing a REST API using express.js.
 * Capable of crawling sf.se and serving structured movie data
 *
 * @author Tolga Akgoz
 *
 */


// Setup express app to server requests and document storage to serve documents
var express = require('express'),
    bodyParser = require('body-parser'),
    movieController = require('./controllers/movie-controller.js');
    cinemaController = require('./controllers/cinema-controller.js');
    screeningController = require('./controllers/screening-controller.js');
    crawler = require('./controllers/crawler.js');
    app = express();

// app.use(express.bodyParser.json());

app.get('/movies', function(req, res) {
  res.status(200).send({"Hoppala":"boppala"});
});


// Serve the frontend app
app.use('/app/', express.static(__dirname + '/../frontend'));

// Listen the port 3412 for the requests
app.listen(process.env.PORT || 3412);