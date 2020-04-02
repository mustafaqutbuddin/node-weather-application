const path = require('path')
const express = require('express')
const hbs = require('hbs')
const fetchWeatherData = require('./utils/weather')
const chalk = require('chalk')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const hbsViewsDirectoryPath = path.join(__dirname, '../templates/views')
const hbsPartialsDirectoryPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and view (templates) setup
app.set('view engine', 'hbs')
app.set('views', hbsViewsDirectoryPath)
hbs.registerPartials(hbsPartialsDirectoryPath)

//setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mustafa Qutbuddin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mustafa Qutbuddin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mustafa Qutbuddin'
    })
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide the address'
        })
    }

    //networking
    fetchWeatherData(req.query.address, (error, data) => {
        debugger
        if (error) {
            return res.send({
                error
            })
        }

        const { temp, address, rainChance } = data
        res.send({
            forecast: temp,
            address,
            rainChance
        })
        console.log(chalk.bold.inverse.green(`It is currently ${temp} degrees in ${address}. It has ${rainChance}% chances of rain.`))
    })


})



app.get('/help/*', (req, res) => {
    res.render('404NotFound', {
        title: 'Help'
    })
})

app.get('*', (req, res) => {
    res.render('404NotFound', {
        title: 'Wildcard'
    })
})








app.listen(3000, () => {
    console.log('Server is up on port 3000')
})