const bcrypt = require("bcryptjs");
const User = require("../../models/User");

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
      return true;
    },
  },
};
