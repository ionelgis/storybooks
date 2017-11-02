const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

// stories index
router.get('/', (req, res)=> {
  res.render('stories/index')
})


// add stroeis form
router.get('/add',ensureAuthenticated, (req, res)=> {
  res.render('stories/add')
})



module.exports = router;