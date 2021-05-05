const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5
  }, 
  description: {
    type: String,
    required: true,
    minlength: 10
  },
  location: {
    address: {
      type: String,
      minlength: 10
    },
    coordinates: {
      type: [Number],
    },
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  imageUrl: {
    type: String,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'posts'
  }],
  tags: [{
    type: String
  }],
  upvotes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  }]
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;
 
