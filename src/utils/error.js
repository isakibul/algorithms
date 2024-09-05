const badRequest = (msg = "Bad Request") => {
  const error = new Error(msg);
  error.status = 400;
  return error;
};

const serverError = (msg = "Internal server error") => {
  console.log(msg);
  const error = new Error(msg);
  error.status = 500;
  return error;
};

module.exports = {
  badRequest,
  serverError,
};
