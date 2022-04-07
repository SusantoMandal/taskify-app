const mongoose = require("mongoose");

const validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    minlength: [1, 'Description should not be empty'],
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    name: {
      type: String,
      required: true,
      minlength: [3, 'Name must be mimimum 3 character'],
    },
    password: {
      type: String,
      required: true,
      minlength: [5, 'Password must be mimimum 5 character'],
    },
    tasks: {
      type: [taskSchema],
      default: []
    }
  });

const User = mongoose.model("user", userSchema);

module.exports = User;