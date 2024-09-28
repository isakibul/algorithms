const badRequest = (msg = "Bad Request") => {
  const error = new Error(msg);
  error.status = 404;
  return error;
};

const serverError = (msg = "Internal server error") => {
  const error = new Error(msg);
  error.status = 500;
  return error;
};

const authenticationError = (msg = "Permission denied") => {
  const error = new Error(msg);
  error.status = 403;
  return error;
};

module.exports = {
  badRequest,
  serverError,
  authenticationError,
};
