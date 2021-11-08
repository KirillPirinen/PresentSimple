const { v4: uuidv4 } = require("uuid");
const { Group, Sequelize } = require("../../db/models");
const Op = Sequelize.Op;
const { Wish } = require("../../db/models");
const { UserGroup, User, WishPhoto } = require("../../db/models");
const { Wishlist } = require("../../db/models");
const appError = require('../Errors/errors');

const checkWish = async (req, res, next) => {
  const { wish_id } = req.body;
  try {
    const wish = await Wish.findOne({where:{[Op.and]:[{id:wish_id},{isBinded:false}]}})
  if(wish) {
    res.locals.wish = wish;
    return next()
  } else {
    return res.status(303).json({info:"Извините, кто-то уже забронировал этот подарок. Выберете другой"})
  }
  } catch (err) {
    return next(new Error(err.message))
  }
}

const allWishes = async (req, res, next) => {
  const { user_id } = req.params;
  try{
    const wishes = await Wishlist.findOne({
      where: { user_id: user_id },
      include: [{ model: Wish, include: [{model: Group}, {model:WishPhoto}] }, {model:User, attributes:['name', 'lname']}],
      required: false,
      order: [[Wish, "id", "ASC"]],
    });
    res.status(200).json(wishes)
  } catch (err) {
    next(new Error(err.message))
  }
};

const addAlone = async (req, res, next) => {
  try {
    res.locals.wish.isBinded = true
    res.locals.wish.user_id = req.session.user.id
    await res.locals.wish.save()
    return res.status(200).json({info:"Вы успешно забронировали, подарок. Другие пользователи не смогут выбрать его. Если вы захотите выбрать другой подарок, пожалуйста не забудьте убрать данный из планируемых"})
  } catch (error) {
    return next(new Error(error.message));
  }
};

const addGroup = async (req, res, next) => {
  try {
    const group = await Group.create({
      ...req.body,
      currentusers: 1,
    });

    await UserGroup.create({
      user_id: req.session.user.id,
      group_id: group.id,
    });

    res.locals.wish.isBinded = true
    await res.locals.wish.save()

    return res.status(200).json({ info: "Вы успешно создали группу", group });
  } catch (error) {
    return next(new Error(error.message))
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
  checkWish,
  addGroup,
  addAlone,
  joinGroup,
  allWishes,
};
