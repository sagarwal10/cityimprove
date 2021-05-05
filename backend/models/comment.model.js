const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const commentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  likes: [{  
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
  }],
  dislikes: [{  
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
  }]
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment; 

