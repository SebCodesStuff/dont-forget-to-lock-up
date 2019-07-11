
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const haversine = require('haversine')
const bcrypt = require('bcrypt')

const User = require('./models/users.js')
const Home = require('./models/homes.js')

require("./models")


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post("/user", (req, res, next) => {
    const { first_name, last_name, email, password } = req.body
    bcrypt.hash(password, 10, (err, hash) => {
        return User.create({
            first_name,
            last_name,
            email,
            password: hash
        })
        .then(() => res.send('User successfully created'))
        .catch(err => {
            console.error(err)
            next()
        })
    })
})

app.post("/home", function(req, res, next) {
    const { longitude, latitude, UserId } = req.body
    return Home.create({
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
        UserId
    })
    .then(() => {
        res.end(`Successfully added home location at 
        \nlatitude:${latitude}
        \nlongitude:${longitude}
    `)
    })
    .catch(err => {
        console.error(err)
        next()
    })
})

app.get("/user", (req, res) => {
    res.end()
    return User.findAll()
    .then(user => {
        console.log(user[0].dataValues)
        res.send(user[0].dataValues)
    })
})

app.get("/home", (req, res) => {
    return Home.findAll()
    .then(home => {
        console.log(home[0].dataValues)
        res.status(200).send(home)
    })
})

app.post("/check", function(req, res) {
    const { longitude: startLong, latitude: startLat, UserId } = req.body
    return Home.findOne({
        where: { UserId } 
    })
    .then(home => {
        const { latitude, longitude } = home.dataValues
        const start = {
            longitude: parseFloat(startLong),
            latitude: parseFloat(startLat)
        }

        const end = {
          latitude,
          longitude
        }
        const distanceFromHome = haversine(start, end, {unit: 'meter'})
        
        if (distanceFromHome > 200) res.end("Don't forget to lock up")
        else res.end('Still at the house')
    })
    .catch(err => console.log(err))
      
})

http.createServer(app).listen(4000, function() {
    console.log("Express server listening on port 4000")
})