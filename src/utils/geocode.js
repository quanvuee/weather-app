const request = require('request')

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)  +'.json?access_token=pk.eyJ1IjoicXVhbnZ1ZWUiLCJhIjoiY2t3ZzBsNWFjMGs0cjJwbW80bWNhMW8wdiJ9._cQFXzVvHNjYRtKeicCBgA&limit=1'
    request({url,json:true},(error,{body:{features}={}} = {}) =>{
        if(error){
            callback("unable to connect to mapbox server",undefined)
        } else if(features.length === 0){
            callback("location is not found",undefined)
        } else {
            callback(undefined,{
                lat:features[0].center[1],
                lon:features[0].center[0],
                location: features[0].place_name
            })
        }       
    })
}

module.exports = geocode

