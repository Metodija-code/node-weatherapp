const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();

// app.com
// app.com/help  - routes
// app.com/about - routes

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));
console.log(__dirname);

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");
console.log(partialsPath);
app.use(express.static(publicDirectoryPath));
// by default express is gonna look for views folder in the route
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// for dynamic pages  hbs
// route handler

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "MitovCoding",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about from Node",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page DynamicTitle ",
  });
});
app.get("/help/data", (req, res) => {
  res.render("help", {
    title: "Help page Data ",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mito",
    errorMessage: "Help product not found",
  });
});

/// QUERY STRING
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search",
    });
  }

  res.send({
    products: [],
  });

  //console.log(req.query.search);
  //console.log(req.query);
});

app.get("/weather", (req, res) => {
  if (!req.query.adress) {
    return res.send({
      error: "You must provide adress",
    });
  }

  geoCode(req.query.adress, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        adress: req.query.adress,
      });
    });
  });
});

/////////////
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mito",
    errorMessage: "Page not found",
  });
});

/*app.get("", (req, res) => {
  res.send("<h1>Weather</h1>");
});

app.get("/help", (req, res) => {
  res.send([{ name: "andrew" }, { name: "john" }]);
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/weather", (req, res) => {
  res.send("Check weather");
});*/

app.listen(3000, () => {
  console.log("Server running");
});
