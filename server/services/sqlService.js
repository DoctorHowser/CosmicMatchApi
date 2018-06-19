const pool = require('../modules/pool');

let service = {
    getUserData: getUserData,
    saveMatch: saveMatch
}

module.exports = service;

function getUserData (userId) {
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
  
    return pool.query(queryText, [userId])
    .then(function(response){
      if(response.rows.length > 0) {
        const rows = response.rows;
        const userBirthData = getUserBirthData(rows[0])
        const userMatches = getUserMatches(rows)
  
        const responseJSON =  {
          userId : userId,
          userBirthData : userBirthData,
          userMatches : userMatches
        }
  
        return responseJSON
      } else {
         //NO USER INFO FOUND, first time accessing.
         throw (204);
      }
    }).catch( (error) => {
        throw error;
    });
}

function saveMatch(matchData, userId, name) {
  //user_id is an int, have the actual userID
    const queryText = 
    `INSERT INTO match 
    (user_id, match_percent, match_text, match_name) 
    VALUES (
      (SELECT id from auth0user WHERE auth0user.auth0_user_id = $1), $2, $3, $4)
       RETURNING *;`

    return pool.query(queryText, [userId, matchData.percent, matchData.reading, name])
    .then(function(response){
        if(response.rows.length > 0) {

          const row = response.rows[0]
          const responseJSON = {
            name : row.match_name,
            percent : row.match_percent,
            reading : row.match_text
          }
  
          return responseJSON
        }
    })
    .catch( (err) => {
        throw err;
    });
}

function getUserBirthData(row) {
    const dobObject = {
      hour : row.hour,
      minute : row.minute,
      day : row.day,
      month : row.month,
      year : row.year,
      hour : row.hour,
      lat : row.latitude,
      lon : row.longitude,
      timezone : row.timezone
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
        reading : row.match_text
      }
      responseArray.push(rowObject)
    });
  
    return responseArray;
  }
