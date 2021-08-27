/*
TO DO:
  set up variables
  test if URL is a valid url
    1. if not a valid URL - give error message
        otherwise move to next step
        (in here save to MongoDB - and retrieve number saved)
    2. generate JSON response - original URL and short url
    3. when you visit the short URL you get redirected to the original URL

*/

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

let mongoose;
try {
  mongoose = require('mongoose');
} catch (e) {
  console.log(e);
}
const fs = require('fs');
const path = require('path');
const bodyParser = require("body-parser");
const router = express.Router();

// enable bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// the following sections are from server.js on the other mongoose project

router.get("/file/*?", function (req, res, next) {
  if (req.params[0] === ".env") {
    return next({ status: 401, message: "ACCESS DENIED" });
  }
  fs.readFile(path.join(__dirname, req.params[0]), function (err, data) {
    if (err) {
      return next(err);
    }
    res.type("txt").send(data.toString());
  });
});

router.get("/is-mongoose-ok", function (req, res) {
  if (mongoose) {
    res.json({ isMongooseOk: !!mongoose.connection.readyState });
  } else {
    res.json({ isMongooseOk: false });
  }
});

// this begins where myApp.js on the other project starts - kept in the same file (no exports)

require("dotenv").config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/api", function (req, res, next) {

});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
