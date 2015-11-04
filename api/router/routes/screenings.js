var express = require('express'),
    router = express.Router(),
    ScreeningController = require('../../controllers/cinema-controller.js'),
    API_SETTINGS = require('../../configs');

// GET /screenings
router.get('/screenings', function(req, res) {

    // ADD filter object as part of the request


    res.status(200).send({
        "Success": true,
        "Data": {
            "Message": "This will return an array of screenings"
        }
    });
});

// GET /screenings/:id
router.get('/screenings/:id', function(req, res) {
    // Return a  specific cinema
});
