const db = require("../db/queries");

const links = require("../middlewareArrays/links");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const getMuseumCategoryAndCityInfo = await db.getAll();

  res.render("index", {
    museumsInformation: getMuseumCategoryAndCityInfo,
    links: links,
  });
});
