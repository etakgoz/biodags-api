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
    MovieController = require('./controllers/movie-controller.js');
    CinemaController = require('./controllers/cinema-controller.js');
    ScreeningController = require('./controllers/screening-controller.js');
    SFCrawler = require('./controllers/sf-crawler.js');
    app = express();

// app.use(express.bodyParser.json());

app.get('/movies', function(req, res) {
  sfCrawler = new SFCrawler({
    movieController: new MovieController()
  });

  sfCrawler.crawlMovieList();

  res.status(200).send({"Hoppala":"boppala"});
});


// Serve the frontend app
app.use('/app/', express.static(__dirname + '/../frontend'));

// Listen the port 3412 for the requests
app.listen(process.env.PORT || 3412);