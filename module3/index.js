const express = require("express");
const Datastore = require("nedb");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const app = express();

app.listen(3000, () => console.log("Listening at port 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.post("/send_location", (req, res) => {
  const reqData = req.body;
  reqData.status = "Succes";

  const timestand = Date.now();
  reqData.timestand = timestand;

  database.insert(reqData);
  res.json(reqData);
});

app.get("/get_data", (req, res) => {
  database.find({}, (error, data) => {
    if (error) {
      res.end();
    } else {
      res.json(data);
    }
  });
});

//TODO: hidden API key file;

app.post("/get_weather/:latlon", async (req, res) => {
  const latlon = req.params.latlon.split(",");
  const lat = latlon[0];
  const lon = latlon[1];
  const lang = "en";
  const apiKey = "";

  //WEATHER DATA
  const weather_response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${apiKey}`
  );
  const weather_data = await weather_response.json();

  //AIR QUALITY DATA
  const air_response = await fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );
  const aq_data = await air_response.json();

  const data = {
    air_quality: aq_data,
    weather: weather_data,
  };
  res.json(data);
});
