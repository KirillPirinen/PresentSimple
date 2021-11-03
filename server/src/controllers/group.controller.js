const { v4: uuidv4 } = require("uuid");
const { Group, Sequelize } = require("../../db/models");
const Op = Sequelize.Op;
const { Wish } = require("../../db/models");
const { UserGroup } = require("../../db/models");
const { Wishlist } = require("../../db/models");

const allWishes = async (req, res, next) => {
  const { user_id } = req.params;
  const wishes = await Wishlist.findOne({
    where: { user_id: user_id },
    include: { model: Wish, include: { model: Group } },
    required: false,
    order: [[Wish, "id", "ASC"]],
  });
  res.json(wishes);
};

const addAlone = async (req, res, next) => {
  const { user_id } = req.params;
  const { wish_id } = req.body;
  try {
    await Wish.update({ isBinded: true }, { where: { id: wish_id } });
    const wishes = await Wishlist.findOne({
      where: { user_id: user_id },
      include: { model: Wish, include: { model: Group } },
      required: false,
      order: [[Wish, "id", "ASC"]],
    });

    return res.json(wishes);
  } catch (error) {
    return res.sendStatus(520);
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
      { isBinded: true, user_id: user_id },
      { where: { id: wish_id } }
    );

    const wishes = await Wishlist.findOne({
      where: { user_id: user_id },
      include: { model: Wish, include: { model: Group } },
      required: false,
      order: [[Wish, "id", "ASC"]],
    });
    return res.json({ error: "Вы успешно создали группу", wishes: wishes });
  } catch (error) {
    console.log("error", error);
    return res.json({ error: "Что-то пошло не так" });
  }
};

const joinGroup = async (req, res, next) => {
  const { wish_id } = req.body;
  const { user_id } = req.params;
  try {
    const groupFind = await Group.findOne({ where: { wish_id: wish_id } });
    const nextuser = (await groupFind.currentusers) + 1;
    if (nextuser < groupFind.maxusers) {
      const groupUpdate = await Group.update(
        { currentusers: nextuser },
        { where: { wish_id: wish_id } }
      );

      const userGroups = await UserGroup.findAll({
        where: { user_id: req.session?.user?.id },
      });

      const groups = await Group.findAll({
        where: { id: userGroups.map((el) => el.group_id) },
      });

      const wishes = await Wishlist.findOne({
        where: { user_id: user_id },
        include: { model: Wish, include: { model: Group } },
        required: false,
        order: [[Wish, "id", "ASC"]],
      });

      return res
        .status(200)
        .json({ error: "Вы успешно создали в группу", wishes: wishes });
    } else if (nextuser === groupFind.maxusers) {
      await Group.update(
        { currentusers: nextuser },
        { where: { wish_id: wish_id } }
      );

      const wishes = await Wishlist.findOne({
        where: { user_id: user_id },
        include: { model: Wish, include: { model: Group } },
        required: false,
        order: [[Wish, "id", "ASC"]],
      });

      return res
        .status(201)
        .json({ error: "Вы успешно вступили в группу", wishes: wishes });
    } else {
      return res.sendStatus(202).json({ error: "Что-то пошло не так" });
    }
  } catch (error) {
    // res.json({ message: "Необходимо сначала создать группу" });
  }
};

module.exports = {
  addGroup,
  addAlone,
  joinGroup,
  allWishes,
};
