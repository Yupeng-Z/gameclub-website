'use strict';
var mongoose = require('mongoose');
const Schema = mongoose.Schema,
      jwt = require('jsonwebtoken'),
      bcrypt = require('bcrypt');

//mongodb schema
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name cannot be empty'
  },
  
  password: {
    type: String,
    required: 'Password cannot be empty',
    minLength: [6, 'Password must be at least 6 character long']
  },

  email: {
    type: String,
    required: 'Email cannot be empty',
    unique: true
  },
  
  likedgames: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Game'
    }
  ],
  
},{
  versionKey: false
});
// Duplicate the id field as mongoose returns _id field instead of id.
userSchema.virtual('id').get(function(){
  return this._id.toHexString();
});
// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
  virtuals: true
});

//TODO: add email validation

//password verify and jwt
userSchema.methods.verifyPassword = function(to_check_password){
  return bcrypt.compareSync(to_check_password, this.password);
}


userSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id },
    "SECRET#123",
  {
      expiresIn: "60m",
  }
  );
}


module.exports = mongoose.model('users', userSchema);