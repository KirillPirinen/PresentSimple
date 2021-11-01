const { Router } = require("express");
const groupController = require("../controllers/group.controller");

const groupRouter = Router();

groupRouter.get("/:id", groupController.allWishes);
groupRouter.post("/add/:wish_id", groupController.addGroup);
groupRouter.post("/alone/:phone", groupController.addAlone);
groupRouter.post("/join", groupController.joinGroup);

module.exports = groupRouter;
