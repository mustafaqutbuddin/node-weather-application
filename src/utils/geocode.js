const fetch = require('node-fetch')
const chalk = require('chalk')




const fetchCordinates = (address, callback) => {
    const mapBoxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaW11c3RhZmFxdXRidWRkaW4iLCJhIjoiY2s4ZW16bm95MGpiNTNvbjFhcW9qZTlseSJ9.CcZC-lBpV9bIyVh7_zvucw&limit=1`
    fetch(mapBoxURL)
        .then(res => res.json())
        .then(json => {
            if (json.features.length == 0) {
                // console.log(chalk.inverse.bold.red('Something went wrong, Please try again later.'))
                callback('Something went wrong, Please try again later.', undefined)
            } else {
                console.log(chalk.inverse.green('SUCCESS'))
                const lat = json.features[0].center[1]
                const long = json.features[0].center[0]
                const placeName = json.features[0].place_name
                callback(undefined, { lat, long, placeName })
                // console.log(`LATITUDE: ${lat} LONGITUDE: ${long}`)
            }
        })
        .catch(err => {
            // console.log(chalk.inverse.bold.red('Unable to connect to the server'))
            callback('Unable to connect to the server', undefined)
        })
}


module.exports = fetchCordinates