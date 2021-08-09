const sequelize = require('../config/connection');
const { Comment } = require('../models');

const postdata = [
  {
    comment_text: 'Donec posuere metus vitae ipsum.',
    post_id: 1,
    user_id: 10
  },
  {
    comment_text: 'Morbi non quam nec dui luctus rutrum.',
    post_id: 1,
    user_id: 8
  },
  {
    comment_text: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    post_id: 1,
    user_id: 1
  },
  {
    comment_text: 'Nunc purus.',
    post_id: 2,
    user_id: 4
  },
  {
    comment_text: 'Pellentesque eget nunc.',
    post_id: 3,
    user_id: 7
  },
  {
    comment_text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    post_id: 1,
    user_id: 4
  },
  {
    comment_text: 'In hac habitasse platea dictumst.',
    post_id: 1,
    user_id: 1
  },
  {
    comment_text: 'Morbi non quam nec dui luctus rutrum.',
    post_id: 1,
    user_id: 1
  },
  {
    comment_text: 'Duis ac nibh.',
    post_id: 1,
    user_id: 9
  },
  {
    comment_text: 'Curabitur at ipsum ac tellus semper interdum.',
    post_id: 3,
    user_id: 5
  },
  {
    comment_text: 'In hac habitasse platea dictumst.',
    post_id: 2,
    user_id: 3
  },
  {
    comment_text: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',
    post_id: 2,
    user_id: 10
  },
  {
    comment_text: 'Donec dapibus.',
    post_id: 3,
    user_id: 8
  },
  {
    comment_text: 'Nulla tellus.',
    post_id: 2,
    user_id: 3
  },
  {
    comment_text: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
    post_id: 2,
    user_id: 3
  },
  {
    comment_text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.',
    post_id: 2,
    user_id: 7
  }
];

const seedComment = () => Comment.bulkCreate(postdata);

module.exports = seedComment;
