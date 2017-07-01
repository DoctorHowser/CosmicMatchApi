var express = require('express');
var router = express.Router();
var path = require('path');
var comparisonService = require('../services/comparisonService');
var ephemeris = require('../external/ephemris')


router.get("/comparison", function(req, res, next){




    let comparison ;

    comparisonService.getComparison().then(
    result => {
            comparison = result;

            console.log("at the end", comparison);
            res.send("ok! got it!")

        })
});

router.get("/*", function(req, res, next){
    var file = req.params[0] || 'views/index.html';
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;