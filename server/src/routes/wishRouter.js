const wishRouter = require('express').Router()
const { allUserWishes, addNewWish, editWish, deleteWish } = require('../controllers/wishController')

wishRouter.route('/')
  .get(allUserWishes)
    .post(addNewWish)
      .patch(editWish)
        .delete(deleteWish)

module.exports = wishRouter;
