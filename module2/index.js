const express = require("express");
const Datastore = require("nedb");
const app = express();

app.listen(3000, () => console.log("Running at port 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.post("/send_data", (req, res) => {
  const reqData = req.body;
  const timestand = Date.now();
  reqData.timestand = timestand;

  database.insert(reqData);

  reqData.status = "Succes";
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
