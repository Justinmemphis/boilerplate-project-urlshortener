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
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

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

const Url = require("./myApp.js").UrlModel;

router.use(function (req, res, next) {
  if (req.method !== "OPTIONS" && Url.modelName !== "Url") {
    return next({ message: "URL Model is not correct" });
  }
  next();
});

router.post("/mongoose-model", function (req, res, next) {
  // try to create a new instance based on their model
  // verify it's correctly defined in some way
  let p;
  p = new Url(req.body);
  res.json(p);
});




// Error handler
app.use(function (err, req, res, next) {
  if (err) {
    res
      .status(err.status || 500)
      .type("txt")
      .send(err.message || "SERVER ERROR");
  }
});

// Unmatched routes handler
app.use(function (req, res) {
  if (req.method.toLowerCase() === "options") {
    res.end();
  } else {
    res.status(404).type("txt").send("Not Found");
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
