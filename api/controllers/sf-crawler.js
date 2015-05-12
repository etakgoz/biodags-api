var Crawler = require("crawler");


/**
 *  SFCrawler Constructor
 */
var SFCrawler = function(options) {
	this.movieController = options.movieController;
};

var SF_ABS_URL = "http://www.sf.se/";
var SF_MOVIELIST_URL = "http://www.sf.se/filmer/";
var DEFAULT_CITY = "Stockholm";


SFCrawler.prototype.crawlMovieList = function () {
	var movieController = this.movieController;

	var listCrawler = new Crawler({
	    maxConnections : 10,
	    // This will be called for each crawled page
	    callback : function (error, result, $) {
	        // $ is Cheerio by default
	        //a lean implementation of core jQuery designed specifically for the server
	        $('li[data-type="ShowingMovie"]').each(function(index, li) {
	        	var movieName = $(li).find(".textTitle span").text(),
	        		movieSFUrl = SF_ABS_URL + $(li).find(".textAboutMovieAndTickets .smallWhiteBtn").attr("href");

	        	movieController.getByUrl(movieSFUrl, function (rows, err) {
	        		if (err !== undefined) {
	        			throw(err);
	        		}

	        		if (rows.length === 0) {
	        			console.log("Movie " + movieName + " does not exist in db. Need to insert movie in the db.\n");
	        			var movie = new Movie({
	        				"name": movieName,
	        				"sf_url": movieSFUrl,
	        				"imdb_url": "",
	        				"updated_datetime": "2015-05-12 00:00:00"
	        			});

	        			movieController.insert(movie, function (movie, err) {
	        				if (err != undefined) {
	        					throw(err);
	        				}

	        				console.log("Movie " + movie.name + " inserted to the db. Id is " + movie.id + "\n");

	        				// TODO: Crawl screenings
	        			});
	        		} else {
	        			console.log("Movie " + movieName + " exist in db. Just need to update screenings.\n");

	        			// TODO: Crawl screenings
	        		}
	        	});
	        });
	    }
	});

	listCrawler.queue(SF_MOVIELIST_URL);

};

SFCrawler.prototype.crawlMovieScreenings = function () {

};


module.exports = SFCrawler;