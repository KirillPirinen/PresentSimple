const wishRouter = require('express').Router()
const { allUserWishes, addNewWish, editWish, deleteWish, wishIsGiven } = require('../controllers/wishController')
const upload = require('../middleware/uploadMulter')

  wishRouter.route('/')
    .get(allUserWishes)
      .post(upload.single('photo'), addNewWish)
        .patch(upload.single('photo'), editWish)
wishRouter.delete('/:id', deleteWish)
  wishRouter.patch('/:id', wishIsGiven)


module.exports = wishRouter;
