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
  Mutation: {
    async register(_, { userInput }) {
      console.log(userInput);
      const { username, password } = userInput;
      const user = await User.findOne({ username }).exec();
      if (user) throw new Error("Username is taken");
      encryptedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({ ...userInput, encryptedPassword });
      const res = await newUser.save();
      const token = generateToken(res);
      return { ...res._doc, token };
    },
  },
};
