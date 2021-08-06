require("dotenv").config();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/users/avatars");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const TokenDb = require("./refreshTokens");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    profilePicturePublicId: {
      type: String,
    },
    coverPicture: {
      type: String,
    },
    coverPicturePublicId: {
      type: String,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followings: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods = {
  createAccessToken: async function () {
    try {
      let user = this;
      let accessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      return accessToken;
    } catch (err) {
      console.log(err);
      return;
    }
  },
  createRefreshToken: async function () {
    try {
      const user = this;
      let refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, {
        expiresIn: "30d",
      });
      await new TokenDb({ token: refreshToken }).save();
      return refreshToken;
    } catch (err) {
      console.log(err);
      return;
    }
  },
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
