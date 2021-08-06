require("dotenv").config();
const User = require("../models/user");
const Token = require("../models/refreshTokens");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

module.exports.signUp = async (req, res) => {
  const { name, email, username, password, confirmPassword } = req.body;
  let user = null;
  if (password !== confirmPassword) {
    return res
      .status(401)
      .json({ success: false, message: "Password does not match" });
  }
  try {
    user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(409)
        .json({ success: false, message: "Email Already Registered." });
    }
    if (
      name &&
      email &&
      new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$").test(email) &&
      password
    ) {
      let salt = await bcrypt.genSalt(12);
      let hashedPassword = await bcrypt.hash(password, salt);
      userObj = {
        email: email,
        name: name,
        password: hashedPassword,
        username: username,
      };
      user = await new User(userObj).save();
      let accessToken = await user.createAccessToken();
      let refreshToken = await user.createRefreshToken();

      return res.status(200).json({
        success: true,
        message: "Sign up successfull",
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          userId: user._id,
        },
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Email or Password Incorrect.",
      });
    }
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  }
};

module.exports.logIn = async (req, res) => {
  const { email, username, password } = req.body;
  let user = null;
  try {
    user = email
      ? await User.findOne({ email: email })
          .populate("followers")
          .populate("following")
      : await User.findOne({ username: username })
          .populate("followers")
          .populate("following");
    if (user) {
      if (bcrypt.compare(password, user.password)) {
        const accessToken = await user.createAccessToken();
        const refreshToken = await user.createRefreshToken();
        return res.status(200).json({
          message: "SignIn successfull",
          data: { accessToken, refreshToken, user },
        });
      } else {
        return res.status(422).json({
          message: "Incorrect password.",
        });
      }
    } else {
      return res.status(422).json({
        message: "No accounts exists with this username/email.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error Please try Again Later.",
    });
  }
};

module.exports.fetchAllUsers = async (req, res) => {
  const { user } = req;
  try {
    if (user) {
      const allUsers = await User.find({});
      if (allUsers) {
        return res.status(200).json({ data: { allUsers } });
      }
    } else {
      return res.status(422).json({
        message: "Access not granted",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error Please try Again Later.",
    });
  }
};

module.exports.logOut = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    await Token.deleteMany({ token: refreshToken });
    return res.status(200).json({ message: "Signed out successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error, Please try again after some time.",
    });
  }
};

module.exports.generateAccessTokens = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res
        .status(403)
        .json({ error: "Access Token denied, Token missing" });
    } else {
      const token = await Token.find({ token: refreshToken });
      if (!token) {
        return res.status(401).json({ error: "Token Expired!" });
      } else {
        const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const accessToken = jwt.sign({ id: payload }, ACCESS_TOKEN_SECRET, {
          expiresIn: "10m",
        });
        return res.status(200).json({ accessToken });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
