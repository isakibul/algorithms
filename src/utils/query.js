const defaults = require("../config/defaults");
const { generateQueryString } = require("../utils/queryString");

const getPagination = ({
  totalItems = defaults.totalItems,
  limit = defaults.limit,
  page = defaults.page,
}) => {
  const totalPage = Math.ceil(totalItems / limit);

  const pagination = {
    page,
    limit,
    totalItems,
    totalPage,
  };

  if (page < totalPage) {
    pagination.next = page + 1;
  }

  if (page > 1) {
    pagination.prev = page - 1;
  }

  return pagination;
};

const getHATEOASforAllItems = ({
  url = "/",
  path = "",
  query = {},
  hasNext = false,
  hasPrev = false,
  page = 1,
}) => {
  const links = {
    self: url,
  };

  if (hasNext) {
    const nextPage = parseInt(page, 10) + 1;
    const queryStr = generateQueryString({ ...query, page: nextPage });
    links.next = `${path}?${queryStr}`;
  }

  if (hasPrev) {
    const prevPage = parseInt(page, 10) - 1;
    const queryStr = generateQueryString({ ...query, page: prevPage });
    links.prev = `${path}?${queryStr}`;
  }

  return links;
};

const getTransomedItems = ({ items = [], selection = [], path = "/" }) => {
  if (!Array.isArray(items) || !Array.isArray(selection)) {
    throw new Error("Invalid selection");
  }

  if (selection.length === 0) {
    return items.map((item) => ({ ...item, link: `${path}/${item.id}` }));
  }

  return items.map((item) => {
    const result = {};
    selection.forEach((key) => {
      result[key] = item[key];
    });
    result.link = `${path}/${item.id}`;
    return result;
  });
};

module.exports = {
  getTransomedItems,
  getHATEOASforAllItems,
  getPagination,
};
