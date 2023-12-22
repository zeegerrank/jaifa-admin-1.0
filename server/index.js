require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  return res.status(200).send({ message: "Hello world" });
});

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log("App is running on port", PORT);
});

const dbConnect = require("./db/dbConnect");
dbConnect();
