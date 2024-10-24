const { Router } = require("express");

const cityRouter = Router();

const cityController = require("../controllers/cityController");

cityRouter.get("/create", cityController.getCityCreate);

cityRouter.post("/create", cityController.postCityCreate);

cityRouter.get("/:city_id", cityController.getCityDetail);

cityRouter.get("/:city_id/delete", cityController.getCityDelete);

cityRouter.post("/:city_id/delete", cityController.postCityDelete);

cityRouter.get("/:city_id/update", cityController.getCityUpdate);

cityRouter.post("/:city_id/update", cityController.postCityUpdate);

cityRouter.get("/", cityController.getCityList);

module.exports = cityRouter;
