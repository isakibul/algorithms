const bcrypt = require("bcrypt");
const { User } = require("../../../../model");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    /**
     * Check if the email is already in use
     */
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    /**
     * Hash the password
     */
    const hashedPassword = await bcrypt.hash(password, 10);

    /**
     * Create a new user
     */
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    /**
     * Save the user to the database
     */
    await newUser.save();

    /**
     * Send a success response
     */
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
    console.error("Error registering user:", error.message);
    res.status(500).json({ message: "An error occurred while registering" });
  }
};

module.exports = register;
