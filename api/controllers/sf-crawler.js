var Crawler = require("crawler");


var SF_ABS_URL = "http://www.sf.se";
var SF_MOVIELIST_URL = "http://www.sf.se/filmer/";
var SF_CINEMALIST_URL = "http://www.sf.se/biografer/";
var DEFAULT_CITY = "Stockholm";
var CRAWL_DATETIME = "2015-05-12 00:00:00";


/**
 *  SFCrawler Constructor
 */
var SFCrawler = function(options) {
	this.movieController = options.movieController;
	this.cinemaController = options.cinemaController;
};


SFCrawler.prototype.crawlMovieList = function () {
	var movieController = this.movieController;

	var listCrawler = new Crawler({
	    maxConnections : 10,
	    // This will be called for each crawled page
	    callback : function (err, result, $) {
			if (err) {
				console.error(err);
				return;
			}

	        $('li[data-type="ShowingMovie"]').each(function(index, li) {
	        	var movieName = $(li).find(".textTitle span").text(),
	        		movieSFUrl = SF_ABS_URL + $(li).find(".textAboutMovieAndTickets .smallWhiteBtn").attr("href"),
	        		premierDate = $(li).find(".textPremiereDate").text(),
	        		ageLimit = $(li).find(".textAgeFrom").text();

	        	movieController.getByUrl(movieSFUrl, function (movie, err) {
	        		if (err) {
	        			console.error(err);
	        			return;
	        		}

	        		if (movie) {
	        			console.log("Movie " + movieName + " exist in db. Just need to update screenings.\n");
	        			// crawl screenings here
	        		} else {
	        			console.log("Movie " + movieName + " does not exist in db. Need to insert movie in the db.\n");
	        			var movie = movieController.create({
	        				"name": movieName,
	        				"sf_url": movieSFUrl,
	        				"imdb_url": "",
	        				"premier_date": premierDate,
	        				"age_limit": ageLimit,
	        				"updated_datetime": CRAWL_DATETIME
	        			});

	        			movieController.insert(movie, function (movie, err) {
	        				if (err) {
	        					console.error(err);
	        					return;
	        				}

	        				console.log("Movie " + movie.name + " inserted to the db. Id is " + movie.id + "\n");

	        				// crawl screenings here
	        			});
	        		}
	        	});
	        });
	    }
	});

	listCrawler.queue(SF_MOVIELIST_URL);

};


SFCrawler.prototype.crawlCinemas = function () {
	var cinemaController = this.cinemaController;

	var cinemaCrawler = new Crawler({
	    maxConnections : 10,
	    // This will be called for each crawled page
	    callback : function (err, result, $) {
			if (err) {
				console.error(err);
				return;
			}

	        $('#SubChooseCinemaMenu li').each(function(index, li) {
	        	var cinemaName = $(li).find("a").text(),
	        		cinemaSFUrl = SF_ABS_URL + $(li).find("a").attr("href"),
	        		cinemaCity = DEFAULT_CITY;


	        	cinemaController.getByName(DEFAULT_CITY, cinemaName, function (cinema, err) {
					if (err) {
						console.error(err);
						return;
					}

					if (cinema) {
	    				console.log("Cinema " + cinema.name + " already exists. Id is " + cinema.id + "\n");
	    				return;
					}

	    			cinema = cinemaController.create({
	    				"name": cinemaName,
	    				"city": DEFAULT_CITY,
	    				"sf_url": cinemaSFUrl,
	    				"updated_datetime": CRAWL_DATETIME
	    			});

	    			cinemaController.insert(cinema, function (cinema, err) {
	    				if (err) {
	    					console.error(err);
	    					return;
	    				}

	    				console.log("Cinema " + cinema.name + " inserted to the db. Id is " + cinema.id + "\n");

	    			});
	        	});


	        });
	    }
	});

	cinemaCrawler.queue(SF_CINEMALIST_URL);
};

SFCrawler.prototype.crawlMovieScreenings = function () {

};


module.exports = SFCrawler;