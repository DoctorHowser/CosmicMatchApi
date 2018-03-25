const readings = require('../data/analysis.json')

module.exports = {
  compare: getComparison
};

const userPlanets = [
  "Ascendant",
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto"
];
const lookupPlanets = [
  "Ascendant",
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto"
];

function getComparison(peopleCharts) {
  let comparison = 0;
  let squareCount = 0
  let totalAspects = 0;
  let angleObj = getAngles(peopleCharts);

  for (let name in angleObj) {
    let aspect = getAspect(angleObj[name].angle);

    angleObj[name].aspect = aspect;

    if (aspect != "N/A") {
      totalAspects++;
    }

    if (aspect != "Square" && aspect != "N/A") {
      comparison++;
    }

    if (aspect == "Square") {
      squareCount++
    }
  }

  comparison = getOutlyingAspects(angleObj, comparison);

  const percent = comparison / totalAspects
  const reading = getReading(percent)

  const response = {
    percent,
    reading
  }

  console.log(response)
  return response
}

function getReading(percentage) {
  const oneHundred = percentage * 100;
  let roundDown = Math.floor(oneHundred);

  if (roundDown < 60) roundDown = 60;
  if (roundDown > 95) roundDown = 80;

  roundDown = roundDown.toString();
  const result = readings[roundDown]

  return result;

}

function getOutlyingAspects(angleObj, comparison) {
  // except for  MARS conjunct Saturn or Neptune----NEGATIVE
  // except for MOON opposition to Saturn or conjunct Mars----NEGATIVE
  // except MOON conjunct Saturn------NEGATIVE

  if (angleObj["MarsSaturn"].aspect == "Conjunction") {
    comparison--;
  }
  if (angleObj["MarsNeptune"].aspect == "Conjunction") {
    comparison--;
  }
  if (angleObj["MoonSaturn"].aspect == "Opposition") {
    comparison--;
  }
  if (angleObj["MoonMars"].aspect == "Conjunction") {
    comparison--;
  }
  if (angleObj["MoonSaturn"].aspect == "Conjunction") {
    comparison--;
  }
  if (angleObj["SaturnMars"].aspect == "Conjunction") {
    comparison--;
  }
  if (angleObj["NeptuneMars"].aspect == "Conjunction") {
    comparison--;
  }
  if (angleObj["SaturnMoon"].aspect == "Opposition") {
    comparison--;
  }
  if (angleObj["MarsMoon"].aspect == "Conjunction") {
    comparison--;
  }
  if (angleObj["SaturnMoon"].aspect == "Conjunction") {
    comparison--;
  }

  return comparison;
}

function getAngles(peopleCharts) {
  let person1 = peopleCharts.personAChart;
  let person2 = peopleCharts.personBChart;

  person1.Ascendant = {
    longitude: person1.Ascendant
  };

  person2.Ascendant = {
    longitude: person2.Ascendant
  };
  let angleObj = {};
  for (let i = 0; i < userPlanets.length; i++) {
    for (let j = 0; j < lookupPlanets.length; j++) {
      let temp = person1[userPlanets[i]].longitude -
        person2[lookupPlanets[j]].longitude;
      //normalize if negative
      if (temp < 0) {
        temp = temp * (-1);
      }

      //normalize to use shorter path around circle
      if (temp > 180) {
        temp = 360 - temp;
      }
      angleObj[userPlanets[i] + lookupPlanets[j]] = temp;
    }
  }

  for (let i = 0; i < userPlanets.length; i++) {
    for (let j = 0; j < lookupPlanets.length; j++) {
      let temp = person1[userPlanets[i]].longitude -
        person2[lookupPlanets[j]].longitude;
      //normalize if negative
      if (temp < 0) {
        temp = temp * (-1);
      }

      //normalize to use shorter path around circle
      if (temp > 180) {
        temp = 360 - temp;
      }
      angleObj[userPlanets[i] + lookupPlanets[j]] = {
        angle: temp,
        aspect: ""
      };
    }
  }

  return angleObj;
}

function getAspect(angle) {
  //+- 12 degress
  // Conjunction: 0 degrees
  //
  // Opposition: 180 degrees
  //
  // Trine: 120 degrees
  //
  // Square: 90 degrees
  //
  // Sextile: 60 degrees



  if (angle <= 12) {
    return "Conjunction"; //+
  } else if (48 < angle && angle < 72) {
    return "Sextile"; //+
  } else if (78 < angle && angle < 102) {
    return "Square"; //-
  } else if (108 < angle && angle < 132) {
    return "Trine"; //+
  } else if (168 < angle) {
    return "Opposition"; //+
  } else {
    return "N/A";
  }
}



