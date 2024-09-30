const router = require("express").Router();
const { controllers: authController } = require("../api/v1/auth");
const { controllers: issueController } = require("../api/v1/issue");
const authenticate = require("../middleware/authenticate");

router.post("/api/v1/auth/register", authController.register);

router.post("/api/v1/auth/login", authController.login);

router
  .route("/api/v1/issue")
  .post(authenticate, issueController.create)
  .get(issueController.findAll);

// router.post("/api/v1/issue/create", authenticate, issueController.create);
// router.post("/api/v1/issue/issues", issueController.findAll);

module.exports = router;
