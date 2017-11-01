const express = require('express');
const mongoose = require('mongoose');

//create express app
const app = express();

const port = process.env.PORT || 5000;

app.get('/',  (req, res)=> {
  res.send('it works');
})


app.listen(port, ()=> {
  console.log(`Server started on port ${port}`);
});