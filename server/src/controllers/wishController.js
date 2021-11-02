const { Wish } = require('../../db/models');
const { Wishlist } = require('../../db/models');
const { WishPhoto } = require('../../db/models');

const allUserWishes = async (req, res) => {
  const user_id = req.session.user.id;
  const allWishes = await Wish.findAll({
    where: { user_id },
    include: { model: WishPhoto },
  });
  res.json(allWishes);
};

const addNewWish = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    let pricerange_id;
    switch (+price) {
      case price <= 1000:
        pricerange_id = 1;
          break;
      case 1000 < price <= 3000:
        pricerange_id = 2;
          break;
      case 3000 < price <= 5000:
        pricerange_id = 3;
          break;
      case 5000 < price <= 10000:
        pricerange_id = 4;
          break;
      case price > 10000:
        pricerange_id = 5;
          break;

        default:
          pricerange_id = 1
    }

    const user_id = req.session.user.id;

    const newWish = await Wish.create({
      title,
      description,
      pricerange_id,
      user_id,
    });

    if(req.file) {
      const image = req.file.path;
      const wish_id = newWish.id;
      const wishPhoto = await WishPhoto.create({ image, wish_id });
      newWish.dataValues.WishPhoto = wishPhoto;
    }
    res.json(newWish);
  } catch (error) {
    console.log(error);
  }
};

const editWish = async (req, res) => {
  try {
    const { title, description, price, id } = req.body;
    let pricerange_id;

    switch (+price) {
      case price <= 1000:
        pricerange_id = 1;
          break;
      case 1000 < price <= 3000:
        pricerange_id = 2;
          break;
      case 3000 < price <= 5000:
        pricerange_id = 3;
          break;
      case 5000 < price <= 10000:
        pricerange_id = 4;
          break;
      case price > 10000:
        pricerange_id = 5;
          break;

        default:
          pricerange_id = 1
    }

    await Wish.update({
      title,
      description,
      pricerange_id,
    }, {where: { id }});

    if(req.file) {
      const image = req.file.path;
      await WishPhoto.update({ image }, {where: { wish_id: id } })
      res.send({status: 200, filePath: req.file.path});
    }
    res.send({status: 200});
    
  } catch (error) {
    console.log(error);
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

module.exports = {
  allUserWishes,
  addNewWish,
  editWish,
  deleteWish,
};
