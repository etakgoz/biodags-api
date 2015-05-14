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
    compress = require('compression'),
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

  sfCrawler = new SFCrawler({
    movieController: new MovieController(),
    cinemaController: new CinemaController()
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


app.get('/movies', function (req, res) {
  var movieController = new MovieController();

  movieController.list(function (movies, err) {
    if (err) {
      console.error(err);
      res.status(500).send({"Error": "Failed fetching movies"});
      return;
    }

    res.status(200).send(JSON.stringify({"data": movies}, null ,2));

  });
});


app.get('/movies/:id', function(req, res) {

  var itemId = parseInt(req.params.id, 10),
      movieController = new MovieController();

  movieController.get(itemId, function (movie, err) {
    if (err) {
      console.error(err);
      res.status(500).send({"Error": "Failed fetching movie"});
      return;
    }

    if (!movie) {
      res.status(404).send({"Error": "Failed fetching movie"});
      return;
    }

    res.status(200).send(JSON.stringify({"data": movie}, null, 2));

  });
});


app.get('/cinemas', function (req, res) {
  var cinemaController = new CinemaController();

  cinemaController.list(function (cinemas, err) {
    if (err) {
      console.error(err);
      res.status(500).send({"Error": "Failed fetching cinemas"});
      return;
    }

    res.status(200).send(JSON.stringify({"data": cinemas}, null ,2));

  });
});

app.get('/cinemas/:id', function(req, res) {

  var itemId = parseInt(req.params.id, 10),
      cinemaController = new CinemaController();

  cinemaController.get(itemId, function (cinema, err) {
    if (err) {
      console.error(err);
      res.status(500).send({"Error": "Failed fetching movie"});
      return;
    }

    if (!cinema) {
      res.status(404).send({"Error": "Failed fetching movie"});
      return;
    }

    res.status(200).send(JSON.stringify({"data": cinema}, null ,2));

  });
});

// Serve the frontend app
app.use('/app/', express.static(__dirname + '/../frontend'));

app.use(compress());

// Listen the port 3412 for the requests
app.listen(process.env.PORT || 3412);