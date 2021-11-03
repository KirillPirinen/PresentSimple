import style from './styles.module.css'


function Wish({children, wishPhoto, title, description, isBinded}) {
  return (
   <div className={style.wish}>
      <div className='wish_body'>
        <img src={wishPhoto ? `http://localhost:3001/${wishPhoto.replace('public/', '')}` : '#'} alt='#'></img>
        <div className='wish_title'><p>{title}</p></div>
        <div className='wish_description'><p>{description}</p></div>
        <div className='wish_bind'><p>{isBinded ? 'Уже подарили' : 'Не дарили'}</p></div>
     </div>
     {children}
   </div>
  )
}


export default Wish
