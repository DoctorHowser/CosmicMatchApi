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
            year:'1984',
            month:'03',
            hour:'11',
            lat:'40.9791',
            lon:'-74.1165',
            timeZone:'America/New_York',
            day:'29',
            minute:'07'
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
        //ERROR!
    })
}