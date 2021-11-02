const { v4: uuidv4 } = require("uuid");
const { Group, Sequelize } = require("../../db/models");
const Op = Sequelize.Op;
const { Wish } = require("../../db/models");
const { UserGroup } = require("../../db/models");

const allWishes = async (req, res, next) => {
  const { user_id } = req.params;
  const wishes = await Wish.findAll({
    where: { user_id: user_id },
    order: [["id", "ASC"]],
  });
  console.log("req.session", req?.session?.user?.id);
  res.json(wishes);
};

const addAlone = async (req, res, next) => {
  const { user_id } = req.params;
  const { wish_id } = req.body;
  try {
    const wish = await Wish.update(
      { isBinded: true },
      { where: { id: wish_id } }
    );
    const wishes = await Wish.findAll({
      where: { user_id: user_id },
      order: [["id", "ASC"]],
    });
    return res.json(wishes);
  } catch (error) {
    console.log("error", error);
    return res.sendStatus(520);
  }
};

const addGroup = async (req, res, next) => {
  console.log("req.session.user.idADDGROUp", req.session?.user?.id);
  const { wish_id } = req.params;
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
    const userGroups = await UserGroup.findAll({
      where: { user_id: req.session?.user?.id },
    });
    const groups = await Group.findAll({
      where: { id: userGroups.map((el) => el.group_id) },
    });
    res.json(groups);
  } catch (error) {
    console.log("error", error);
  }
};

const joinGroup = async (req, res, next) => {
  const { wish_id } = req.body;
  const { user_id } = req.params
  const groupFind = await Group.findOne({ where: { wish_id: wish_id } });
  const nextuser = (await groupFind.currentusers) + 1;
  try {
    if (nextuser < groupFind.maxusers) {
      await groupFind.update(
        { currentusers: nextuser },
        { where: { id: wish_id } }
      );
      const userGroups = await UserGroup.findAll({
        where: { user_id: req.session?.user?.id },
      });
      console.log("userGroups", userGroups);
      const groups = await Group.findAll({
        where: { id: userGroups.map((el) => el.group_id) },
      });
      console.log("groups200", groups);
      return res.status(200).json(groups);
    } else if (nextuser === groupFind.maxusers) {
      await groupFind.update(
        { currentusers: nextuser },
        { where: { id: wish_id } }
      );
      await Wish.update({ isBinded: true }, { where: { id: wish_id } });
      const wishes = await Wish.findAll({
        where: { user_id: user_id },
        order: [["id", "ASC"]],
      });
      const userGroups = await UserGroup.findAll({
        where: { user_id: req.session?.user?.id },
      });

      // const groups = await Group.findAll({
      //   where:
      // where: {
      //   currentusers: {
      //     [Op.ne]: { [Op.col]: "maxusers" },
      //   },
      //   include: {
      //     model: User,
      //     attributes: ["id"],
      //   },
      // },
      // });

      const groups = await Group.findAll({
        where: { id: userGroups.map((el) => el.group_id) },
      });

      console.log("groups201", groups);
      return res.status(201).json({ wishes: wishes, groups: groups });
    } else {
      // await Wish.update(
      //   { isBinded: true },
      //   { where: { id: wish_id } }
      // );
      // const wishes = await Wish.findAll({
      //   where: { user_id: user_id },
      //   order: [["id", "ASC"]],
      // });
      // const userGroups = await UserGroup.findAll({
      //   where: { user_id: user_id },
      // });
      // const groups = await Group.findAll({
      //   where: {
      //     id: userGroups.map((el) => el.group_id && maxusers !== currentusers),
      //   },
      // });
      // console.log("groups202", groups);
      return res.sendStatus(202);
      // return res.status(202).json({ wishes: wishes, groups: groups });
    }
  } catch (error) {
    console.log("error", error);
    res.sendStatus(501);
  }
};

module.exports = {
  addGroup,
  addAlone,
  joinGroup,
  allWishes,
};
