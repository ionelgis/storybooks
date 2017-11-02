const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');


//load user model
require('./models/User')

//passport config
require('./config/passport')(passport);

//load auth routes
const auth = require('./routes/auth');
//load index routes
const index = require('./routes/index');

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


//handelbars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');


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




//use auth routes
app.use('/auth', auth);
//use index routes
app.use('/', index);


app.listen(port, ()=> {
  console.log(`Server started on port ${port}`);
});