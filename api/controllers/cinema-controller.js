/**
 * Cinema Constructor
 * @param {object} options
 */
var Cinema = function (options) {
	this.id = options.id;
	this.name = options.name;
	this.city = options.city;
	this.sfUrl = options.sf_url;
	this.updatedDatetime = options.updated_datetime;
};

/**
 * CinemaController Constructor
 */
var CinemaController = function (apiSettings) {
	var mysql      = require('mysql');

    this.connection = mysql.createConnection({
        host     : apiSettings.db["host"],
        user     : apiSettings.db["user"],
        password : apiSettings.db["password"],
        database : apiSettings.db["database"]
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


CinemaController.prototype.list = function (callback) {
	var query = "SELECT * FROM cinema",
		cinemaController = this;

	this.connection.query(query, function(err, rows, fields) {
		var cinemas = [];
		if (!err && rows.length > 0) {
			rows.forEach(function (row, index) {
				cinemas.push(cinemaController.create(row));
			});

		}

		callback(cinemas, err);
	});
};

/**
 * Returns the cinema with the given id or false
 * @param  {mixed} id cinema id
 * @return {mixed}    cinema object on success otherwise false
 */
CinemaController.prototype.getByName = function (city, name, callback) {
	var query = "SELECT * FROM cinema WHERE name='" + name + "' AND city='" + city + "'",
		cinemaController = this;



	this.connection.query(query, function(err, rows, fields) {
		var cinema = false;
		if (!err && rows.length > 0) {
			cinema = cinemaController.create(rows[0])
		}

		callback(cinema, err);
	});
};



/**
 * Returns the cinema with the given id or false
 * @param  {mixed} id cinema id
 * @return {mixed}    cinema object on success otherwise false
 */
CinemaController.prototype.get = function (id, callback) {
	var query = "SELECT * FROM cinema WHERE id=" + id,
		cinemaController = this;

	this.connection.query(query, function(err, rows, fields) {
		var cinema = false;
		if (!err && rows.length > 0) {
			cinema = cinemaController.create(rows[0])
		}

		callback(cinema, err);
	});
};


/**
 * Insert cinema in the db
 * @param  {mixed} id cinema id
 * @return {mixed}  cinema (with db id) or false
 */
CinemaController.prototype.insert = function (cinema, callback) {
	var valueStr = '(NULL, "' +
					cinema.name + '", "' +
					cinema.city + '", "' +
					cinema.sfUrl + '", "' +
					cinema.updatedDatetime + '")';

	var query = 'INSERT INTO cinema (id, name, city, sf_url, updated_datetime)' +
				' VALUES ' + valueStr;


	this.connection.query(query, function(err, info) {
		if (!err) {
			cinema.id = info.insertId;
		}

		callback(cinema, err);
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





