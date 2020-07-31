const request = require('postman-request')


const forecast = ( latitude , longitude , callback ) =>{
    const url = 'http://api.weatherstack.com/current?access_key=b88108a95bab4fe2fe226514611cd5e1&query=' + latitude +',' + longitude
    // console.log(url)
    request({url , json : true} , (error , {body} = {} ) => {
        if(error){
            callback('Unable to connect to the server !',undefined)
        }else if(body.error ){
            callback('Unable to find location Try another one.',undefined)
        }else{
            callback(undefined,{
                temperature : body.current.temperature
            })
        }
    })
}

module.exports = forecast