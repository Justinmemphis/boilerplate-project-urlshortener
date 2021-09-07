/*
TO DO:

Start here - see how to get mongoose to pull in value via variable;  current implementation is not pulling in variable name long_url correctly
(it is showing as undefined which is messing up the Schema).

    Things that are working:
      1. MongoDB connecting; mongoose correctly searching by ID and also creating
        and saving urls. (08/31)
      2. Added counter in the form of the short_url variable. (08/31)
      3. Retrieving data from post statement (09/02)
      4. Validating URL is a valid url (09/02)
      5. Button working (09/02) - related to post statement

    Things still to do:
      1. If valid, create a new record - export the JSON to the user
      2. If someone puts in the URL correctly it will lookup the short_url and
        then redirect to the original_url



09/02:
    Having problems getting POST to work correctly for API and cors routing.
    Going to try switching implementation to replit to see if that improves
    things. - done and working

08/30:
    1. Get new record to post to MongoDB
        A. - it looks like they are properly connecting to MongoDB - I can see
              the activity on MongoDB and it is correctly doing console.log
        B. Next step is to get a new record to post to MongoDB

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

Sources:
1. This is where it talks about catching route problems:
https://stackoverflow.com/questions/44539210/express-js-handle-unmached-routes

2. This is how to do DNS lookup:
https://stackoverflow.com/questions/53697633/nodejs-dns-lookup-is-rejecting-urls-with-http

3. Useful walkthrough of creating a POST CRUD API:
https://rahmanfadhil.com/express-rest-api/

4. Pushing items via Mongoose into MongoDB record:
https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose

5. Pulling in form data to nodejs/mongodb
https://programmingmentor.com/post/save-form-nodejs-mongodb/

*/

// require('dotenv').config(); - replit doesn't bring in .env files

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then( () => console.log("MongoDB Connected..."))
        .catch(err => console.log(err));
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  original_url: { type: String, required: true},
  short_url: { type: Number}
});

urlSchema.plugin(AutoIncrement, {inc_field: "short_url"});

const UrlModel = mongoose.model("UrlModel", urlSchema);

//const { long_url } = require('./server.js');
const createAndSaveUrl = (done) => {
  console.log(long_url);
  var newObj = {original_url: [long_url]};
  console.log(newObj);
  
  var newUrl = new UrlModel(newObj);
  console.log(newUrl);

  newUrl.save( (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findUrlById = (urlId, done) => {
  UrlModel.findById({_id: urlId}, (err, urlFound) => {
    if (err) return console.log(err);
    done(null, urlFound);
  });
};



// exports at the bottom
exports.UrlModel = UrlModel;
exports.createAndSaveUrl = createAndSaveUrl;
exports.findUrlById = findUrlById;
