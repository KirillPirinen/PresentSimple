import './wishstyle.css'


function Wish({photo, title, description, bind}) {
  return (
   <div className='wish'>
      <div className='wish_body'>
        <img src={photo} alt='моё желание'></img>
        <div className='wish_title'><p>{title}</p></div>
        <div className='wish_description'><p>{description}</p></div>
        <div className='wish_bind'><p>{bind ? 'Не дарили' : 'Уже подарили'}</p></div>
     </div>
   </div>
  )
}


export default Wish
