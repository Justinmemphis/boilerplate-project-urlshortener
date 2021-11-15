require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes')

// Basic Configuration - setup up port
const port = process.env.PORT || 3000

// set up public file
app.use('/public', express.static(`${process.cwd()}/public`))
// parse form data
app.use(express.urlencoded({extended: false}))
// parse json
app.use(express.json())
app.use(cors())

app.use('/', routes)
app.use('/api/hello', routes)
app.use('/api/shorturl', routes)
app.use('/api/shorturl/:id', routes)



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
