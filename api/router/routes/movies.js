var express = require('express'),
    router = express.Router(),
    MovieController = require('../../controllers/movie-controller.js'),
    API_SETTINGS = require('../../configs');

router.get('/movies', function (req, res) {
  var movieController = new MovieController(API_SETTINGS);


  movieController.list(function (movies, err) {
    if (err) {
      res.status(500).send({"Error": "Failed fetching movies"});
      return;
    }

    res.status(200).send({
      "data": movies}
      );
  });
});


router.get('/movies/:id', function(req, res) {

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
