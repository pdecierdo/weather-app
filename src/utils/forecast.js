const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/e14cf722e20cca3f90437627d95a821d/${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('You can\'t connect to the weather service.', undefined);
        }
        else if(body.error){
            callback('Unable to find location!', undefined);
        }
        else{
            const forecast = `${body.daily.data[0].summary} Currently, it is ${Math.round(body.currently.temperature)} degrees out there. There is also a ${body.currently.precipProbability * 100}% chance of rain.`;
            callback(undefined, forecast); 
        } 
    });
}

module.exports = forecast;