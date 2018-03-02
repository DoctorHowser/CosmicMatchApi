var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://cosmicmatch.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://cosmicmatch-api.herokuapp.com/',
    issuer: "https://cosmicmatch.auth0.com/",
    algorithms: ['RS256']
});

module.exports = jwtCheck;