const request = require('request')

const forecast = (lat,lon,callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=ab49435f468d42aa9a2fa1de32df74a4&query="+ lat + "," + lon
    request({url,json:true},(error,response,body) => {
        if (error) {
            callback("unable to connect to weather server",undefined)
        } else if(body.error){
            callback('unable to get weather',undefined)
        } else{
            callback(undefined,"It is currently " + body.current.temperature + " degrees out.")
        }
    })
}

module.exports = forecast