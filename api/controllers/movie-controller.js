/**
 * Movie Constructor
 * @param {object} options
 */
var Movie = function (options) {
	this.id = options.id;
	this.name = options.name;
	this.sfUrl = options.sf_url;
	this.imdbUrl = options.imdb_url;
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
MovieController.prototype.get = function (id) {
	return false;
};


/**
 * Returns the movie with the given SF url or false
 * @param  {mixed} id movie id
 * @return {mixed}    movie object on success otherwise false
 */
MovieController.prototype.getByUrl = function (url, callback) {
	var query = "SELECT * FROM movie WHERE sf_url='" + url + "'";

	this.connection.query(query, function(err, rows, fields) {
	  if (err) throw err;

	  callback(rows)
	});
};

/**
 * Creates new movie objet in the memory
 * @param  {object} options movie options
 * @return {object} movie object
 */
MovieController.prototype.createMovie = function (options) {
	return new Movie(options);
};


/**
 * Insert movie in the db
 * @param  {mixed} id movie id
 * @return {mixed}  movie (with db id) or false
 */
MovieController.prototype.insert = function (movie) {
	return false;
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





