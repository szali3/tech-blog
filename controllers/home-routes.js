const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Users } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    include: [
      {
        model: Users
      }]
    })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      console.log(posts)
      navTitle = "The Tech Blog";
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
        navTitle
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// // get single post
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });
      const navTitle = "The tech Blog"

      res.render('editpost', {
        post,
        loggedIn: req.session.loggedIn,
        navTitle
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;