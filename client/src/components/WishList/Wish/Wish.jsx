import './wishstyle.css'


function Wish({photo, title, description, isBinded}) {
  return (
   <div className='wish'>
      <div className='wish_body'>
        <img src={photo} alt='#'></img>
        <div className='wish_title'><p>{title}</p></div>
        <div className='wish_description'><p>{description}</p></div>
        <div className='wish_bind'><p>{isBinded ? 'Уже подарили' : 'Не дарили'}</p></div>
     </div>
     <div className="wish_btn">
       <button className="btn_del">Удалить</button>
       <button className="btn_edit">Редактировать</button>
       <button className="btn_got">Подарили</button>
     </div>
   </div>
  )
}


export default Wish
