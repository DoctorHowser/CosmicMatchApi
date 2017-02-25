var Person = require('../external/astrologyjs').Person;
var Chart = require('../external/astrologyjs').Chart;
var ChartFactory = require('../external/astrologyjs').ChartFactory;
let aspectUtility = require('../utilities/aspectComparison');
let ephemerisService = require('./ephemerisService')

let chartMelo;
let chartSteven;

let infoA = {
    name : "Lisa",
    year : "1970",
    month : "09",
    day : "10",
    hour : "09",
    minute : "06",
    timezone : "America/New_York",
    lat: 37.6853,
    lon: -122.1200
    // dob : "1970-09-10T09:06Z",
    // place : {
    //     lat: 37.6853,
    //     lng: -122.1200
    // }
};
let infoB = {
    name: "Blair",
    year : "1962",
    month : "01",
    day : "24",
    hour : "12",
    minute : "53",
    timezone : "America/New_York",
    lat: 38.5600,
    lon:  -121.4900
    // dob: "1962-01-24T12:53Z",
    // place: {
    //     lat: 38.5600,
    //     lng: -121.4900
    // }
};
getComparison();

module.exports = {
    getComparison : getComparison
};

function getComparison () {
    return makePeople(infoA, infoB)
        .then(
            peopleObject => {

                // return makeChart(peopleObject.personA).then(
                //     response => {
                //         console.log("here is person A Chart:", response);
                //     }
                // )
                //     .catch(
                //         err => {
                //             return "ERROR! Comparison not made" + err;
                //         })
                return getCharts(peopleObject.personA, peopleObject.personB).then(
                        chartsResult => {
                            console.log('right before make comparison')
                            return makeComparison(chartsResult)
                        }
                )
            })
        .catch(
            err => {
                return "ERROR! Comparison not made" + err;
            });
}







    // console.log("got to getComparison");
    // return Person.create("Lisa", "1970-09-10T09:06Z", {lat: 37.6853, lng: -122.1200}).then(
    //     p1 => {
    //         personA = p1;
    //         let personAChart = getChart(personA).then(
    //             c => {
    //                 console.log("personAChart", c)
    //             }
    //         );
    //
    //         Person.create("Blair", "1962-01-24T12:53Z", {lat: 38.5600, lng: -121.4900}).then(
    //             p2 => {
    //                 personB = p2;
    //                 let personBChart = getChart(personB);
    //                 console.log(personBChart);
    //                 let array = [personAChart, personBChart];
    //                 console.log(array);
    //                 return array;
    //             })
    //     })

function makePeople(perA, perB){
    return Promise.all([makePerson(perA),makePerson(perB)]).then(
        values => {
            let peopleObject = {
                personA : values[0],
                personB : values[1]
            };
            return peopleObject;
        }

    )
}

function makePerson(person) {
    // return Person.create(person.name, person.dob, person.place).then(
    //     p => {
    //         return p
    //     }
    // )
    
    
    let personObj =  {
          year : person.year,
          month : person.month,
          day : person.day,
          hour : person.hour,
          minute : person.minute,
          timezone : person.timezone,
          lat: person.lat,
          lon: person.lon
      }  

    return new Promise(function(resolve, reject){
      resolve (personObj)
    })
}

function getCharts(perA, perB) {
    console.log("got to getCharts", perA, perB);
    return Promise.all([makeChart(perA), makeChart(perB)])
        .then(
            results => {
                let chartsObject = {
                    personAChart : results[0],
                    personBChart : results[1]
                };
                return chartsObject
            })
        .catch(
            err=> {
                console.log( "problem in getCharts", err)
            }
        )
    }


function makeChart(person) {
    return ephemerisService.getEphemeris(person).then(
        c => {
            return c;
            // ... do stuff with your chart ...
        })
        .catch(
            err => {
                console.log("error in ephemeris", err)
            }
        )
}

function makeComparison(chartsObject){
    
    aspectUtility.compare(chartsObject)
    return 5;
}

//
//
//                     ChartFactory.create("person1 Chart Test", personA).then(
//                         c => {
//                             chartMelo = c;
//                             // ... do stuff with your chart ...
//
//                             console.log("here is p1 ascendant", chartMelo);
//                             // for(let i = 0; i < chart.aspects.length; i++){
//                             //     console.log(chart.aspects[i]);
//                             // }
//                             // for(let i = 0; i < chart.outerPlanets.length; i++){
//                             //     console.log(chart.outerPlanets[i]);
//                             // }
//                             //zodiac.getZodiacSign(chart.houses[0]);
//                             // console.log(chart.outerPlanets[3].name);
//                             // console.log(chart.outerPlanets[3].longitude);
//                             // zodiac.getDegrees(chart.outerPlanets[3].longitude);
//
//                             //ComparisonChart? For Trine, Square, etc?
//                             //
//                         },
//                         err => {
//                             console.log("Ruh, roh. Something went wrong in ChartFactory.", err)
//                         }
//                     );
//
//                     ChartFactory.create("Person 2 Chart Test", personB).then(
//                         c => {
//                             chartSteven = c;
//                             // ... do stuff with your chart ...
//                             //console.log("aspects: " + chart.aspects[0].type + chart.aspects[0].orb + chart.aspects[0].isApplying());
//                             console.log("here is p2 ascendant: ", chartSteven);
//                             // for(let i = 0; i < chart.aspects.length; i++){
//                             //     console.log(chart.aspects[i]);
//                             // }
//                             // for(let i = 0; i < chart.outerPlanets.length; i++){
//                             //     console.log(chart.outerPlanets[i]);
//                             // }
//                             // zodiac.getZodiacSign(chartSteven.houses[0]);
//                             // console.log(chartSteven.outerPlanets[3].name);
//                             // console.log(chartSteven.outerPlanets[3].longitude);
//                             // zodiac.getDegrees(chartSteven.outerPlanets[3].longitude);
//                             // aspectComp.compare(chartMelo, chartSteven)
//
//                         },
//                         err => {
//                             console.log("Ruh, roh. Something went wrong in ChartFactory.", err)
//                         }
//                     );
//                 });
//         });
// }
//
