const express = require("express");
const app = express();
app.listen(3000, () => console.log("Listening at port 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.post("/api", (request, response) => {
  console.log(request.body);
  const data = request.body;
  response.json({
    status: "succes",
    latitude: data.lat,
    longitude: data.lon,
  });
});
//TODO: save the response data to the array and check out the node.js file system.
