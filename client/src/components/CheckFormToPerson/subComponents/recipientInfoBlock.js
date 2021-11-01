import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export const RecipientInfoBlock = ({recipient}) => {
  return (
      <div className="container-info"> 
        <h2>Отличная новость. Твой друг уже зарегистрирован. Список его желаний доступен на его страничке</h2>
        <h3>ссылка на пользователя {recipient.name}</h3>
      </div>
  )
}
