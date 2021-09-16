
// require('dotenv').config(); - replit doesn't bring in .env files
/*
const mongoose = require('mongoose');


urlSchema.plugin(AutoIncrement, {inc_field: "short_url"});

const UrlModel = mongoose.model("UrlModel", urlSchema);

const createAndSaveUrl = (done) => {

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

*/
