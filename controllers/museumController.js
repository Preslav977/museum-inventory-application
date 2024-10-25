const { body, validationResult } = require("express-validator");

const db = require("../db/queries");

const links = require("../middlewareArrays/links");

const asyncHandler = require("express-async-handler");

exports.getMuseumList = asyncHandler(async (req, res, next) => {
  const getMuseums = await db.getMuseumList();

  res.render("museum", {
    museums: getMuseums,
    links: links,
  });
});

exports.getMuseumDetail = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const getMuseum = await db.getMuseumDetail(id);

  if (getMuseum.length === 0) {
    res.status(404).send("Museum not found");
    return;
  } else {
    res.render("museumDetails", {
      museum: getMuseum,
      links: links,
    });
  }
});

exports.getMuseumCreate = asyncHandler(async (req, res, next) => {
  const museumCategories = await db.getCategoryList();
  const museumCities = await db.getCityList();

  console.log(museumCities);

  res.render("museumForm", {
    links: links,
    categories: museumCategories,
    cities: museumCities,
  });
});

const alphaErr = "must contain only letters.";
const museumNameLengthErr = "must be between 1 and 30 characters.";
const museumHistoryLengthErr = "must be between 1 and 255 characters";
const museumCategory = "must contain only numbers.";

const validateMuseumName = body("name")
  .trim()
  .isAlpha()
  .withMessage(`Museum name ${alphaErr}`)
  .isLength({ min: 1, max: 30 })
  .escape()
  .withMessage(`Museum name ${museumNameLengthErr}`);

const validateMuseumHistory = body("history")
  .trim()
  .isAlpha()
  .withMessage(`Museum history ${alphaErr}`)
  .isLength({ min: 1, max: 255 })
  .escape()
  .withMessage(`Museum history ${museumHistoryLengthErr}`);

const validateMuseumCategory = body("category_id")
  .trim()
  .isNumeric()
  .withMessage(`Museum category ${museumCategory}`)
  .trim()
  .notEmpty()
  .withMessage("Category must not be empty");

const validateMuseumCity = body("city_id")
  .trim()
  .isNumeric()
  .withMessage(`Museum city ${museumCategory}`)
  .trim()
  .notEmpty()
  .withMessage("City must not be empty");

exports.postMuseumCreate = [
  validateMuseumName,
  validateMuseumHistory,
  validateMuseumCategory,
  validateMuseumCity,
  asyncHandler(async (req, res, next) => {
    const { name, history, image_url, category_id, city_id } = req.body;

    const museumCategories = await db.getCategoryList();
    const museumCities = await db.getCityList();

    console.log(name, history, image_url, category_id, city_id);

    const errors = validationResult(req);

    const searchForMuseum = await db.searchForMuseumIfExists(name);

    const findMuseumIfExists = searchForMuseum.find(
      (museum) => museum.name === name
    );

    if (!errors.isEmpty()) {
      res.status(400).render("museumForm", {
        links: links,
        errors: errors.array(),
        categories: museumCategories,
        cities: museumCities,
      });
    } else {
      if (findMuseumIfExists) {
        return res.send("Museum with that name already exists");
      }
      const postMuseum = await db.postCreateMuseum(
        name,
        history,
        image_url,
        category_id,
        city_id
      );
      res.redirect("/museum");
    }
  }),
];

exports.getMuseumDelete = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const getMuseum = await db.getMuseumDetail(id);

  if (getMuseum.length === 0) {
    res.status(404).send("Museum not found");
    return;
  } else {
    res.render("museumDelete", {
      links: links,
      museum: getMuseum,
    });
  }
});

exports.postMuseumDelete = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const checkMuseumRelationships = await db.checkIfMuseumHasAnyRelationships(
    id
  );

  if (checkMuseumRelationships.length !== 0) {
    res.send("You need to delete category and city first!");
  } else {
    const deleteMuseum = await db.deleteMuseumIfNoRelationships(id);

    res.redirect("/museum");
  }
});

exports.getMuseumUpdate = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const getMuseum = await db.getMuseumDetail(id);

  if (getMuseum.length === 0) {
    res.status(404).send("Museum not found");
    return;
  } else {
    res.send(getMuseum);
  }
});

exports.postMuseumUpdate = [
  validateMuseumName,
  validateMuseumHistory,
  validateMuseumCategory,
  validateMuseumCity,
  asyncHandler(async (req, res, next) => {
    const { name, history, image_url, category_id, city_id } = req.body;

    const { id } = req.params;

    console.log(name, history, image_url, category_id, city_id, id);

    const errors = validationResult(req);

    const searchForMuseum = await db.searchForMuseumIfExists(name);

    const findMuseumIfExists = searchForMuseum.find(
      (museum) => museum.name === name
    );

    if (!errors.isEmpty()) {
      res.status(400).send(errors.array());
    } else {
      if (findMuseumIfExists) {
        res.send("Museum with that name already exists");
      } else {
        const updateMuseum = await db.postUpdateMuseum(
          name,
          history,
          image_url,
          category_id,
          city_id,
          id
        );

        res.send("Museum has been updated");
      }
    }
  }),
];
