const express = require("express");
const app = express();

app.listen(3000, () => console.log("Running at port 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const data = [];
app.post("/send_data", (req, res) => {
  const reqData = req.body;
  data.push(reqData);
  console.log(data);

  res.json({
    status: "succes",
    info: "Location saved on server",
  });
});
