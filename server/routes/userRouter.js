const express = require('express');
const jwtCheck = require('../middleware/auth')
//const encryptLib = require('../modules/encryption');
const sqlService = require('../services/sqlService');
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

router.get('/login', jwtCheck, (req, res) => {
  const userId = req.user.sub;
    sqlService.getUserData(userId).then(json => {
      res.json(json);
    }).catch(err => {
      if (err === 204) {
        res.sendStatus(204);
      } else {
        res.sendStatus(500);
      }
    });
})

router.post('/create', jwtCheck, function(req, res) {
  const auth0id = req.user.sub
  const { day, month, year, hour, minute, lat, lon, timezone } = req.body.data;
  const query1 = `INSERT INTO auth0user(auth0_user_id) VALUES ($1) RETURNING ID;`
  pool.query(query1, [auth0id]).then((response) => {
    
    const newId = response.rows[0].id;
    const query2 = `INSERT INTO birthinfo(day, month, year, hour, minute, latitude, longitude, timezone, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, ${newId});`

    pool.query(query2, [day, month, year, hour, minute, lat, lon, timezone]).then((response) => {
      res.sendStatus(201);
    }).catch(err => {
      res.sendStatus(500);
    })
  }).catch(err => {
    res.status(400).sendStatus(err.message)
  })
});


router.put('/update', jwtCheck, function(req, res) {
  const auth0id = req.user.sub
  const { day, month, year, hour, minute, lat, lon, timezone } = req.body.data;
  const query2 = `UPDATE birthinfo SET (day, month, year, hour, minute, latitude, longitude, timezone
    ) = ($1, $2, $3, $4, $5, $6, $7, $8) WHERE user_id = (SELECT id from auth0user WHERE auth0_user_id = '${auth0id}' );`

    pool.query(query2, [day, month, year, hour, minute, lat, lon, timezone]).then((response) => {
      res.sendStatus(201);
    }).catch(err => {
      res.sendStatus(500);
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



module.exports = router;
