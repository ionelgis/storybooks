const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

//passport config
require('./config/passport')(passport);

//load routes
const auth = require('./routes/auth');


//create express app
const app = express();

const port = process.env.PORT || 5000;

app.get('/',  (req, res)=> {
  res.send('it works');
})


//use routes
app.use('/auth', auth);


app.listen(port, ()=> {
  console.log(`Server started on port ${port}`);
});