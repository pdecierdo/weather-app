const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoicHNkZWNpZXJkbyIsImEiOiJjazBkYWh0bWYwNXdvM2lwODg2cW5kdmw5In0.c3vqGFZ_qi6sxlA4PHcc8w`;
    request({ url, json: true }, (error, { body }) => {
        if(body.features.length === 0){
            callback('The location was not found.', undefined);
        }
        else if(!error){
            const latitude = body.features[0].center[1], longitude = body.features[0].center[0], location = body.features[0].place_name;
            callback(undefined, {
                latitude,
                longitude,
                location
            });
        } 
        else{
            callback('You can\'t connect to the Geocoding service!', undefined);
        }
    });
}

module.exports = geocode;