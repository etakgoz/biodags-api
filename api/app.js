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

app.get('/crawl', function(req, res) {

  var item = req.query.item,
      message = '';

  for (var i in req.params) {
    console.log("param: " + i);
  }

  sfCrawler = new SFCrawler({
    movieController: new MovieController()
  });

  if (item === "movies") {
    sfCrawler.crawlMovieList();
    message = 'Started crawling movies';
    res.status(200).send({"Status": message});
  } else if (item === "cinemas") {
    sfCrawler.crawlCinemas();
    message = 'Started crawling cinemas';
    res.status(200).send({"Status": message});
  } else {
    res.status(500).send({"Error": "Item to crawl does not exist"});
  }
});


// Serve the frontend app
app.use('/app/', express.static(__dirname + '/../frontend'));

// Listen the port 3412 for the requests
app.listen(process.env.PORT || 3412);