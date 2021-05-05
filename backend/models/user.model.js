const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true, 
    minlength: 8
  },
  neighborhood: {
    type: String,
  },
  zipcode: {
    type: Number
  } 
},
{
  timestamps: true
}); 

const User = mongoose.model('user', userSchema);

module.exports = User; 

