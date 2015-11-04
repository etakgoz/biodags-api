module.exports = function (app) {
    app.use('/cinemas', require('./routes/cinemas'));
    app.use('/crawl', require('./routes/crawl'));
    app.use('/movies', require('./routes/movies'));
    app.use('/screenings', require('./routes/screenings'));
};