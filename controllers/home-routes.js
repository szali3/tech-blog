const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Users, Comment} = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    // order: [ ['created_at', 'DESC'] ],
    include: [
        {
            model: Comment,
            // attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
            model: Users,
            attributes: ['username']
            }
        },
        {
            model: Users,
            attributes: ['username']
        }
      ]
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
    },
    include: [
      {
        model: Comment,
        // attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: Users,
          attributes: ['username']
        }
      },
      {
        model: Users,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });
      const navTitle = "The tech Blog"
      console.log(post)
      res.render('single-post', {
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