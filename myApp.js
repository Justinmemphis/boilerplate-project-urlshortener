
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
/*
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
*/

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
