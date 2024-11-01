const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

const db = require("../db/categoryQueries");

const links = require("../middlewareArrays/links");

exports.getCategoryList = asyncHandler(async (req, res, next) => {
  const getCategories = await db.getCategoryList();

  res.render("category", {
    categories: getCategories,
    links: links,
  });
});

exports.getCategoryDetail = asyncHandler(async (req, res, next) => {
  const { category_id } = req.params;

  const getCategory = await db.getCategoryDetail(category_id);

  if (getCategory.length === 0) {
    res.status(404).send("Category not found");
  } else {
    return res.render("categoryDetails", {
      category: getCategory,
      links: links,
    });
  }
});

exports.getCategoryCreate = asyncHandler(async (req, res, next) => {
  res.render("categoryForm", {
    links: links,
  });
});

const alphaErr = "must contain only letters.";
const lengthErr = "must between 1 and 20 characters";

const validateCategoryName = body("category_name")
  .trim()
  .isAlpha()
  .withMessage(`Category name ${alphaErr}`)
  .isLength({ min: 1, max: 20 })
  .escape()
  .withMessage(`Category name ${lengthErr}`);

exports.postCategoryCreate = [
  validateCategoryName,
  asyncHandler(async (req, res, next) => {
    const { category_name } = req.body;

    const errors = validationResult(req);

    const searchForCategory = await db.searchForCategoryIfExists(category_name);

    const findCategoryIfExists = searchForCategory.find(
      (category) => (category.category_name = category_name)
    );

    if (!errors.isEmpty()) {
      return res.status(400).render("categoryForm", {
        links: links,
        errors: errors.array(),
      });
    } else {
      if (findCategoryIfExists) {
        return res.send("Category with that name already exists");
      } else {
        const postCategory = await db.postCreateCategory(category_name);

        res.render("categoryDetails", {
          links: links,
          category: postCategory,
        });
      }
    }
  }),
];

exports.getCategoryDelete = asyncHandler(async (req, res, next) => {
  const { category_id } = req.params;

  const getCategory = await db.getCategoryDetail(category_id);

  if (getCategory.length === 0) {
    res.status(404).send("Category not found");
    return;
  } else {
    res.render("categoryDelete", {
      category: getCategory,
      links: links,
    });
  }
});

exports.postCategoryDelete = asyncHandler(async (req, res, next) => {
  const { category_id } = req.params;

  const deleteCategory = await db.postDeleteCategory(category_id);

  res.redirect("/category");
});

exports.getCategoryUpdate = asyncHandler(async (req, res, next) => {
  const { category_id } = req.params;

  const getCategory = await db.getCategoryDetail(category_id);

  if (getCategory.length === 0) {
    res.status(404).send("Category not found");
    return;
  } else {
    res.render("categoryForm", {
      links: links,
      categories: getCategory,
    });
  }
});

exports.postCategoryUpdate = [
  validateCategoryName,
  asyncHandler(async (req, res, next) => {
    const { category_name } = req.body;

    const { category_id } = req.params;

    const errors = validationResult(req);

    const searchForCategory = await db.searchForCategoryIfExists(category_name);

    const findCategoryIfExists = searchForCategory.find(
      (category) => (category.category_name = category_name)
    );

    if (!errors.isEmpty()) {
      return res.status(400).render("categoryForm", {
        links: links,
        errors: errors.array(),
      });
    } else {
      const updateCategory = await db.postUpdateCategory(
        category_name,
        category_id
      );

      res.render("categoryDetails", {
        links: links,
        category: updateCategory,
      });
    }
  }),
];
