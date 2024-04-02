const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const user = new mongoose.Schema({

  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role:{type: String, enum: ['user','raffleHolder'], default: 'user'}
  
});

//hook for hashing password
user.pre('save', async function(next) {

  if (this.isModified('password')) {

    this.password = await bcrypt.hash(this.password, 12);

  }
  next();
});

const User = mongoose.model('User', user);

module.exports = User;
