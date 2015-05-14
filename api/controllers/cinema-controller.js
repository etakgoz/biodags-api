/**
 * Cinema Constructor
 * @param {object} options
 */
var Cinema = function (options) {
	this.id = options.id;
	this.name = options.name;
	this.city = options.city;
	this.updatedDatetime = options.updated_datetime;
};

/**
 * CinemaController Constructor
 */
var CinemaController = function() {
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
 * Creates new cinema objet in the memory
 * @param  {object} options cinema options
 * @return {object} cinema object
 */
CinemaController.prototype.create = function (options) {
	return new Cinema(options);
};


/**
 * Returns the cinema with the given id or false
 * @param  {mixed} id cinema id
 * @return {mixed}    cinema object on success otherwise false
 */
CinemaController.prototype.getByName = function (city, name) {
	var query = "SELECT * FROM cinema WHERE name='" + name + "' AND city='" + city + "'";

	this.connection.query(query, function(err, rows, fields) {
		callback(rows, err)
	});
};



/**
 * Returns the cinema with the given id or false
 * @param  {mixed} id cinema id
 * @return {mixed}    cinema object on success otherwise false
 */
CinemaController.prototype.get = function (id) {
	var query = "SELECT * FROM cinema WHERE id=" + id;

	this.connection.query(query, function(err, rows, fields) {
		callback(rows, err)
	});
};


/**
 * Insert cinema in the db
 * @param  {mixed} id cinema id
 * @return {mixed}  cinema (with db id) or false
 */
CinemaController.prototype.insert = function (cinema) {
	var valueStr = '(NULL, "' +
					cinema.name + '", "' +
					cinema.city + '", "' +
					cinema.updatedDatetime + '")';

	var query = 'INSERT INTO cinema (id, name, city, updated_datetime)' +
				' VALUES ' + valueStr;


	this.connection.query(query, function(err, info) {
		if (!err) {
			cinema.id = info.insertId;
		}

		callback(movie, err);
	});
};


/**
 * Upates cinema in the db
 * @param  {mixed} id cinema id
 * @return {mixed}  cinema or false
 */
CinemaController.prototype.update = function (cinema) {
	return false;
};


module.exports = CinemaController;





