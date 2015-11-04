var express = require('express'),
    router = express.Router(),
    CinemaController = require('../../controllers/cinema-controller.js'),
    API_SETTINGS = require('../../configs');

// GET /cinemas
router.get('/cinemas', function(req, res) {

    res.status(200).send({
        "Success": true,
        "Data": {
            "Message": "This will return an array of cinemas"
        }
    });
});

// GET /cinemas/:id
router.get('/cinemas/:id', function(req, res) {
    // Return a  specific cinema
});
