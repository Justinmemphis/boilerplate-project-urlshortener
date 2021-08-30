require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  longUrl: { type: String, required: true},
  shortUrl: Number
});

const Url = mongoose.model("Url", urlSchema);

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
