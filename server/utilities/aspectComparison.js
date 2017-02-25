
module.exports = {
    compare : getComparison
};

const userPlanets = [0, 0, 0, 1, 3, 4];
const lookupPlanets = [0, 1, 3, 3, 4, 3];

//sun, moon, merc, ven, mar, jup, sat, uran, nep, pluto
var x = 3;
var y = 9;


//
// sun sun
// sun moon
// sun venus
// moon venus
// venus mars
// mars venus
// asc asc


function getComparison(person1, person2) {

    let comparison = 0;
    let angleList = getAngles(person1, person2);

    console.log(angleList);

    for (let i = 0; i <angleList.length; i++) {
        let aspect = getAspect(angle);

        if (aspect != "Square" || aspect != "N/A") {
            comparison++
        }

        if (aspect == "Square") {
            comparison--
        }

        console.log (comparison / 7);
    }


}

function getAngles(person1, person2) {



    let angleList = [];
    console.log("got to getAngles!", userPlanets.length);
    for (let i = 0; i< userPlanets.length; i++) {




        let temp = person1.outerPlanets[userPlanets[i]].longitude - person2.outerPlanets[lookupPlanets[i]].longitude;
        //normalize if negative
        if (temp < 0) {
            temp = temp * (-1);
        }

        //normalize to use shorter path around circle
        if (temp > 180) {
            temp = 360 - temp;
        }

        angleList.push(temp)
    }

    console.log("after for loop");
    return angleList;
}
    // console.log(person1.outerPlanets[x].name);
    // console.log(person1.outerPlanets[x].longitude);
    // console.log(person2.outerPlanets[x].name);
    // console.log(person2.outerPlanets[x].longitude);
    //person1.ascendant

    // console.log(person1.outerPlanets[x].longitude + person1.outerPlanets[x].name);
    // console.log(person2.outerPlanets[y].longitude + person2.outerPlanets[y].name);
    //
    //
    // console.log('angle: ' + angle);
    //
    // var aspect = getAspect(angle);
    // console.log(aspect);


function getAspect(angle) {
    if (angle < 15) {
        return "Conjunction"; //+
    }

    else if (50 < angle && angle < 70){
        return "Sextile"; //+
    }

    else if (80 < angle && angle < 100){
        return "Square";//-
    }

    else if (110 < angle && angle < 130){
        return "Trine";//+
    }

    else if (165 < angle){
        return "Opposition"; //+
    }

    else {
        return "N/A";
    }
}


//function getAngles(person1, person2) {
// use arrays of degrees for each person to make an object of the comparison and the angle created
//return object of angles for each comparison}

//
// Conjunction: 0 degrees
//
// Opposition: 180 degrees
//
// Trine: 120 degrees
//
// Square: 90 degrees
//
// Sextile: 60 degrees