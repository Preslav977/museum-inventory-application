const { Router } = require("express");

const categoryRouter = Router();

const categoryController = require("../controllers/categoryController");

categoryRouter.get("/create", categoryController.getCategoryCreate);

categoryRouter.post("/create", categoryController.postCategoryCreate);

categoryRouter.get("/:category_id", categoryController.getCategoryDetail);

categoryRouter.get(
  "/:category_id/delete",
  categoryController.getCategoryDelete
);

categoryRouter.post(
  "/:category_id/delete",
  categoryController.postCategoryDelete
);

categoryRouter.get(
  "/:category_id/update",
  categoryController.getCategoryUpdate
);

categoryRouter.post(
  "/:category_id/update",
  categoryController.postCategoryUpdate
);

categoryRouter.get("/", categoryController.getCategoryList);

module.exports = categoryRouter;
