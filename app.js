const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
//load user model
require('./models/User')

//passport config
require('./config/passport')(passport);

//load routes
const auth = require('./routes/auth');

//load keys
const keys = require('./config/keys')
//map global promises
mongoose.Promise = global.Promise;

//mongoose connect
mongoose.connect(keys.mongoURI, {
  useMongoClient: true
})
.then( ()=> {
  console.log('mongodb connected');
})
.catch(err => console.log(err));

//create express app
const app = express();

app.use(cookieParser());
app.use(session({
  secret: 'secret', 
  resave: false,
  saveUninitialized: false
}))

//passport middle ware
app.use(passport.initialize());
app.use(passport.session());


//set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

const port = process.env.PORT || 5000;

app.get('/',  (req, res)=> {
  res.send('it works');
})


//use routes
app.use('/auth', auth);


app.listen(port, ()=> {
  console.log(`Server started on port ${port}`);
});