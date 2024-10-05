const defaults = require("../../../../config/defaults");
const issueService = require("../../../../lib/issue");
const query = require("../../../../utils/query");

const findAll = async (req, res, next) => {
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortBy;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;

  try {
    const issues = await issueService.findAll({
      page,
      limit,
      sortType,
      sortBy,
      search,
    });

    const data = query.getTransomedItems({
      items: issues,
      path: "/issue",
      selection: ["id", "title", "cover", "author", "updatedAt", "createdAt"],
    });

    const totalItems = await issueService.count({ search });
    const pagination = query.getPagination({ totalItems, limit, page });

    const links = query.getHATEOASforAllItems({
      url: req.ur,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });

    res.status(200).json({ data, pagination, links });
  } catch (error) {
    next(error);
  }
};

module.exports = findAll;
