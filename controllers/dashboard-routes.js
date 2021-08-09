const router = require('express').Router();
const sequelize = require('../config/connection');
const {Users, Post } = require('../models');
const withAuth = require('../utils/auth');

// const posts = [
//     { title: 'Milk and Cookies', post_url: 10, post_body: 'This is the test lets see if this works',user: 'szali3'},
//     { title: 'Milk and Cootttkies', post_url: 2, post_body: 'This is the test lets see if this works',user: 'szaliq3'},
//     { title: 'Milk and Cookwwwwies', post_url: 3, post_body: 'This is the test lets see if this works',user: 'szalwi3'},
//     { title: 'Milk and sgs', post_url: 4, post_body: 'This is the test lets see if this works',user: 'szaliq3'},
//     { title: 'Milk and Hello', post_url: 5, post_body: 'This is the test lets see if this works',user: 'szali3w'}
//   ];
  
// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
//     attributes: [
//       'id',
//       'post_url',
//       'title',
//       'created_at',
//       [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
//     ],
//     include: [
//       {
//         model: Comment,
//         attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//         include: {
//           model: User,
//           attributes: ['username']
//         }
//       },
//       {
//         model: User,
//         attributes: ['username']
//       }
//     ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
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
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        
        res.render('dashboard', {
          post,
          loggedIn: true
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
