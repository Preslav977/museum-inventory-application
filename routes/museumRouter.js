const { Router } = require("express");

const museumRouter = Router();

const museumController = require("../controllers/museumController");

museumRouter.get("/create", museumController.getMuseumCreate);

museumRouter.post("/create", museumController.postMuseumCreate);

museumRouter.get("/:id", museumController.getMuseumDetail);

museumRouter.get("/:id/delete", museumController.getMuseumDelete);

museumRouter.post("/:id/delete", museumController.postMuseumDelete);

museumRouter.get("/:id/update", museumController.getMuseumUpdate);

museumRouter.post("/:id/update", museumController.postMuseumUpdate);

museumRouter.get("/", museumController.getMuseumList);

module.exports = museumRouter;
