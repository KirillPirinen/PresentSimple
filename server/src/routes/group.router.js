const { Router } = require("express");
const checkAuth = require("../middleware/checkAuth");
const groupController = require("../controllers/group.controller");

const groupRouter = Router();

groupRouter.get("/:user_id", groupController.allWishes);
groupRouter.post("/alone/:user_id", groupController.addAlone);
groupRouter.post("/add/:wish_id", checkAuth, groupController.addGroup);
groupRouter.post("/join/:wish_id", checkAuth, groupController.joinGroup);

module.exports = groupRouter;
