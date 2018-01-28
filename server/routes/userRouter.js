const express = require('express');
//const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // send back user object from database
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    res.send(false);
  }
});

router.get('/login/:id', (req, res) => {
  const userId = req.params.id;
  const queryText = 
  `SELECT 
    a.*, 
    m.match_percent, 
    m.match_text, 
    m.match_name, 
    b.day,
    b.month, 
    b.year, 
    b.hour, 
    b.minute, 
    b.latitude, 
    b.longitude,
    b.timezone 
  FROM 
    auth0user a 
  JOIN 
    birthinfo b 
  ON 
    (a.id = b.user_id)
  FULL OUTER JOIN 
    match m 
  ON 
    (b.user_id = m.user_id) 
  WHERE a.auth0_user_id =  $1`;

  pool.query(queryText, [userId]).then(function(response){
    if(response.rows.length > 0) {
      const rows = response.rows;
      const userBirthData = getUserBirthData(rows[0])
      const userMatches = getUserMatches(rows)

      const responseJSON =  {
        userId : userId,
        userBirthData : userBirthData,
        userMatches : userMatches
      }

      res.json(responseJSON);
    } else {
       //NO USER INFO FOUND, first time accessing.
       res.sendStatus(204)
    }
  }).catch(function(errorResponse){
    res.status(500).send(errorResponse);
  });
})

router.post('/create', function(req, res) {
  const { day, month, year, hour, minute, lat, lon, timezone, auth0id } = req.body.data;
  const query1 = `INSERT INTO auth0user(auth0_user_id) VALUES ($1) RETURNING ID;`
  pool.query(query1, [auth0id]).then((response) => {
    
    const newId = response.rows[0].id;
    const query2 = `INSERT INTO birthinfo(day, month, year, hour, minute, latitude, longitude, timezone, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, ${newId});`

    pool.query(query2, [day, month, year, hour, minute, lat, lon, timezone]).then((response) => {
      res.sendStatus(201);
    })
  }).catch(err => {
    res.status(400).sendStatus(err.message)
  })
});
// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
// router.get('/')

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
// router.post('/login', userStrategy.authenticate('local'), (req, res) => {
//   res.sendStatus(200);
// });

// clear all server session information about this user
// router.get('/logout', (req, res) => {
//   // Use passport's built-in method to log out the user
//   req.logout();
//   res.sendStatus(200);
// });

function getUserBirthData(row) {
  const dobObject = {
    hour : row.hour,
    minute : row.minute,
    day : row.day,
    month : row.month,
    year : row.year,
    hour : row.hour,
    lat : row.latitude,
    lon : row.longitude
  }

  return dobObject;
}

function getUserMatches(rows) {
  let responseArray = [];
  rows.forEach(row => {

    //TODO: figure out what to do for nulls? 

    const rowObject = {
      name : row.match_name,
      percent : row.match_percent,
      text : row.match_text
    }
    responseArray.push(rowObject)
  });

  return responseArray;
}

module.exports = router;
