const { v4: uuidv4 } = require("uuid");
const { Group } = require("../../db/models");
const { Wish } = require("../../db/models");
const { UserGroup } = require("../../db/models");
const { User } = require("../../db/models");

const allWishes = async (req, res, next) => {
  // const user = await User.findOne({where:{id: req.params.id}})
  //  const wishes = await Wish.findAll({where:{user_id: user.id}})
  const wishes = await Wish.findAll();
  res.json(wishes);
};

const addAlone = async (req, res, next) => {
  const { id } = req.params;
  const { wish_id } = req.body;
  try {
    const wish = await Wish.update(
      { isBinded: true },
      { where: { id: wish_id } }
    );
    // const user = await User.findOne({where:{id: id}})
    // const wishes = await Wish.findAll({where:{user_id: user.id}})
    const wishes = await Wish.findAll();
    return res.json(wishes);
  } catch (error) {
    return res.sendStatus(520);
  }
};

const addGroup = async (req, res, next) => {
  const { maxusers, telegram, user_id } = req.body;
  const { wish_id } = req.params;
  const user = await User.findOne({ where: { id: user_id } });
  const group = await Group.create({
    ...req.body,
    currentusers: 1,
    wish_id: wish_id,
  });
  const userGroup = await UserGroup.create({
    user_id: user.id,
    group_id: group.id,
  });
  const userGroups = await UserGroup.findAll({ where: { user_id: user.id } });
  const groups = await Group.findAll({
    where: { id: userGroups.map((el) => el.group_id) },
  });
  res.json(groups);
};

const joinGroup = async (req, res, next) => {
  const { wish_id } = req.body;
  const groupFind = await Group.findOne({ where: { wish_id: wish_id } });
  console.log("groupFind", groupFind);
  const nextuser = (await groupFind.currentusers) + 1;
  console.log("nextuser", nextuser);
  if (nextuser <= groupFind.maxusers) {
    try {
      await groupFind.update(
        { currentusers: nextuser },
        { where: { id: wish_id } }
      );
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(501);
    }
  } else {
    const wish = await Wish.update({ isBinded: true }, { where: { id: id } });
    res.sendStatus(416);
  }
};

module.exports = {
  addGroup,
  addAlone,
  joinGroup,
  allWishes,
};
