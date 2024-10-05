const issueService = require("../../../../lib/issue");

const create = async (req, res, next) => {
  const { title, image, description, status } = req.body;

  try {
    const issue = await issueService.create({
      title,
      image,
      description,
      status,
      author: req.user,
    });

    const response = {
      code: 201,
      message: "Issue created successfully",
      data: { issue },
      link: {
        self: `/issue/${issue._id}`,
        author: `/issue/${issue.id}/author`,
        comments: `/issue/${issue.id}/comments`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
