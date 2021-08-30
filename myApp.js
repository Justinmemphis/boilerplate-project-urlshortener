/*
TO DO:

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

const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  longUrl: { type: String, required: true},
  shortUrl: { type: Number}
});

const Url = mongoose.model("Url", UrlSchema);

const createAndSaveUrl = (done) => {
  const amazon = new Url({longUrl: "https://www.amazon.com", shortUrl: 1});

  amazon.save( (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
};



// exports at the bottom
exports.UrlModel = Url;
exports.createAndSaveUrl = createAndSaveUrl;
