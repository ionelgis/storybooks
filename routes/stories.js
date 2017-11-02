const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

// stories index
router.get('/', (req, res)=> {
  res.render('stories/index')
});


// add stroeis form
router.get('/add',ensureAuthenticated, (req, res)=> {
  res.render('stories/add')
});

//process add story from
router.post('/', (req, res) =>{
  let allowComments;
  if(req.body.allowComments){
    allowComments = true;
  }else{
    allowComments = false;
  }

const newStory = {
  title: req.body.title,
  body: req.body.body,
  status: req.body.status,
  allowComments: allowComments,
  user: req.user.id
}

// create story
new Story(newStory)
.save()
.then(story => {
  res.redirect(`/stores/show/${story.id}`)
})

});

module.exports = router;