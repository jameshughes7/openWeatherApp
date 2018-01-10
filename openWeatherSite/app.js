const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const request = require('request');
var config = require('./config');


const apiKey = config.apiKey;

//Settig up template engine
app.set('view engine', 'ejs');

//Expose the pulic directory
app.use(express.static('public'));

//Setting up middleware (allows us acceess to req and res objects)
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log(`App listening on port ${port}`)
})
