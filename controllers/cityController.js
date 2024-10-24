const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

const db = require("../db/queries");

const links = require("../middlewareArrays/links");

exports.getCityList = asyncHandler(async (req, res, next) => {
  const getCities = await db.getCityList();

  res.render("city", {
    cities: getCities,
    links: links,
  });
});

exports.getCityDetail = asyncHandler(async (req, res, next) => {
  const { city_id } = req.params;

  const getCity = await db.getCityDetail(city_id);

  if (getCity.length === 0) {
    res.send("City not found");
  } else {
    res.render("cityDetails", {
      city: getCity,
      links: links,
    });
  }
});

exports.getCityCreate = asyncHandler(async (req, res, next) => {
  res.render("cityForm");
});

const alphaErr = "must container only characters.";

const lengthErr = "must be between 1 and 30 characters.";

const validateCityName = body("city_name")
  .trim()
  .isAlpha()
  .withMessage(`City name ${alphaErr}`)
  .isLength({ min: 1, max: 30 })
  .escape()
  .withMessage(`City name ${lengthErr}`);

exports.postCityCreate = [
  validateCityName,
  asyncHandler(async (req, res, next) => {
    const { city_name, city_image_url } = req.body;

    const errors = validationResult(req);

    const searchForCity = await db.searchForCityIfExists(city_name);

    const findCityIfExists = searchForCity.find(
      (city) => city.city_name === city_name
    );

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    } else {
      if (findCityIfExists) {
        return res.send("City with that name already exists.");
      }
      const postCity = await db.postCreateCity(city_name, city_image_url);

      return res.send("City has been created");
    }
  }),
];

exports.getCityDelete = asyncHandler(async (req, res, next) => {
  const { city_id } = req.params;

  const getCity = await db.getCityDetail(city_id);

  if (getCity.length === 0) {
    res.send("City not found");
  } else {
    res.send(getCity);
  }
});

exports.postCityDelete = asyncHandler(async (req, res, next) => {
  const { city_id } = req.params;

  const deleteCity = await db.postDeleteCity(city_id);

  res.send("City has been deleted.");
});

exports.getCityUpdate = asyncHandler(async (req, res, next) => {
  const { city_id } = req.params;

  const getCity = await db.getCityDetail(city_id);

  if (getCity.length === 0) {
    res.send("City not found");
  } else {
    res.send(getCity);
  }
});

exports.postCityUpdate = [
  validateCityName,
  asyncHandler(async (req, res, next) => {
    const { city_name, city_image_url } = req.body;

    const { city_id } = req.params;

    const errors = validationResult(req);

    const searchForCity = await db.searchForCityIfExists(city_name);

    const findCityIfExists = searchForCity.find(
      (city) => city.city_name === city_name
    );

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    } else {
      if (findCityIfExists) {
        return res.send("City with that name already exists.");
      } else {
        const updateCity = await db.postUpdateCity(
          city_name,
          city_image_url,
          city_id
        );

        res.send("City has been updated");
      }
    }
  }),
];
