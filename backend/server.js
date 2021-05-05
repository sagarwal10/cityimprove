const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
const usersRouter = require('./routes/users'); 
const passport = require('passport'); 
const passportconfig = require("./config/passport"); 
const bodyParser = require("body-parser");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json())

const uri = process.env.ATLAS_URI; 
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection; 

connection.once('open', () => {
  console.log("MongoDB database connection established");
}); 

// Passport middleware 
app.use(passport.initialize()); 

// Passport config
passportconfig(passport); 

app.use('/users', usersRouter); 

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


