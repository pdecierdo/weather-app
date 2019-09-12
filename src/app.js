const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Paul Decierdo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        imgPath: '/images/pp.jpg',
        name: 'Paul S. Decierdo',
        title: 'About'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'If you need help, just call me.',
        name: 'Paul S. Decierdo'
    });
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        
        forecast(latitude, longitude, (error, forecast) => {
            if(error){
                return res.send({
                    error
                })
            }
            
            res.send({
                location,
                forecast
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'That page does not exist! Are you trying to get some help?',
        linkName: 'Help',
        header: 'Help article not found.',
        route: '/help',
        title: '404',
        name: 'Paul S. Decierdo'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'That page does not exist! Are you trying to go to the Weather App?',
        linkName: 'Weather App',
        header: 'Page not found.',
        route: '/',
        title: '404',
        name: 'Paul S. Decierdo'
    })
})

app.listen(3000, () => {
    console.log('The server is already starting at port 3000!')
})