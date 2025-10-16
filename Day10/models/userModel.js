const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    age: {
      type: Number,
      min: [1, 'Age must be positive'],
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

module.exports = mongoose.model('User', userSchema);
