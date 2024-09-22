const authService = require("../../../../lib/auth");
const { generateToken } = require("../../../../lib/token");
const { userExists } = require("../../../../lib/user");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const userAlreadyExists = await userExists(email);

  if (userAlreadyExists) {
    return res.status(400).json({ message: "Email already in use" });
  }

  try {
    const user = await authService.register({ name, email, password });

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const accessToken = generateToken({ payload });

    const response = {
      code: "201",
      message: "Signup successful",
      data: {
        access_token: accessToken,
      },
      links: {
        self: req.url,
        login: "/auth/login",
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = register;
