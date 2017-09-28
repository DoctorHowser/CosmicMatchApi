var Person = require('../external/astrologyjs').Person;
var Chart = require('../external/astrologyjs').Chart;
var ChartFactory = require('../external/astrologyjs').ChartFactory;
let aspectUtility = require('../utilities/aspectComparison');
let ephemerisService = require('./ephemerisService')

// const test = getComparison();
// console.log(test)

module.exports = {
    getComparison : getComparison
};

function getComparison (personA, personB) {
    return makePeople(personA, personB)
        .then(
            peopleObject => {
                return getCharts(peopleObject.personA, peopleObject.personB).then(
                        chartsResult => {
                            return makeComparison(chartsResult)
                        }
                )
            })
        .catch(
            err => {
                return "ERROR! Comparison not made" + err;
            });
}


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
    // console.log("got to getCharts", perA, perB);
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
    
    return aspectUtility.compare(chartsObject)

}


