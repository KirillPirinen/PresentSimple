const { Router } = require("express");
const groupController = require("../controllers/group.controller");

const groupRouter = Router();

groupRouter.get("/:user_id", groupController.allWishes)
            .post("/", groupController.checkWish, groupController.addGroup)
              .patch("/alone/", groupController.checkWish, groupController.addAlone)
                .patch("/", groupController.joinGroup)

module.exports = groupRouter;

