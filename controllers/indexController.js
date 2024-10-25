const db = require("../db/queries");

const links = require("../middlewareArrays/links");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const getMuseums = await db.getMuseumList();

  const getCategories = await db.getCategoryList();

  const getCities = await db.getCityList();

  res.render("index", {
    museumsInformation: getMuseums,
    categoriesInformation: getCategories,
    citiesInformation: getCities,
    links: links,
  });
});
