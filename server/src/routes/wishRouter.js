const wishRouter = require('express').Router()
const { allUserProfile, addNewWish, editWish, deleteWish, wishIsGiven, unBindWish } = require('../controllers/wishController')
const upload = require('../middleware/uploadMulter')

wishRouter.get('/', allUserProfile)
            .post('/wish', upload.single('photo'), addNewWish)
             .put('/wish', upload.single('photo'), editWish)
              .patch('/wish/:id', wishIsGiven)
                .delete('/wish/:id', deleteWish)
                  .patch('/wish/revert/:id', unBindWish)

module.exports = wishRouter;
