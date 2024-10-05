const { createUser, findUserByEmail } = require("../user");
const { generateHash, hashMatched } = require("../../utils/hashing");
const { generateToken } = require("../token");
const { badRequest } = require("../../utils/error");

const register = async ({ name, email, password, status = "pending" }) => {
  password = await generateHash(password);
  const user = await createUser({ name, email, password, status });
  return user;
};

const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    console.log("User not found for email:", email);
    throw badRequest("Invalid credential");
  }

  if (user.status !== "approved") {
    throw badRequest(`Your account is ${user.status}. Please contact support.`);
  }

  const matched = await hashMatched(password, user.password);

  if (!matched) {
    console.log("Password does not match for email:", email);
    throw badRequest("Invalid credential");
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return generateToken({ payload });
};

module.exports = {
  register,
  login,
};
