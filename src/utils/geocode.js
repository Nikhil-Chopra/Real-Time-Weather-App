const request = require('postman-request');

const geocode = (address ,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + 
    '.json?access_token=pk.eyJ1IjoibmlraGlsY2hvcHJhIiwiYSI6ImNrYzk4MTd2eDFnYTgydHFwZXVvdWR2bDYifQ.puFBM02hjzELwfFR0s11Nw&limit=1'

    request({ url ,json : true},(error , {body} = {} ) => {
        if(error){
            callback('Unable to connect to the server !',undefined)
        }else if( body.features.length === 0){
            callback('Unable to find location Try another one.',undefined)
        }else{
            callback(undefined , {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode