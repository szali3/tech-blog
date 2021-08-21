const router = require('express').Router();
const sequelize = require('../config/connection');
const {Users, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
  
// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Post.findAll({
    where: {
      user_id: req.session.user_id
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
    const posts = dbPostData.map(post => post.get({ plain: true }));
    navTitle = "Dashboard";
    res.render('dashboard', { posts,navTitle, loggedIn: true});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/post/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
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
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        navTitle = "Dashboard";
        res.render('dashboard', {
          post,
          loggedIn: true,
          navTitle
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
