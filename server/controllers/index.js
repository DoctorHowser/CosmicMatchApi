var express = require('express');
var router = express.Router();
var path = require('path');
var comparisonService = require('../services/comparisonService');
var ephemeris = require('../external/ephemris')
var sqlService = require('../services/sqlService');
let jwtCheck = require('../middleware/auth')
let jwtAuthz = require('express-jwt-authz')

// router.all('/*', function (req, res, next){
//     res.setHeader('Access-Control-Allow-Origin', '*');
// 	res.setHeader('Access-Control-Request-Method', '*');
// 	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
// 	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// 	if ( req.method === 'OPTIONS' ) {
// 		res.writeHead(200);
// 		res.end();
// 		return;
//     }
    
//     next();
// })


router.post("/comparison", jwtCheck, function (req, res, next) {

    const infoA = req.body.personA;
    const infoB = req.body.personB;

    // let infoA = {
    //     name: "Julie",
    //     year: "1970",
    //     month: "01",
    //     day: "21",
    //     hour: "22",
    //     minute: "57",
    //     timezone: "America/Los_Angeles",
    //     //pacific
    //     //36n10'30"
    //     //115w8'11"
    //     lat: 36.1750,
    //     lon: -115.136388

    // };
    // let infoB = {
    //     name: "Nichola",
    //     year: "1969",
    //     month: "07",
    //     day: "24",
    //     hour: "20",
    //     minute: "52",
    //     timezone: "America/Los_Angeles",
    //     //pacific
    //     //34n1'10"
    //     //118w29'25"
    //     lat: 34.01944,
    //     lon: -118.49027
    // };

    let comparison;

    comparisonService.getComparison(infoA, infoB).then(
        result => {
            sqlService.saveMatch(result, req.user.sub, infoB.name);
            comparison = result;
            res.status(200).send(comparison)
        })
});

// router.get("/", (req, res, next) => {
//     res.send("Hello from Cosmic Match!");
// });

router.get("/*", function (req, res, next) {
    var file = req.params[0] || 'views/index.html';
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;