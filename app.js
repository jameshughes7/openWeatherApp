const request = require('request');
var config = require('./config');
let apiKey = config.apiKey;
let city = 'portland';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`


request(url, function(error, response, body) {
  if(error) {
    console.log('error: ', error);
  } else {
    let weather = JSON.parse(body);
    let message = `It's ${weather.main.temp} degrees in ${weather.name}!`
    console.log(message);
  }
});
