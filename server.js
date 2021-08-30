/*
TO DO:

08/30:
    1. Get new record to post to MongoDB


  set up variables
  test if URL is a valid url
    1. if not a valid URL - give error message
        otherwise move to next step
        (in here save to MongoDB - and retrieve number saved)
    2. generate JSON response - original URL and short url
    3. when you visit the short URL you get redirected to the original URL

08/27 Update - got mongoose initially installed (maybe) - need to get it to
correctly post and save new URL record below - that will mean it is working

Also - need to test URL when submitted to make sure it is a valid Url
Additionally, once that is done, need to test URL to see if it is already
in the database or not.  If it's in the database go ahead and pull the shortUrl
already generated.  If it's not in the database create a new record

Finally, need to have the /api/shorturl redirect browser to the given location
(assuming we also create a new short url for this as well)


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
app.use(bodyParser.urlencoded({ extended: "false" }));
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

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  url: { type: String, required: true},
  shortUrl: Number
});

const Url = mongoose.model("Url", urlSchema);

const createAndSaveUrl = (done) => {
  const amazon = new Url({url: "https://www.amazon.com", shortUrl: 1});

  amazon.save( (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
};


/*
app.get("/api", function (req, res, next) {

});
*/

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
