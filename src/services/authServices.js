const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const errors = require("../helpers/errors");
const process = require("process");
require("dotenv").config();

const registration = async (body) => {
  const userExist = await User.findOne({ email: body.email });
  if (userExist) {
    throw new errors.EmailInUseError("Provided email already exists");
  }
  const newUser = {
    email: body.email,
    password: body.password,
    name: body.name,
  };
  const user = new User(newUser);
  await user.save();

  const newUserRegistered = await User.findOne({ email: body.email });
  const token = jwt.sign(
    { _id: newUserRegistered._id },
    process.env.JWT_SECRET
  );
  await User.updateOne({ email: newUser.email }, { $set: { token: token } });
  return User.findOne({ email: newUser.email }, { password: 0 });
};

const login = async (body) => {
  const userExist = await User.findOne({ email: body.email });
  if (!userExist) {
    throw new errors.NotAuthorizedError("Email or pass not valid");
  }
  if (!(await bcrypt.compare(body.password, userExist.password))) {
    throw new errors.NotAuthorizedError("Email or pass not valid");
  }
  const token = jwt.sign({ _id: userExist._id }, process.env.JWT_SECRET);
  await User.updateOne({ email: body.email }, { $set: { token: token } });
  // return User.findOne({ email: body.email }, { email: 1, name: 1, token: 1 });
  return User.findOne({ email: body.email }, { password: 0 });
};

const logout = async (userId) => {
  await User.updateOne({ _id: userId }, { $set: { token: null } });
};

const current = async (userId) => {
  return await User.findOne({ _id: userId }, { password: 0 });
};

module.exports = {
  registration,
  login,
  logout,
  current,
};
