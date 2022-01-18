const {User} = require('../../db/models');
const MailController = require("../controllers/emailController/email.controller")

const notification = async (wish, user_id) => {
  try {
    if(user_id) {
      const user = await User.findOne({where:{id:user_id}})
      MailController.sendEmail(user.email, 
        "Изменение статуса подарка, который вы дарите", 
        `<p>Владелец подарка ${wish.title} отметил его как подаренный</p>
         <p>Если вы ещё не успели его подарить, возможно он передумал</p>
         <p>Уведомляем, что теперь вы не сможете увидеть его в разделе "Я дарю"</p>
        `)
    } else {
      const group = await wish.getGroup()
      if(group) { 
        const users = await group.getUsers()
         if(users.length) {
          const emails = users.map(user => user.email)
          // MailController.sendEmail(emails, 
          //   "Изменение статуса подарка, который вы дарите", 
          //   `<p>Владелец подарка ${wish.title} отметил его как подаренный</p>
          //    <p>Если вы ещё не успели его подарить, возможно он передумал</p>
          //    <p>Группа автоматически расформирована.</p>
          //   `)
          group.destroy()
         }
      }
    } 
  } catch (err) {
    console.log(err)
  }
}

module.exports = notification
