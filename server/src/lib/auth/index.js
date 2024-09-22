const { createUser } = require("../user");
const { badRequest } = require("../../utils/error");
const { generateHash } = require("../../utils/hashing");

const register = async ({ name, email, password }) => {
  password = await generateHash(password);
  const user = await createUser({ name, email, password });
  return user;
};

module.exports = {
  register,
};
