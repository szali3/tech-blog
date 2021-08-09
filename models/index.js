// import all models
const Post = require('./Post');
const Users = require('./Users');
// const Vote = require('./Vote');
const Comment = require('./Comment');

// create associations
Users.hasMany(Post, {
    foreignKey: 'user_id'
});
  
Post.belongsTo(Users, {
    foreignKey: 'user_id',
    // onDelete: 'SET NULL'
});

// Comment.belongsTo(Users, {
//     foreignKey: 'user_id',
//     onDelete: 'SET NULL'
// });

// Comment.belongsTo(Post, {
//     foreignKey: 'post_id',
//     onDelete: 'SET NULL'
// });

// Users.hasMany(Comment, {
//     foreignKey: 'user_id',
//     onDelete: 'SET NULL'
// });

// Post.hasMany(Comment, {
//     foreignKey: 'post_id'
// });

module.exports = { 
    Post,
    Users,
    Comment 
};