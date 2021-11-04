const { v4: uuidv4 } = require("uuid");
const { Group, Sequelize } = require("../../db/models");
const Op = Sequelize.Op;
const { Wish } = require("../../db/models");
const { UserGroup, User, WishPhoto } = require("../../db/models");
const { Wishlist } = require("../../db/models");
const appError = require('../Errors/errors');

const allWishes = async (req, res, next) => {
  const { user_id } = req.params;
  const wishes = await Wishlist.findOne({
    where: { user_id: user_id },
    include: [{ model: Wish, include: [{ model: Group,  }, {model:WishPhoto}] }, {model:User, attributes:['name', 'lname']}],
    required: false,
    order: [[Wish, "id", "ASC"]],
  });
  res.json(wishes);
};

const addAlone = async (req, res, next) => {

  const { wish_id } = req.body;
  try {
    await Wish.update({ isBinded: true });
    const wishes = await Wishlist.findOne({
      where: { user_id: user_id },
      include: [{ model: Wish, include: [{ model: Group,  }, {model:WishPhoto}] }, {model:User, attributes:['name', 'lname']}],
      required: false,
      order: [[Wish, "id", "ASC"]],
    });
    return res.json(wishes);
  } catch (error) {
    return res.sendStatus(520).json({ message: "Что-то пошло не так" });
  }
};

const addGroup = async (req, res, next) => {
  console.log("req.session.user", req.session?.user?.id);
  const { wish_id } = req.body;
  const { user_id } = req.params;
  try {
    const group = await Group.create({
      ...req.body,
      currentusers: 1,
      wish_id: wish_id,
    });
    await UserGroup.create({
      user_id: req.session?.user?.id,
      group_id: group.id,
    });
    await Wish.update(
      { isBinded: true },
      { where: { id: wish_id } }
    );

    const wishes = await Wishlist.findOne({
      where: { user_id: user_id },
      include: [{ model: Wish, include: [{ model: Group,  }, {model:WishPhoto}] }, {model:User, attributes:['name', 'lname']}],
      required: false,
      order: [[Wish, "id", "ASC"]],
    });
    return res.json({ message: "Вы успешно создали группу", wishes: wishes });
  } catch (error) {
    return res.json({ message: "Что-то пошло не так" });
  }
};

const joinGroup = async (req, res, next) => {
  const { wish_id } = req.body;
  const { user_id } = req.params;

  try {
    var groupFind = await Group.findOne({ 
      where: { wish_id: wish_id }, 
      include:{model:User},
    });
    

    if(!groupFind) return next(new appError(211, 'Группа не найдена'))
    else {
      const sameuser = groupFind.Users.find(e=>e.id===req.session.user.id)
      if(sameuser) return next(new appError(211, 'Вы уже вступили в эту группу'))
    }
    

    const nextuser = (await groupFind.currentusers) + 1;
    
    if (nextuser < groupFind.maxusers) {
      await Group.update(
        { currentusers: nextuser },
        { where: { wish_id: wish_id } }
      );

      const wishes = await Wishlist.findOne({
        where: { user_id: user_id },
        include: [{ model: Wish, include: [{ model: Group,  }, {model:WishPhoto}] }, {model:User, attributes:['name', 'lname']}],
        required: false,
        order: [[Wish, "id", "ASC"]],
      });

     await UserGroup.create({user_id:req.session.user.id, group_id:groupFind.id})

      return res
        .status(200)
        .json({ message: "Вы успешно вступили в группу", wishes: wishes });
    } else if (nextuser === groupFind.maxusers) {
      await Group.update(
        { currentusers: nextuser },
        { where: { wish_id: wish_id } }
      );

      const wishes = await Wishlist.findOne({
        where: { user_id: user_id },
        include: [{ model: Wish, include: [{ model: Group,  }, {model:WishPhoto}] }, {model:User, attributes:['name', 'lname']}],
        required: false,
        order: [[Wish, "id", "ASC"]],
      });

      return res
        .status(201)
        .json({ message: "Вы успешно вступили в группу", wishes: wishes });
    } else {
      return res.sendStatus(202).json({ message: "Что-то пошло не так" });
    }
  } catch (error) {
    next(new appError(404, error))
  }
};

module.exports = {
  addGroup,
  addAlone,
  joinGroup,
  allWishes,
};
