const authService = require("../../../../lib/auth");
const { generateToken } = require("../../../../lib/token");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await authService.register({ name, email, password });

    /**
     * generate access token
     */
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const accessToken = generateToken({ payload });

    /**
     * generate response
     */
    const response = {
      code: "201",
      message: "Signup successful",
      data: {
        access_token: accessToken,
      },
      links: {
        self: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
        login: `${req.protocol}://${req.get("host")}/api/v1/auth/login`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = register;
