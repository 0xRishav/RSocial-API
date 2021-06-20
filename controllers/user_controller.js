const UserDb = require("../models/user");
const bcrypt = require("bcrypt");

module.exports.signUpUser = async (req, res) => {
  const { name, email, username, password, confirmPassword, profession } =
    req.body;
  let user = null;
  if (password !== confirmPassword) {
    return res.json({ success: false, message: "Password does not match" });
  }
  try {
    user = await UserDb.findOne({ email: email });
    if (user) {
      return res.json({ success: false, message: "Email Already Registered." });
    }
    if (
      name &&
      email &&
      new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$").test(email) &&
      password
    ) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      user = {
        email: email,
        name: name,
        password: hashedPassword,
        username: username,
        profession: profession ? profession : "",
      };
      UserDb.create(user);
    } else {
      return res.json({
        success: false,
        message: "Email or Password Incorrect.",
      });
    }
    if (user) {
      return res.json({
        success: true,
        message: "User added successfully.",
        user,
      });
    }
  } catch (err) {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: "Internal Server Error please try again later",
      });
    }
  }
};

module.exports.signInUser = async (req, res) => {
  const { email, username, password } = req.body;
  let user = null;
  try {
    user = email
      ? await UserDb.findOne({ email: email })
      : await UserDb.findOne({ username: username });
    if (user) {
      if (bcrypt.compare(password, user.password)) {
        return res.json({ success: true, message: "SignIn successfull", user });
      } else {
        return res.json({ success: false, message: "Incorrect password." });
      }
    } else {
      return res.json({
        success: false,
        message: "No accounts exists with this username/email.",
      });
    }
  } catch (err) {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: "Internal Server Error Please try Again Later.",
      });
    }
  }
};
