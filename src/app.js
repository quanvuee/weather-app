const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app = express()

//Defined path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views loaction
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Quan Vu'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: "Quan Vu"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'This is some helpful text',
        title: 'Help',
        name: "Quan Vu"
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error:"You must provide address!"
        })
    }
    console.log('searching for '+ req.query.address)
    geocode(req.query.address,(error,{lat,lon,location} = {})=>{
        if (error) {
            return res.send({error})
        } 
        forecast(lat,lon,(forecastError,forecastData)=>{
            if (forecastError) {
                return res.send({
                    error:forecastError 
                })
            } 
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address 
            })
        })
    })


})

app.get('/help/*',(req,res)=>{
    res.render('notFound',{
        message:'-Help article not found.',
        title:'Help',
        name:'Quan Vu'
    })
})

app.get('*',(req,res)=>{
    res.render('notFound',{
        message:'Page not found',
        title:'Weather app',
        name:'Quan Vu'
    })
})
app.listen(3000,()=>{
    console.log('server is up on port 3000')
})