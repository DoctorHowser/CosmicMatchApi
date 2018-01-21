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
  const queryText = `SELECT 
                        a.*, 
                        m.match_percent, 
                        m.match_text, 
                        m.match_name, 
                        b.date_time, 
                        b.latitude, 
                        b.longitude 
                      FROM 
                        auth0user a 
                      JOIN 
                        match m 
                      ON 
                        (a.id = m.user_id) 
                      JOIN 
                        birthinfo b 
                      ON 
                        (m.user_id = b.user_id) 
                      WHERE a.auth0_user_id = $1`;
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
  const newUser = req.body.data;
  const query1 = `INSERT INTO auth0user(auth0_user_id) VALUES ($1) RETURNING ID;`

  pool.query(query1, [newUser.auth0id]).then((response) => {
    const dateTime = new Date(newUser.dateTime)
    const newId = response.rows[0].id;
    const query2 = `INSERT INTO birthinfo(date_time, latitude, longitude, user_id) VALUES ($1, $2, $3, ${newId});`

    pool.query(query2, [dateTime, newUser.latitude, newUser.longitude]).then((response) => {
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
    dateTime : row.date_time,
    latitude : row.latitude,
    longitude : row.longitude
  }

  return dobObject;
}

function getUserMatches(rows) {
  let responseArray = [];
  rows.forEach(row => {

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
