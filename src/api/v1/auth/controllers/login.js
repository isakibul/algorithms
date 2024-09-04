const bcrypt = require("bcrypt");
const { User } = require("../../../../model");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    /**
     * Find the user by email
     */
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    /**
     * Compare the provided password with the hashed password in the database
     */
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    /**
     * Login successful
     */
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    next(error);
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "An error occurred while logging in" });
  }
};

module.exports = login;
