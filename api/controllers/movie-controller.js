/**
 * Movie Constructor
 * @param {object} options
 */
var Movie = function (options) {
	this.id = options.id;
	this.name = options.name;
	this.sfUrl = options.sf_url;
	this.imdbUrl = options.imdb_url;
	this.premierDate = options.premier_date;
	this.ageLimit = options.age_limit;
	this.updatedDatetime = options.updated_datetime;
};

/**
 * MovieController Constructor
 */
var MovieController = function() {
	var mysql      = require('mysql');

	this.connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'biodags_adm',
	  password : '0acidrain6',
	  database: 'biodags_db'
	});

	this.connection.connect();
};

/**
 * Returns the movie with the given id or false
 * @param  {mixed} id movie id
 * @return {mixed}    movie object on success otherwise false
 */
MovieController.prototype.get = function (id, callback) {
	var query = "SELECT * FROM movie WHERE id=" + id,
		movieController = this;

	this.connection.query(query, function(err, rows, fields) {
		var movie = false;
		if (!err && rows.length > 0) {
			movie = movieController.create(rows[0])
		}

		callback(movie, err);
	});
};

MovieController.prototype.list = function (callback) {
	var query = "SELECT * FROM movie",
		movieController = this;

	this.connection.query(query, function(err, rows, fields) {
		var movies = [];
		if (!err && rows.length > 0) {
			rows.forEach(function (row, index) {
				movies.push(movieController.create(row));
			});

		}

		callback(movies, err);
	});
};


/**
 * Returns the movie with the given SF url or false
 * @param  {mixed} id movie id
 * @return {mixed}    movie object on success otherwise false
 */
MovieController.prototype.getByUrl = function (url, callback) {
	var query = "SELECT * FROM movie WHERE sf_url='" + url + "'",
		movieController = this;

	this.connection.query(query, function(err, rows, fields) {
		var movie = false;
		if (!err && rows.length > 0) {
			movie = movieController.create(rows[0])
		}

		callback(movie, err);
	});
};

/**
 * Creates new movie objet in the memory
 * @param  {object} options movie options
 * @return {object} movie object
 */
MovieController.prototype.create = function (options) {
	return new Movie(options);
};


/**
 * Insert movie in the db
 * @param  {mixed} id movie id
 * @return {mixed}  movie (with db id) or false
 */
MovieController.prototype.insert = function (movie, callback) {
	var valueStr = '(NULL, "' +
					movie.name + '", "' +
					movie.sfUrl + '", "' +
					movie.imdbUrl + '", "' +
					movie.premierDate + '", "' +
					movie.ageLimit + '", "' +
					movie.updatedDatetime + '")';

	var query = 'INSERT INTO movie (id, name, sf_url, imdb_url, premier_date, age_limit, updated_datetime)' +
				' VALUES ' + valueStr;


	this.connection.query(query, function(err, info) {
		if (!err) {
			movie.id = info.insertId;
		}

		callback(movie, err);
	});
};


/**
 * Upates movie in the db
 * @param  {mixed} id movie id
 * @return {mixed}  movie or false
 */
MovieController.prototype.update = function (movie) {
	return false;
};

module.exports = MovieController;





