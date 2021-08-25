// import all models
const Post = require('./Post');
const Users = require('./Users');
const Comment = require('./Comment');

Users.hasMany(Post, {
	foreignKey : 'user_id'
});

Post.belongsTo(Users, {
	foreignKey : 'user_id'
});

Comment.belongsTo(Users, {
	foreignKey : 'user_id',
	onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
	foreignKey : 'post_id',
	onDelete: 'CASCADE'
});

Users.hasMany(Comment, {
	foreignKey : 'user_id',
	onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
	foreignKey : 'post_id',
	onDelete: 'CASCADE'
});

module.exports = { 
    Post,
    Users,
    Comment 
};