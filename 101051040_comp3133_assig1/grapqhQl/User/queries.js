const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

function generateToken(user) {
  return jwt.sign(
    {
      type: user.type,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Query: {
    async login(_, { username, password }) {
      const vagueError = "Username or password mismatch";
      const user = await User.findOne({ username });
      if (!user) throw new Error(vagueError);
      const match = await bcrypt.compare(password, user.encryptedPassword);
      if (!match) throw new Error(vagueError);
      const token = generateToken(user);
      return { ...user._doc, token };
    },
  },
};
