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
    API_SETTINGS = require('./configs'),
    app = express();


//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');

    next();
};

app.use(allowCrossDomain);

app.use(bodyParser.json());

var router = require('./router')(app);


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
*/

// Serve the frontend app
app.use('/app/', express.static(__dirname + '/../frontend'));

app.use(compress());

// Listen the port 3412 for the requests
app.listen(process.env.PORT || 3412);