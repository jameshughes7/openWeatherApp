const request = require('request');
var config = require('./config');
let apiKey = config.apiKey;
let city = 'portland';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

request(url, function(error, response, body) {
  if(error) {
    console.log('error: ', error);
  } else {
    console.log('body: ', body);
  }
});
