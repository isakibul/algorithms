const { Issue } = require("../../model");
const defaults = require("../../config/defaults");

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

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = { title: { $regex: search, $options: "i" } };

  const issues = await Issue.find(filter)
    .populate({ path: "author", select: "name" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return issues.map((issue) => ({
    ...issue._doc,
    id: issue.id,
  }));
};

const count = ({ search = "" }) => {
  const filter = {
    title: { $regex: search, $options: "i" },
  };
  return Issue.countDocuments(filter);
};

module.exports = {
  create,
  findAll,
  count,
};
