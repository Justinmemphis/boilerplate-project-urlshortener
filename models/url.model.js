const mongoose = require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose)

mongoose.set('useFindAndModify', false);

const server = 'cluster0.qhepb.mongodb.net/myUrlDatabase?retryWrites=true&w=majority'
const user = 'justincarter'
const password = 'BbkCO29dDvMd25jH'

mongoose.connect(`mongodb+srv://${user}:${password}@${server}`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then( () => console.log("MongoDB Connected..."))
        .catch(err => console.log(err))

const Schema = mongoose.Schema

const UrlSchema = new Schema({
  url: { type: String, required: true},
  short_url: { type: Number}
})

UrlSchema.plugin(AutoIncrement, {inc_field: "short_url"})

module.exports = mongoose.model('Url', UrlSchema)
