const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode')
const app = express()

// console.log(__dirname)
const dirPath = path.join(__dirname,'../public') 
const viewPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

hbs.registerPartials(partialsPath)

app.set('view engine' , 'hbs' )
app.set('views' , viewPath)

app.use(express.static(dirPath))

app.get( '' , (req , res) => {
    res.render( 'index.hbs' , {
        title : 'Weather' ,
        name : 'Nikhil Chopra'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nikhil Chopra'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help' ,
        helpText: 'This is some helpful text.',
        name : 'Nikhil Chopra'
    })
})

app.get('/weather' , (req,res)=> {
    if( ! req.query.address){
        return res.send({
            error : "You must provide in an address !!"
        })
    }
    geocode( req.query.address , (error ,{latitude , longitude , location} = {} ) => {
        if(error){
            return res.send( { error } )
        }
        forecast( latitude , longitude , (error,forecastData) => {
            if(error){
                return res.send( { error } )
            }
            const {temperature} = forecastData
            res.send({
                // forecast : forecastData ,
                location ,
                temperature : temperature
            })
            // console.log(location)
            // console.log(temperature)
        })
    })
    // res.send({
    //     address : req.query.address
    // })
})

app.get('/help/*' , (req,res) => {
    res.render('404' , {
    title : '404',
    name : 'Nikhil Chopra',
    errorMessage : 'Help article not found !'
    })
})

app.get('*' , (req,res) => {
    res.render('404' , {
        title : '404',
        name : 'Nikhil Chopra',
        errorMessage : 'Page not found !'
    })
})

app.listen(3000 , ()=> {
    console.log('Server on port 3000')
})