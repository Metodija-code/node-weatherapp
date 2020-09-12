const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c9cb654211f7e30313f24bf887719f45&query=${latitude},${longitude}`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("App services not available", undefined);
    } else if (response.body.success === false) {
      callback("Unable to find location", undefined);
    } else {
      const responseData = response.body;
      const { temperature, feelslike } = responseData.current;
      const weather_descriptions = responseData.current.weather_descriptions[0];
      const data = {
        temperature,
        feelslike,
        weather_descriptions,
      };

      callback(undefined, data);
    }
  });
};

module.exports = forecast;

//forecast(44.15, -75.22, (error, data) => {});
