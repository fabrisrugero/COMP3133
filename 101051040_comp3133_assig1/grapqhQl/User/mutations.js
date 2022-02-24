const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { SECRET_KEY } = require("../../config");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async register(_, registerInput) {
      // TODO: Make sure user doesnt already exist
      const user = await User.findOne({ username: registerInput.username });
      if (user) throw new Error("Username is taken");
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email: registerInput,
        username: registerInput,
        password: registerInput,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
