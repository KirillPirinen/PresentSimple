const { Wish } = require('../../db/models')
const { Wishlist } = require('../../db/models')

const allUserWishes = async (req, res) => {
  // const userId = req.session.userId
  // const allWishes = await Wish.findall({
  //   where: { userId }
  // })
  console.log('зашел в контроллер');
  res.json([{title: 'test',
  description: 'desctest'}, {title: 'test',
    description: 'desctest'}])
}

const addNewWish = async (req, res) => {
  const { title, description, price_id } = req.body
  const user_id = req.session.userId
  const wishlist_id = await Wishlist.findOne({
    where: { user_id }
  })
  const newWish = Wish.create({
    title, description, price_id, user_id, wishlist_id
  })

  res.json(newWish)
}

const editWish = async (req, res) => {
  const { title, description } = req.body
  await Wish.update({
    title, description
  },
  { where : req.params.id})
  res.sendStatus(200)
}

const deleteWish = async (req, res) => {
  try {
    const { id } = req.body
    await Wish.destroy({where: { id }})
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
}

module.exports = {
  allUserWishes,
  addNewWish,
  editWish,
  deleteWish,
}
