const { defaults } = require('pg');
const { User, Form, Present, WishPhoto, Wish, Wishlist, Group } = require('../../db/models');
const appError = require('../Errors/errors');
const getRange = require('../functions/rangeIdentifier');
const { checkInput } = require('../functions/validateBeforeInsert');

const allUserProfile = async (req, res, next) => {
  const user_id = req.session.user.id;
  try {
    const allWishes = await User.findOne({
      where: { id: user_id },
      attributes: ['name', 'lname', 'email', 'phone', 'createdAt', 'avatar'],
      include: [ { 
        model: Wishlist, include: {
          model: Wish, required: false, include: {
            model: WishPhoto, required: false
          }
        },
        attributes: ['createdAt', 'updatedAt']
      },
      { model: Group },
      { model: Form },
      { model: Present, include: {
        model: Form, attributes: ['name', 'lname']
      } 
    },
      { model: Wish, include: {
        model: Wishlist, include:{
           model: User, attributes: ['name', 'lname']
          }
        }
      }
        ]
    });
    res.json(allWishes);
  } catch (error) {
    next(new Error(error.message))
  }
};

const addNewWish = async (req, res, next) => {
  try {
    Object.setPrototypeOf(req.body, Object.prototype)
    const input = checkInput(req.body, ['title', 'description', 'price'], true);
    
    if(input) {
    const {price, description, title} = input;

    const pricerange_id = getRange(price);
     
    const user_id = req.session.user.id;

    const wishlist = await Wishlist.findOne({where: {user_id}, attributes:['id']})

    const wishlist_id = wishlist.id

    const newWish = await Wish.create({
      title,
      description,
      pricerange_id,
      wishlist_id,
    });

    if(req.file) {
      const image = `uploads/${req.file.filename}`;
      const wish_id = newWish.id;
      const wishPhoto = await WishPhoto.create({ image, wish_id });
      newWish.dataValues.WishPhoto = wishPhoto;
    }

    res.json(newWish);
    } else {
      next(new appError(400, "Не заполнены необходимые поля"));
    }
  } catch (error) {
    next(new Error(error.message))
  }
};

const editWish = async (req, res, next) => {
  Object.setPrototypeOf(req.body, Object.prototype)

  const {id} = checkInput(req.body, ['id'], true)
  const {price} = checkInput(req.body, ['price'])
  const input = checkInput(req.body, ['title', 'description']);

  try {
    if(input) {
      if(!id) return next(new appError(500, 'Ошибка отправки пакета ошибка'))

    const pricerange_id = getRange(price);

    let updatedWish = await Wish.findOne({where:{id}, include:{model:WishPhoto}})
    if(typeof pricerange_id === 'number') updatedWish.pricerange_id = pricerange_id;
    
    Object.keys(input).forEach(field => {
      updatedWish[field] = input[field]
    })

    if(req.file) {
      const image = `uploads/${req.file.filename}`;
      const photo = await WishPhoto.findOrCreate({defaults:{wish_id:id, image}, where: { wish_id:id }})

      if(!photo[1]) {
        photo[0].image = image 
        await photo[0].save()
      }
      updatedWish.WishPhoto = photo[0]
    }
    
    await updatedWish.save()
    console.log('После добавления фото', updatedWish.WishPhoto)
    res.json(updatedWish);

    } else if(req.file) {

      const image = `uploads/${req.file.filename}`;
      const photo = await WishPhoto.findOrCreate({defaults:{wish_id:id, image}, where: { wish_id:id }})

      if(!photo[1]) {
        photo[0].image = image 
        await photo[0].save()
      }

      res.status(206).json(photo[0]);

    } else {
      next(new appError(400, "Поля не могут быть пустыми"))
    }
  } catch (error) {
    next(new Error(error.message))
  }
};

const deleteWish = async (req, res) => {
  try {
    const id = req.params.id;
    await Wish.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const wishIsGiven = async (req, res) => {
  try {
    const isGiven = true;
    const id = req.params.id;
    await Wish.update({ isGiven }, { where: { id }})
    res.sendStatus(200)
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  allUserProfile,
  addNewWish,
  editWish,
  deleteWish,
  wishIsGiven,
};
