const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


//load  model
require('./models/User');
require('./models/Story');

//passport config
require('./config/passport')(passport);

//load  routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

//load keys
const keys = require('./config/keys');

//handelbars helpers
const{
  truncate,
  stripTags,
  formatDate,
  select,
  editIcon
} = require('./helpers/hbs');



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

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//method override middleware
app.use(methodOverride('_method'));


//handelbars middleware
app.engine('handlebars', exphbs({
  helpers: {
    truncate: truncate,
    stripTags: stripTags,
    formatDate: formatDate,
    select: select,
    editIcon: editIcon
  },
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


//set static folde
app.use(express.static(path.join(__dirname, 'public')));



//use  routes
app.use('/stories', stories);
app.use('/auth', auth);
app.use('/', index);


app.listen(port, ()=> {
  console.log(`Server started on port ${port}`);
});