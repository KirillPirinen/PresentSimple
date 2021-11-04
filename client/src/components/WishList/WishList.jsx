import Wish from "./Wish/Wish";
import style from './styles.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllWishes, delWish, isGiven } from "../../redux/actions/wishAC";
import Modal from "../Modal/Modal";

function WishList({wishlist}) {

  const dispatch = useDispatch()

  const wishes = useSelector((state) => state.wishes?.Wishlist?.Wishes);

  const [modalActive, setActive] = useState(false)
  const [modalValue, setModalValue] = useState({})

  function deleteAction(id) {
    dispatch(delWish(id))
    console.log(modalValue);
    setModalValue({})
  }


  return (
    <div className='wishes container-glass'>
    <div className={style['add_wish_btn']}>
    <button className={`${style.btn} ${style.second}`} onClick={() => (setActive(true),setModalValue(''))} >Добавить хотелку</button>
    </div>
    <div className={style['wish_wrapper']}>
      {
        wishes?.map((wish) => 
        <Wish
           key={wish.id}
           title={wish.title}
           description={wish.description}
           isBinded={wish.isBinded}
           setActive={setActive}
           wishPhoto={wish.WishPhoto?.image}>
           <div className={style['btns']}>
           <button onClick={() => (
             setActive(true),
             setModalValue(wish)
           )}>Изменить</button>
           <button onClick={() => deleteAction(wish.id)} >Удалить</button>
           <button onClick={() => dispatch(isGiven(wish.id))}>Подарили!</button>
           </div>
           </Wish>
       
       )
       
      }
      <Modal wishValue={modalValue} setModalValue={setModalValue} active={modalActive} setActive={setActive} />
      </div>
    </div>
  )
    }


export default WishList
