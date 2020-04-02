const fetch = require('node-fetch')
const chalk = require('chalk')
const fetchCordinates = require('./geocode')


const fetchWeatherData = (address, callback) => {

    fetchCordinates(address, (error, data) => {
        if (error) {
            callback(error, undefined)
            console.log(chalk.inverse.bold.red(error))
            return
        }

        console.log(`LATITUDE: ${data.lat} LONGITUDE: ${data.long}`)

        const darkSkyURL = `https://api.darksky.net/forecast/76d0708eaa134b89efa5b4f0acf70167/${data.lat},${data.long}`

        fetch(darkSkyURL)
            .then(res => res.json())
            .then(json => {
                if (json.error) {
                    // console.log(chalk.inverse.bold.red('Something went wrong, Please try again later.'))
                    callback('Something went wrong, Please try again later.', undefined)
                } else {
                    // callback(json.temperature, json.precipIntensity, address)
                    // console.log(chalk.bold.inverse.green(`It is currently ${json.currently.temperature} degrees in ${address}. It has ${json.currently.precipIntensity}% chances of rain.`))
                    const temp = json.currently.temperature
                    const rainChance = json.currently.precipIntensity
                    const address = data.placeName
                    callback(undefined, { temp, address, rainChance })
                }
            }).catch(err => {
                // console.log(chalk.inverse.bold.red(err.message))
                callback('Unable to connect to the server', undefined)
            })

    })
}


module.exports = fetchWeatherData