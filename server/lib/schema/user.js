'use strict';

const mongoose = require('mongoose'),
      bcrypt   = require('bcrypt-nodejs'),
      q        = require('q');

const UserSchema = new mongoose.Schema({
  login: {
    email: { type: String, match: /^[^@]+@[^@]+$/i, required: true, unique: true },
    pass:  { type: String, required: true }
  }
});

UserSchema.pre('save', function (next) {
  if (this.isModified('login.pass') || this.isNew)
    this.login.pass = bcrypt.hashSync(this.login.pass);
  return next();
});
UserSchema.methods.checkPass = function (pass) {
  return bcrypt.compareSync(pass, this.login.pass);
};

UserSchema.statics.findByEmail = function (email, cb) {
  return this.findOne({ 'login.email': email }, cb);
};
UserSchema.statics.create = function (email, pass) {
  var deferred = q.defer(), User = this;
  this.findByEmail(email).exec((err, users) => {
    if (err) deferred.reject(err);
    else if (users.length > 0) q.reject('Email already in use');
    else {
      var user = new User();
      user.login.email = email;
      user.login.pass = pass;
      user.save((err) => {
        if (err) deferred.reject(err);
        else deferred.resolve(user);
      });
    }
  });
};
UserSchema.statics.login = function (email, pass) {
  const loginError = new Error('EMail/Password does not exist');
  var deferred = q.defer();
  this.findByEmail(email)
    .select('login')
    .limit(1)
    .exec(function (err, user) {
      if (err) deferred.reject(err);
      else if (!user || !user.checkPass(pass)) deferred.reject('Incorrect EMail and/or password');
      else deferred.resolve(user);
    });
};

exports = module.exports = UserSchema;
