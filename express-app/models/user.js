const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    email_uppercase: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  });

  UserSchema.pre(
    'save',
    async function(next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;

      const email_uppercase = this.email.toUpperCase();
      this.email_uppercase = email_uppercase;

      next();
    }
  );

  UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
  }

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
