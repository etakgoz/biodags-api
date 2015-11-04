/**
 * Screening Constructor
 * @param {object} options
 */
var Screening = function (options) {
	this.id = options.id;
	this.movieId = options.movie_id;
	this.cinemaId = options.cinema_id;
	this.placesLeft = options.places_left;
	this.updatedDatetime = options.updated_datetime;
};

/**
 * ScreeningController Constructor
 */
var ScreeningController = function() {};


/**
 * Creates new screening objet in the memory
 * @param  {object} options cinema options
 * @return {object} Screening object
 */
ScreeningController.prototype.createScreening = function (options) {
	return new Screening(options);
};


// returns array of screenings
ScreeningController.prototype.list = function (filters) {
    return new Promise(function(resolve, reject) {
        resolve([]);
    };
};


// returns the screening with that id
ScreeningController.prototype.get = function (id) {
    return new Promise(function(resolve, reject) {
        resolve({});
    };
};


module.exports = ScreeningController;





