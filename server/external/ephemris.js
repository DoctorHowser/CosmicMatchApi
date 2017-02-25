// var swisseph = require ('swisseph');
// var zodiacInterpreter = require('../utilities/zodiacInterpreter');


// // Test date
// var date = {year: 1984, month: 3, day: 29, hour: 16, minute: 7, second: 0, timeZone: -5};
// let place = {lat: 40.9793, long: -74.1165};
// console.log ('Date:', date);

// var flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;

// // path to ephemeris data
// swisseph.swe_set_ephe_path (__dirname + '/../ephe');

// //TODO Break into own API, free access, returning JSON data for app

// let planets = {
//         "Sun" : swisseph.SE_SUN,
//         "Moon" : swisseph.SE_MOON,
//         "Mercury" : swisseph.SE_MERCURY,
//         "Venus" : swisseph.SE_VENUS,
//         "Mars" : swisseph.SE_MARS,
//         "Jupiter" : swisseph.SE_JUPITER,
//         "Saturn" : swisseph.SE_SATURN,
//         "Uranus" : swisseph.SE_URANUS,
//         "Neptune" : swisseph.SE_NEPTUNE,
//         "Pluto" : swisseph.SE_PLUTO
// };

// let planetsReturn = {
//     "Sun" : {},
//     "Moon" : {},
//     "Mercury" : {},
//     "Venus" : {},
//     "Mars" : {},
//     "Jupiter" : {},
//     "Saturn" : {},
//     "Uranus" : {},
//     "Neptune" : {},
//     "Pluto" : {},
//     "Houses": [],
//     "Ascendant" : ""
// };

// strtime = function (value) {
//     var hour = Math.floor (value);
//     var minFrac = (value - hour) * 60;
//     var min = Math.floor (minFrac);
//     var sec = Math.floor ((minFrac - min) * 60);

//     return hour + ' ' + min + ' ' + sec;
// };

// logbody = function (name, body) {
//     var lang = body.longitude;
//     var house = Math.floor (lang / 30);
//     var lang30 = lang - house * 30;

//     console.log (name + ':', body.longitude, '|', strtime (lang30), '|', house, body.longitudeSpeed < 0 ? 'R' : '');
// //    console.log (name + ' info:', body);
// };


// // Julian day
// //MUST BE IN UTC

// swisseph.swe_julday (date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL, function (julday_ut) {
//     console.log ('Julian UT:', julday_ut);

//     swisseph.swe_deltat (julday_ut, function (deltat) {
//         console.log ('Delta T:', deltat.delta * 60 * 60 * 24);
//     });

//     //Planets
//     Object.keys(planets).forEach(function(key, index) {
//         swisseph.swe_calc_ut (julday_ut, planets[key], flag, function (body) {
//             planetsReturn[key] = body;
//            // logbody (key, body);
//         });
//     });

//     swisseph.swe_houses (julday_ut, place.lat, place.long, 'A', function (result){
//         console.log("houses: " , result);
//         planetsReturn.Houses = result.house;
//         planetsReturn.Ascendant = result.ascendant;
//         let ascendantLong = result.ascendant;
//         console.log('asc sign: ', zodiacInterpreter.getZodiacSign(ascendantLong))
//     });

//     swisseph.swe_sidtime (julday_ut, function (result) {
//         console.log ('Siderial time (dec):', result.siderialTime);
//         console.log ('Sidereal time (time):', strtime (result.siderialTime));
//     });



//     // Mean node position
//     swisseph.swe_calc_ut (julday_ut, swisseph.SE_MEAN_NODE, flag, function (body) {
//         logbody ('Mean node', body);
//     });

//     swisseph.swe_calc_ut (julday_ut, swisseph.SE_TRUE_NODE, flag, function (body) {
//         logbody ('True node', body);
//     });

//     swisseph.swe_calc_ut (julday_ut, swisseph.SE_MEAN_APOG, flag, function (body) {
//         logbody ('Mean apog', body);
//     });

//     swisseph.swe_calc_ut (julday_ut, swisseph.SE_OSCU_APOG, flag, function (body) {
//         logbody ('Oscu apog', body);
//     });

//     console.log(planetsReturn);
//     console.log("moon sign", zodiacInterpreter.getZodiacSign(planetsReturn.Moon.longitude))
// });

