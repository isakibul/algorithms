const router = require("express").Router();
const { controllers: authController } = require("../api/v1/auth");
const { controllers: issueController } = require("../api/v1/issue");
const authenticate = require("../middleware/authenticate");

router.post("/api/v1/auth/register", authController.register);

router.post("/api/v1/auth/login", authController.login);

router.post("/api/v1/issue/create", authenticate, issueController.create);

module.exports = router;
