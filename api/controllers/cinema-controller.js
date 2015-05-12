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
var CinemaController = function() {};


/**
 * Creates new cinema objet in the memory
 * @param  {object} options cinema options
 * @return {object} cinema object
 */
CinemaController.prototype.createCinema = function (options) {
	return new Cinema(options);
};

/**
 * Returns the cinema with the given id or false
 * @param  {mixed} id cinema id
 * @return {mixed}    cinema object on success otherwise false
 */
CinemaController.prototype.get = function (id) {
	return false;
};


/**
 * Insert cinema in the db
 * @param  {mixed} id cinema id
 * @return {mixed}  cinema (with db id) or false
 */
CinemaController.prototype.insert = function (cinema) {
	return false;
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





