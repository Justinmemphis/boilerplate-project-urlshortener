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
var bodyParser = require('body-parser');

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

/*
// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});
*/

app.get("/api", function (req, res, next) {

});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
