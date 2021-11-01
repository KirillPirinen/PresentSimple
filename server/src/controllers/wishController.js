const { Wish } = require("../../db/models");
const { Wishlist } = require("../../db/models");

const allUserWishes = async (req, res) => {

  const user_id = 1;
  const allWishes = await Wish.findAll({
    where: { user_id },
  });
  res.json(allWishes);
};

const addNewWish = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    let price_id = price > 3000 ? 1 : 2;
    // const user_id = req.session.user.id
    // const wishlist_id = await Wishlist.findOne({
    //   where: { user_id }
    // })
    const user_id = 1;
    const newWish = await Wish.create({
      title,
      description,
      price_id,
      user_id,
    });

    res.json(newWish);
  } catch (error) {
    console.log(error);
  }
};

const editWish = async (req, res) => {
  const { title, description } = req.body;
  await Wish.update(
    {
      title,
      description,
    },
    { where: req.params.id }
  );
  res.sendStatus(200);
};

const deleteWish = async (req, res) => {
  try {
    const { id } = req.body;
    await Wish.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  allUserWishes,
  addNewWish,
  editWish,
  deleteWish,
};
