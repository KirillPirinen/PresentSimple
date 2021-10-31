const { v4: uuidv4 } = require("uuid");
const { Group } = require("../../db/models");
const { Wish } = require("../../db/models");
// const { Form } = require("../../db/models");
// // const MailController = require("./emailController/email.controller");

const wishOne = [
  {
    id: 1,
    title: "носки",
    description: "",
    isBinded: false,
    user_id: 2,
    pricerange_id: 1,
    wishlist_id: 2,
  },
  {
    id: 2,
    title: "телефон",
    description: "Новороченный",
    isBinded: false,
    user_id: 2,
    pricerange_id: 3,
    wishlist_id: 1,
  },
];

const addGroup = async (req, res, next) => {
  const { maxusers, telegram } = req.body;
  console.log("req.body", req.body);
  const group = await Group.create({ ...req.body, currentusers: 1 });
  console.log("group", group);
  res.json({ group: group });
};

const addAlone = async (req, res, next) => {
  const { wish_id } = req.body;
  try {
    // const wish = await Wish.findOne({where: {id: wish_id}})
    // await Wish.update({isBinded: true}, { where: { id: wish_id } })
    const wish = wishOne.find((el) => el.id == wish_id);
    wish.isBinded = true;
    return res.json({ wish: wish });
  } catch (error) {
    console.log("error", error);
    return res.sendStatus(520);
  }
};

const joinGroup = async (req, res, next) => {
  const { wish_id } = req.body;
  const groupFind = await Group.findOne({ where: { wish_id: wish_id } });
  console.log('groupFind', groupFind)
  const nextuser = (await groupFind.currentusers) + 1;
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
    res.sendStatus(416);
  }
};

module.exports = {
  addGroup,
  addAlone,
  joinGroup,
};
