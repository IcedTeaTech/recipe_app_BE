require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = 4000;

const APP_ID = `${process.env.APP_ID}`;
const API_KEY = `${process.env.API_KEY}`;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.post("/recipes", async (req, res) => {
  let { searchQuery } = req.body;
  console.log(req.body);
  const response = await axios
    .get(
      `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${API_KEY}&from=0&to=12`
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server listening on port 4000");
});
