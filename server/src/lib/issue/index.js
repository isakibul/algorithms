const { Issue } = require("../../model");

const create = async ({
  title,
  image,
  description,
  status = "draft",
  author,
}) => {
  if (!title || !description || !author) {
    const error = new Error("Invalid parameter");
    error.status = 400;
    throw error;
  }

  const issue = new Issue({
    title,
    image,
    description,
    status,
    author,
  });

  await issue.save();

  return { ...issue._doc, id: issue.id };
};

module.exports = {
  create,
};
