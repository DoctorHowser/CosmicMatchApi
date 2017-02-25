let request = require('request-promise')

module.exports = {
    getEphemeris : getEphemeris
}


let endpoint = 'https://ephemeris-api.herokuapp.com/ephemeris'


//();




function getEphemeris(person) {
    let options = {
        method: 'GET',
        uri: endpoint,
        qs: {
            year: person.year,
            month: person.month,
            hour: person.hour,
            lat: person.lat,
            lon: person.lon,
            timeZone : person.timezone,
            day: person.day,
            minute: person.minute
            // access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
        },
        // headers: {
        //     'User-Agent': 'Request-Promise'
        // },
        json: true // Automatically stringifies the body to JSON
    };


    return request(options).then(function(response){
        return response
    }).catch(function(err) {
       console.log('error in ephemeris!') //ERROR!
    })
}