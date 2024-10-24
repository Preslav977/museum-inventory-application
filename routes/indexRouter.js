const { Router } = require("express");

const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", indexController.index);

module.exports = indexRouter;
