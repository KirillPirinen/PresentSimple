const changePassword = (recipient, id, time) => {
  return `<h1>Здравствуйте!</h1>
   <p>${recipient.name}, Вы отправили запрос на восстановление пароля. 
   Для того, чтобы создать новый пароль, перейдите по <a href="http://localhost:3000/resetPassword/fhjdbjhvhbavjdfhbakn/${id}">ссылке</a>
   и следуйте инструкциям на странице. Ссылка действительна сутки. </p>
   <p>Пожалуйста, проигнорируйте данное письмо, если оно попало к Вам по ошибке</p>
   `;
};

module.exports = {
  changePassword,
};
