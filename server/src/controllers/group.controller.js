const e = require("express");
const { v4: uuidv4 } = require("uuid");
const { Group, Sequelize:{Op}, Wish, UserGroup, 
        User, WishPhoto, Wishlist } = require("../../db/models");
const appError = require('../Errors/errors');
const { checkInput } = require("../functions/validateBeforeInsert");

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
      where: { user_id },
      attributes:['createdAt', 'updatedAt', 'user_id'],
      include: [
        {model:Wish, required:false, where:{isGiven:false}, include: [{model: Group}, {model:WishPhoto}] }, 
        {model:User, attributes:['name', 'lname', 'avatar']}
      ],
      required: false,
      order: [[Wish, "pricerange_id", "ASC"]],
    });
    if(wishes.user_id === req.session.user.id) return next(new appError(303, 'Просмотр собственных подарков доступен в личном кабинете'))
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
  const input = checkInput(req.body, ['maxusers', 'telegram', 'wish_id'], true)
  if(!input) return next(new appError(400, "Не заполнены необходимые поля"));
  try {
    const group = await Group.create({
      ...input,
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

  try {
    const groupFind = await Group.findOne({ 
      where: { wish_id }, 
      include:{model:User},
    });
    
    if(!groupFind) return next(new appError(403, 'Группа не найдена'))
    else {
      const sameuser = groupFind.Users.find(e=>e.id===req.session.user.id)
      if(sameuser) return next(new appError(403, 'Вы уже вступили в эту группу'))
    }

    if ( (groupFind.currentusers + 1) <= groupFind.maxusers) {
      await groupFind.increment('currentusers')
      await UserGroup.create({user_id:req.session.user.id, group_id:groupFind.id})

      return res.json({info: "Вы успешно вступили в группу"});

    } else {
      next(new appError(403, 'Достигнуто максимальное количество участников'))
    };

  } catch (error) {
    next(new Error(error.message))
  }
};

const getGroupInfo = async (req, res, next) => {
  const {id} = req.params;
  try {

    const group = await Group.findOne({where:{id}, include:[
      {model:User, through:{attributes:[]}, attributes: ['name', 'lname', 'id', 'email', 'avatar'],
      },
      {model:Wish, 
        include:{model:Wishlist, attributes:['id'],
          include:{model:User, attributes:['name', 'lname', 'id', 'email', 'avatar']}
        }
      }
    ]})

    if(group) {
      if(group.Users.some(user => user.id === req.session.user.id)) return res.json(group)
      else return next(new appError(303, 'Вы не состоите в данной группе'))
    } else {
      next(new appError(403, 'Группа не найдена'))
    }

  } catch (error) {
    return next(new Error(error.message));
  }
};

module.exports = {
  checkWish,
  addGroup,
  addAlone,
  joinGroup,
  allWishes,
  getGroupInfo
};
