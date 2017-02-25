
module.exports = {
    getZodiacSign : getZodiacSign,
    getDegrees : getDegrees

};


function getZodiacSign(longitude) {
    if (longitude > 360 || longitude < 0 || !longitude) return false;

    var reducedLong = Math.floor(longitude / 30);

    return zodiacSigns[reducedLong];

}

function getDegrees (longitude) {
    var sign = getZodiacSign(longitude);
    var baseLong = zodiacLongitude[sign];

    var  signLongitude = {sign : sign,
                            longitude : (longitude - baseLong) };

    console.log (signLongitude.sign + '\n' + signLongitude.longitude);
}

var zodiacSigns = {
    0: 'Ares',
    1: 'Taurus',
    2: 'Gemini',
    3: 'Cancer',
    4: 'Leo',
    5: 'Virgo',
    6: 'Libra',
    7: 'Scorpio',
    8: 'Sagittarius',
    9: 'Capricorn',
    10: 'Aquarius',
    11: 'Pieces'
};
var zodiacLongitude = {
    'Ares' : 0,
    'Taurus' : 30,
    'Gemini' : 60,
    'Cancer' : 90,
    'Leo' : 120,
    'Virgo' : 150,
    'Libra' : 180,
    'Scorpio' : 210,
    'Sagittarius' : 240,
    'Capricorn' : 270,
    'Aquarius' : 300,
    'Pieces' : 330
};