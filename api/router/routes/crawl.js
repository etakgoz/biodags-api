var express = require('express'),
    router = express.Router(),
    MovieController = require('../../controllers/movie-controller.js'),
    CinemaController = require('../../controllers/cinema-controller.js'),
    ScreeningController = require('../../controllers/screening-controller.js'),
    API_SETTINGS = require('../../configs');

// GET /crawl/movies
router.get('/crawl/movies', function(req, res) {

	var sfCrawler = new SFCrawler({
		movieController: new MovieController(API_SETTINGS),
		cinemaController: new CinemaController(API_SETTINGS)
	});

	sfCrawler.crawlMovieList();

	res.status(200).send({
		"Success": true,
		"Data": {
			"Message": "Started crawling movies"
		}
	});
});

// GET /crawl/cinemas
router.get('/crawl/cinemas', function(req, res) {

	var sfCrawler = new SFCrawler({
		movieController: new MovieController(API_SETTINGS),
		cinemaController: new CinemaController(API_SETTINGS)
	});

	sfCrawler.crawlCinemas();

	res.status(200).send({
		"Success": true,
		"Data": {
			"Message": "Started crawling cinemas"
		}
	});
});

// GET /crawl/status
router.get('/crawl/status', function(req, res) {

	var item = req.query.item,
		message = '',
		sfCrawler = new SFCrawler({
			movieController: new MovieController(API_SETTINGS),
			cinemaController: new CinemaController(API_SETTINGS)
		});

  if (item === "movies") {
  	// TODO: Check crawl status
  } else if (item === "cinemas") {
  	// TODO: Check crawl status
  } else {
  	res.status(500).send({
  		"Success": false,
  		"Error": {
  			"Message": "Item to check crawl status does not exist"
  		}
  	);
  }
});