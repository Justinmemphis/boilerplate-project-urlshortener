/*
TO DO:

START HERE: - validate a URL in node.js
https://stackoverflow.com/questions/30931079/validating-a-url-in-node-js/55585593

09/02:
    Having problems getting POST to work correctly for API and cors routing.
    Going to try switching implementation to replit to see if that improves
    things.

08/31:
    Things that are working:
      1. MongoDB connecting; mongoose correctly searching by ID and also creating
        and saving urls.
      2. Added counter in the form of the short_url variable.

    Things still to do:
      1. See how to retrieve data from post statement.
      2. Validate that URL is a valid URL.
      3. If valid, create a new record - export the JSON to the user
      4. If someone puts in the URL correctly it will lookup the short_url and
        then redirect to the original_url
      5. Get button to work

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



*/

require('dotenv').config();

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

const Url = mongoose.model("Url", urlSchema);

const createAndSaveUrl = (done) => {
  const amazon = new Url({original_url: "https://www.amazon.com"});

  amazon.save( (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findUrlById = (urlId, done) => {
  Url.findById({_id: urlId}, (err, urlFound) => {
    if (err) return console.log(err);
    done(null, urlFound);
  });
};



// exports at the bottom
exports.UrlModel = Url;
exports.createAndSaveUrl = createAndSaveUrl;
exports.findUrlById = findUrlById;
