const user = require(`${__dirname}/../schema/user`);
const jwt = require("jsonwebtoken");

const createToken = (data) =>
  jwt.sign(data, "My_Secret_Key", {
    expiresIn: 60 * 60 * 24,
  });

exports.register = async (data) => {
  const { username, password } = data;
  const result = await user.create({ username, password });
  return {
    username: result.username,
    token: createToken({ id: result._id, username }),
  };
};

exports.signIn = async (data) => {
  const { username, password } = data;
  const result = await user.findOne({
    username,
    password,
  });

  if (!result) {
    throw new Error("Sign in failture");
  }
  return {
    username: result.username,
    token: createToken({ id: result._id, username }),
  };
};

exports.findUserById = async (id) => {
  const result = await user.findById(id, { password: 0 });
  return result;
};
