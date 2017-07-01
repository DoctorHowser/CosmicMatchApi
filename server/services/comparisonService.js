var Person = require('../external/astrologyjs').Person;
var Chart = require('../external/astrologyjs').Chart;
var ChartFactory = require('../external/astrologyjs').ChartFactory;
let aspectUtility = require('../utilities/aspectComparison');
let ephemerisService = require('./ephemerisService')

let chartMelo;
let chartSteven;

let infoA = {
  name: "Julie",
  year: "1970",
  month: "01",
  day: "21",
  hour: "22",
  minute: "57",
  timezone: "America/Los_Angeles",
  //pacific
  //36n10'30"
  //115w8'11"
  lat: 36.1750,
  lon: -115.136388

};
let infoB = {
  name: "Nichola",
  year: "1969",
  month: "07",
  day: "24",
  hour: "20",
  minute: "52",  
  timezone: "America/Los_Angeles",
  //pacific
  //34n1'10"
  //118w29'25"
  lat:  34.01944,
  lon:  -118.49027
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
    
    return aspectUtility.compare(chartsObject)

}


