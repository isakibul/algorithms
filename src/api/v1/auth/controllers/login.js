const authService = require("../../../../lib/auth");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const accessToken = await authService.login({ email, password });

    /**
     * generate response
     */
    const response = {
      code: 200,
      message: "Login successful",
      data: {
        access_token: accessToken,
      },
      links: {
        self: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = login;
