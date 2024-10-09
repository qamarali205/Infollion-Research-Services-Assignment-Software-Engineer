const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    donatedAmount: {
      type: Number,
      default: 0,
    },
    donationHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donation",
      },
    ],
    profilePicture: {
      type: String,
    },
    otpCode: {
      type: String,
      default: null, // Can be null when OTP is not in use
    },
    otpExpiry: {
      type: Date,
      default: null, // Can be null when OTP is not in use
    },
    resetPasswordOTP: {
      type: String,
      default: null, // Can be null when OTP is not in use
    },
    resetPasswordExpires: {
      type: Date,
      default: null, // Can be null when OTP is not in use
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;